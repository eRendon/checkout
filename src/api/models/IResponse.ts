import { IProduct } from '@/interfaces/IProduct'

export interface IResponse {
  status: 'success' | 'error'
  amount: number
  description: string
  product: IProduct
  id: string
  creationDate: Date
}
