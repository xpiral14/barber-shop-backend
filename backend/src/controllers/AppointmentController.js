import { Sequelize, QueryTypes, Op } from 'sequelize';
import database from '../database';
import Appointment from '../models/Appointment';
import NotFound from '../errors/NotFound';
import User from '../models/User';
import WorkIntervalTime from '../models/WorkIntervalTime';
import BadRequest from '../errors/BadRequest';
import { notfound, invalidField } from '../constants/messages';
import ServiceDurationTime from '../models/ServiceDurationTime';
import { getHours, getMinutes, format, addMinutes, isBefore, isAfter, addHours } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CREATED, NO_CONTENT } from '../constants/HttpStatusCod';
import Service from '../models/Service';
import getDateTime from '../utils/getDateTime';
import { parseFromTimeZone, convertToTimeZone } from 'date-fns-timezone';
import { zonedTimeToUtc } from 'date-fns-tz';

export default class AppointmentController {
  static async getAppointment(params) {
    const appointment = await Appointment.findOne(params);

    if (!appointment) throw NotFound('Horário marcado');

    return appointment;
  }
  static async index(req, res, next) {
    const { date } = req.query;
    const appointments = await Appointment.findAll({
      where: {
        [Op.and]: Sequelize.literal(`\`date\` = date(${date ? `"${date}"` : 'sysdate()'})`),
      },

      include: [
        { model: User, as: 'costumer' },
        { model: Service, as: 'service' },
      ],
      limit: 40,
    });

    return res.json(appointments);
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await Appointment.findAll({
        where: {
          id: appointmentId,
          companyId: req.companyId,
        },
        include: [
          { model: User, as: 'costumer' },
          { model: User, as: 'barber' },
          { model: Service, as: 'service' },
        ],
      });

      if (!appointment) throw new NotFound();
      return res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      req.body.companyId = req.companyId;
      const appointment = await Appointment.create(req.body);
      return res.status(CREATED).json(appointment);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentController.getAppointment({
        where: id,
        companyId: req.companyId,
      });

      await appointment.update(req.body);

      await appointment.reload();
      return res.json(appointment);
    } catch (error) {
      return next(error);
    }
  }
  static async showByCostumer(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await AppointmentController.getAppointment({
        where: {
          id: id,
        },
        include: [{ model: User, as: 'costumer' }],
      });

      return res.json(appointment.costumer);
    } catch (error) {
      next(error);
    }
  }

  static async showByService(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await AppointmentController.getAppointment({
        where: {
          id: id,
        },
        include: [{ model: Service, as: 'service' }],
      });

      return res.json(appointment.service);
    } catch (error) {
      next(error);
    }
  }

  static async showByBarber(req, res, next) {
    const { id } = req.params;
    const appointment = await AppointmentController.getAppointment({
      where: {
        id,
      },
      include: [{ model: User, as: 'barber' }],
      attributes: ['id'],
    });

    return res.json({ ...appointment.barber });
  }

  static async cancel(req, res, next) {
    const { id } = req.params;
    const { timezone } = req.headers;
    try {
      const appointment = await AppointmentController.getAppointment({
        where: {
          id,
          costumerId: req.userId,
        },
      });
      console.log(getDateTime(appointment.date, appointment.time));

      const appointmentDateTime = zonedTimeToUtc(
        getDateTime(appointment.date, appointment.time),
        timezone
      );

      const now = new Date()
      if (appointment.canceledAt) throw new BadRequest('Data de cancelamento já existe');

      if (
        isAfter(appointmentDateTime, now) ||
        isBefore(appointmentDateTime, addHours(new Date(), 1))
      )
        throw new BadRequest(invalidField('Data de cancelamento'));

      appointment.update({ canceledAt: format(new Date(), 'yyyy-MM-dd hh:mm:ss') });

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  }
}
