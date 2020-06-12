import {Gender} from '../models/Gender';
import { Request, Response, NextFunction } from 'express';

export default class GenderController {
  static async index(req: any, res: any, next: any) {
    try {
      const genders = await Gender.findAll();

      return res.json(genders);
    } catch (error) {
      return next(error);
    }
  }
  static async show(req: any, res: any, next: any) {
    try {
      const gender = await Gender.findByPk(req.params.id);
      return res.json(gender);
    } catch (error) {
      return next(error);
    }
  }
}
