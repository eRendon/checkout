import apiClient from './config'
import { AxiosResponse } from 'axios'

export class AxiosService<T> {
  async get (url: string): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.get<T>(url)
    } catch (e) {
      throw e
    }
  }
}
