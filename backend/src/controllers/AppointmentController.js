import { Sequelize, QueryTypes, Op } from 'sequelize';
import database from '../database';
import Appointment from '../models/Appointment';
import NotFound from '../errors/NotFound';
import User from '../models/User';
import WorkIntervalTime from '../models/WorkIntervalTime';
import BadRequest from '../errors/BadRequest';
import { notfound } from '../constants/messages';
import ServiceDurationTime from '../models/ServiceDurationTime';
import { getHours, getMinutes, format, addMinutes } from 'date-fns';
import { pt } from 'date-fns/locale';

export default class AppointmentController {
  static async index(req, res, next) {
    const { id } = req.params;
    const { date } = req.query;
    const appointments = await Appointment.findAll({
      where: {
        barberId: id,
        [Op.and]: Sequelize.literal(
          `date(appointmentAt) = date(${date ? `"${date}"` : 'sysdate()'})`
        ),
      },

      include: [{ model: User, as: 'costumer' }],
    });

    return res.json(appointments);
  }

  static async show(req, res, next) {
    try {
      const { id, appointmentId } = req.params;

      const appointment = await Appointment.findAll({
        where: {
          id: appointmentId,
          barberId: id,
        },
        include: [{ model: User, as: 'costumer' }],
      });

      if (!appointment) throw new NotFound();
      return res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  static async indexByCostumer(req, res, next) {
    const { id } = req.params;
    const { date } = req.query;
    const appointments = await Appointment.findAll({
      where: {
        barberId: id,
        [Op.and]: Sequelize.literal(
          `date(appointmentAt) = date(${date ? `"${date}"` : 'sysdate()'})`
        ),
      },

      include: [{ model: User, as: 'barber' }],
    });

    return res.json(appointments);
  }

  static async showByCostumer(req, res, next) {
    try {
      const { id, appointmentId } = req.params;

      const appointment = await Appointment.findAll({
        where: {
          id: appointmentId,
          costumerId: id,
        },
        include: [
          { model: User, as: 'barber' },
          { model: User, as: 'costumer' },
        ],
      });

      if (!appointment) throw new NotFound();
      return res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  static async availableAppointments(req, res, next) {
    const { barberId } = req.params;
    const { date } = req.query;
    try {
      const workIntervalTimes = await WorkIntervalTime.findAll({
        where: {
          barberId,
        },
      });

      if (!workIntervalTimes) throw new NotFound(notfound('Intervalos de trabalho'));
      const serviceDurationTime = await ServiceDurationTime.findOne({
        where: {
          barberId,
        },
      });
      if (!serviceDurationTime) throw new NotFound(notfound('Duração de serviço'));

      const appointmentAtDate = await Appointment.findAll({
        where: {
          [Op.and]: Sequelize.literal(
            `date(appointmentAt) = date(${date ? `"${date}"` : 'sysdate()'})`
          ),
        },
      });

      let workIntervalTimesFormatted;
      let allIntervalTimes;
      let eachIntervalTime;
      // caso exista compromisso para o dia
      if (appointmentAtDate.length) {
        //formata o horário dos compromissos para minutos
        let appointmentAtDateFormatted = appointmentAtDate.map(
          (appointment) =>
            (getHours(appointment.appointmentAt) + 3) * 60 + getMinutes(appointment.appointmentAt)
        );
        //formata os horários disponiveis filtrando os horários que ainda não estão marcados
        workIntervalTimesFormatted = workIntervalTimes
          .map(({ initialTime, finishTime }) => {
            allIntervalTimes = [];
            eachIntervalTime = initialTime;
            while (eachIntervalTime <= finishTime) {
              if (!appointmentAtDateFormatted.includes(eachIntervalTime)) {
                allIntervalTimes.push(eachIntervalTime);
              }
              eachIntervalTime += serviceDurationTime.duration;
            }
            return allIntervalTimes;
          })
          .flat();
      } else {
        // calcula todos os horários disponíveis de acordo com o cadastro de horários iniciais e finais.
        // é retornado em minutos
        workIntervalTimesFormatted = workIntervalTimes
          .map((workIntervalTime) => {
            const { initialTime, finishTime } = workIntervalTime;

            allIntervalTimes = [];
            eachIntervalTime = initialTime;

            while (eachIntervalTime <= finishTime) {
              allIntervalTimes.push(eachIntervalTime);
              eachIntervalTime += serviceDurationTime.duration;
            }
            return allIntervalTimes;
          })
          .flat();
      }

      const today = new Date();

      return res.json(workIntervalTimesFormatted);
    } catch (error) {
      return next(error);
    }
  }
}
