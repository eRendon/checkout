import { ISummary } from '@/interfaces/ISummary'
import { defineStore } from 'pinia'

export const summaryState = defineStore('summary.state', {
  state: (): ISummary => ({
    status: 'success',
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
    id: '',
    creationDate: new Date(),
    paymentData: {
      name: '',
      date: '',
      cvc: '',
      number: ''
    }
  })
})
