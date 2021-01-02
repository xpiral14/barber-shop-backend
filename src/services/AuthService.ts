import api from '../Config/api'

type LoginResponse = {
  type: string
  token: string
  expires_at: string
}
export default class AuthService {
  public static async login(email: string, password: string) {
    const response = await api.post<LoginResponse>('/login', {
      email,
      password,
    })

    return response.data
  }

  public static async logout(){
    await api.post('/logout')
  }
}
