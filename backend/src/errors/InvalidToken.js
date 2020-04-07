import { BAD_REQUEST } from "../constants/HttpErrors";

export default class InvalidToken extends Error {
  constructor(message) {
    super(message || "Token inválido");
    this.status = BAD_REQUEST;
  }
}
