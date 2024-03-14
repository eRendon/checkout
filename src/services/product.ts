import { AxiosService } from '../libs/axios/axios'
import { IProduct } from '../interfaces/IProduct'
import { AxiosResponse } from 'axios'

const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const axiosService = new AxiosService<IProduct>()
    const response = await axiosService.get(id)
    return response.data
  } catch (e) {
    throw e
  }
}


export { getProductById }
