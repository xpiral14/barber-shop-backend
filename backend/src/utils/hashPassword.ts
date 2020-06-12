import bcrypt from "bcrypt";
import { SALT } from "../constants/secrets";
export default function hashPassword(password:string) {
  let hash = bcrypt.hashSync(password, SALT);
  return hash;
}
