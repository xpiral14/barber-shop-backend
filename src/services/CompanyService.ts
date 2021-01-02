import api from '../Config/api'


export default class CompanyService{

  static async getAll(){
    return api.get('/company')
  }
}