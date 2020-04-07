import { UNAUTHORIZED } from "../constants/HttpStatusCod";

export default class Unauthorized extends Error {
  constructor() {
    super();
    this.status = UNAUTHORIZED;
  }
}
