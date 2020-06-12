import { User } from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED, NO_CONTENT } from '../constants/HttpStatusCod';
import { BARBER, COSTUMER } from '../constants/userTypes';
import { Appointment } from '../models/Appointment';
import { WorkIntervalTime } from '../models/WorkIntervalTime';
import { ServiceDurationTime } from '../models/ServiceDurationTime';
import { Op, Sequelize } from 'sequelize';
import { Service } from '../models/Service';
import { Request, Response, NextFunction } from 'express';
import { notfound } from '../constants/messages';
import { UserPhone } from '../models/UserPhone';

export default class BarberController {
  static async getBaber(params: any) {
    const barber = await User.findOne(params);
    if (!barber) throw new NotFound();

    return barber;
  }

  static async index(req: any, res: any, next: any) {
    try {
      const barbers: User[] = await User.findAll({
        where: {
          companyId: req.companyId,
          userTypeId: BARBER,
        },
        limit: 40,
      });
      return res.json(barbers);
    } catch (error) {
      return next(error);
    }
  }
  static async show(req: any, res: any, next: any) {
    try {
      let barber = await BarberController.getBaber({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
          companyId: req.companyId,
        },
      });

      return res.status(SUCCESS).json(barber);
    } catch (error) {
      return next(error);
    }
  }

  static async showByServiceDuration(req: any, res: any, next: any) {
    try {
      const user = await BarberController.getBaber({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
        },
        include: [{ model: ServiceDurationTime, as: 'serviceDuration' }],
      });
      return res.json(user.serviceDuration);
    } catch (error) {
      return next(error);
    }
  }

  static async showByWorkIntervalTime(req: any, res: any, next: any) {
    try {
      const user = await BarberController.getBaber({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
        },
        include: [{ model: WorkIntervalTime, as: 'workInterval' }],
      });
      return res.json(user.workInterval);
    } catch (error) {
      return next(error);
    }
  }

  static async showByService(req: any, res: any, next: any) {
    try {
      const user = await BarberController.getBaber({
        where: {
          id: req.params.id,
        },
        include: [{ model: Service, as: 'services' }],
      });
      return res.json(user.services);
    } catch (error) {
      return next(error);
    }
  }
  static async showByAppointments(req: any, res: any, next: any) {
    const { date } = req.query;
    try {
      const appoinments = await Appointment.findAll({
        where: {
          barberId: req.params.id,
          [Op.and]: Sequelize.literal(`\`date\` = date(${date ? `"${date}"` : 'sysdate()'})`),
        },
        include: [
          { model: User, as: 'costumer' },
          { model: Service, as: 'service' },
        ],
      });
      return res.json(appoinments);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: any, res: any, next: any) {
    try {
      req.body.userTypeId = BARBER;
      if (req.file) {
        req.body.perfilImage = req.file.filename;
      }
      req.userTypeId = BARBER;
      const costumer = await User.create(req.body);
      return res.status(CREATED).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: any, res: any, next: any) {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
          companyId: req.companyId,
        },
      });

      if (!user) throw new NotFound();

      await user.update(req.body);

      await user.reload();

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: any, res: any, next: any) {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
          companyId: req.companyId,
        },
      });

      if (!user) throw new NotFound();

      await user.destroy();

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  }

  static async availableAppointments(req: any, res: any, next: any) {
    const { id: barberId } = req.params;
    const { date } = req.query;
    try {
      const workIntervalTimes = await WorkIntervalTime.findAll({
        where: {
          barberId,
        },
      });

      if (!workIntervalTimes.length) throw new NotFound(notfound('Intervalos de trabalho'));
      const serviceDurationTime = await ServiceDurationTime.findOne({
        where: {
          barberId,
        },
      });
      if (!serviceDurationTime) throw new NotFound(notfound('Duração de serviço'));

      const appointmentAtDate = await Appointment.findAll({
        where: {
          [Op.and]: Sequelize.literal(`\`date\` = date(${date ? `"${date}"` : 'sysdate()'})`),
        },
      });

      let workIntervalTimesFormatted;
      let allIntervalTimes;
      let eachIntervalTime;
      // caso exista compromisso para o dia
      if (appointmentAtDate.length) {
        //formata o horário dos compromissos para minutos
        let appointmentAtDateFormatted = appointmentAtDate.map(
          (appointment: Appointment) => appointment.time
        );
        //formata os horários disponiveis filtrando os horários que ainda não estão marcados
        workIntervalTimesFormatted = workIntervalTimes
          .map(({ initialTime, finishTime }: WorkIntervalTime) => {
            allIntervalTimes = [];
            //cada intervalo de tempo será a hora inicial do trabalho + o tempo de  duraçao definido no sistema
            eachIntervalTime = initialTime;
            while (eachIntervalTime <= finishTime) {
              if (!appointmentAtDateFormatted.includes(eachIntervalTime)) {
                allIntervalTimes.push(eachIntervalTime);
              }
              eachIntervalTime += serviceDurationTime.duration;
            }
            return allIntervalTimes;
          })
          // como o barbeiro pode ter mais de um intervalo de trabalho definido, a operação acima retorna arrays de horários disponiveis de acordo com estes intervalos. A função abaixo faz com que haja uma união entre esses horários
          .flat();
      } else {
        // calcula todos os horários disponíveis de acordo com o cadastro de horários iniciais e finais.
        // é retornado em minutos
        workIntervalTimesFormatted = workIntervalTimes
          .map((workIntervalTime: WorkIntervalTime) => {
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

  static async createCostumer(req: any, res: any, next: any) {
    try {
      req.body.password = '123456';
      req.body.userTypeId = COSTUMER;
      const costumer: User = await User.create({ ...req.body });

      console.log(costumer)
      if (req.body.phone) await UserPhone.create({ phone: req.body.phone, userId: costumer.id });

      return res.json(costumer);
    } catch (error) {
      return next(error);
    }
  }
}
