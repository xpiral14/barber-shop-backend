import { NOT_FOUND } from '../constants/HttpStatusCod';

export default class NotFound extends Error {
  private status: number;
  constructor(message?: string) {
    super(message);
    this.status = NOT_FOUND;
  }
}
