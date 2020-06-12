import { BAD_REQUEST } from "../constants/HttpStatusCod";

export default class InvalidToken extends Error {
  private status:number;
  constructor(message?:string) {
    super(message || "Token inválido");
    this.status = BAD_REQUEST;
  }
}
