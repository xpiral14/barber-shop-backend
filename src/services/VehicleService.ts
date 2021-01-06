import api from '../Config/api'
import Metadata from '../Models/Metadata'
import Vehicle from '../Models/Vehicle'

export default class VehicleService {
  static defaultPath = '/company/vehicle'

  static async create() {
    const response = api.post<Vehicle[]>(`${this.defaultPath}`)

    return await response
  }

  static async getAll(page: number, limit: number) {
    const response = api.get<{ meta: Metadata; data: Vehicle[] }>(
      `${this.defaultPath}`,
      {
        params: {
          page,
          limit,
        },
      }
    )

    return (await response).data
  }

  static async getOne(vehicleId: number) {
    const response = api.get<Vehicle>(`${this.defaultPath}/${vehicleId}`)
    return (await response).data
  }

  static async update(vehicleId?: number, vehicleData?: Vehicle) {
    await api.put(`${this.defaultPath}/${vehicleId}`, vehicleData)
    return true
  }
}
