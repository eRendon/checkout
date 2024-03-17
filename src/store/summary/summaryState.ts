import { ISummary } from '@/interfaces/ISummary'
import { defineStore } from 'pinia'
import { PaymentMethods } from '@/constants/PaymentMethods'

export const summaryState = defineStore('summary.state', {
  state: (): ISummary => ({
    transactionStatus: 'success',
    status: '',
    amount: 0,
    description: '',
    product: {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0
      }
    },
    creationDate: new Date(),
    paymentType: PaymentMethods.creditCard
  })
})
