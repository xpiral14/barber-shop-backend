import { UNAUTHORIZED } from "../constants/HttpStatusCod";

export default class Unauthorized extends Error {
  private status:number;
  constructor() {
    super();
    this.status = UNAUTHORIZED;
  }
}
