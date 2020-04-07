import { NOT_FOUND } from "../constants/HttpStatusCod";

export default class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND
  }
}
