import { Sequelize, QueryTypes, Op } from 'sequelize';
import database from '../database';
import Appointment from '../models/Appointment';
import NotFound from '../errors/NotFound';
import User from '../models/User';
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

      include: [
        { model: User, as: 'costumer' },
      ],
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
        include: [
          { model: User, as: 'costumer' },
        ],
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

      include: [
        { model: User, as: 'barber' }
      ],
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
}
