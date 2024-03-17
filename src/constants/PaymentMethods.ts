import { IPaymentMethod } from '@/interfaces/IPaymentMethods'

export const PaymentMethods = {
  cash: 'cash',
  creditCard: 'credit-card'
}

const creditCard: IPaymentMethod = {
  text: 'Tarjeta de crédito',
  value: PaymentMethods.creditCard
}

const cash: IPaymentMethod = {
  text: 'Efectivo',
  value: PaymentMethods.cash
}

export const methods = {
  'credit-card':creditCard,
  'cash': cash
}
