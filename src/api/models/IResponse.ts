import { IProduct } from '@/interfaces/IProduct'

export interface IResponse {
  status: string
  transactionStatus: 'error' | 'success'
  amount: number
  description: string
  product?: IProduct
  id?: string
  creationDate: Date
}
