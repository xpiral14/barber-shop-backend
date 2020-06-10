import Gender from '../models/Gender';

export default class GenderController {
  static async index(req, res, next) {
    try {
      const genders = await Gender.findAll();

      return res.json(genders);
    } catch (error) {
      return next(error);
    }
  }
  static async show(req, res, next) {
    try {
      const gender = await Gender.findByPk(req.params.id);
      return res.json(gender);
    } catch (error) {
      return next(error);
    }
  }
}
