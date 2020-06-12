import InvalidToken from "../errors/InvalidToken";

export default function getToken(bearerToken:string) {
  if (!bearerToken) throw new InvalidToken();

  return bearerToken.split(" ")[1]
}
