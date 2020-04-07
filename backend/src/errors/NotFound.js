import { NOT_FOUND } from "../constants/HttpErrors";

export default class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND
  }
}
