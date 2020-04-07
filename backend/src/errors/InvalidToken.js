import { BAD_REQUEST } from "../constants/HttpStatusCod";

export default class InvalidToken extends Error {
  constructor(message) {
    super(message || "Token inválido");
    this.status = BAD_REQUEST;
  }
}
