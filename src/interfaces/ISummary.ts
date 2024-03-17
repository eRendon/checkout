import { IResponse } from '@/api/models/IResponse'
import { ICreditCard } from '@/interfaces/ICreditCard'

export interface ISummary extends IResponse {
  paymentData: ICreditCard
}
