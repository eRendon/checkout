import { ISummary } from '@/interfaces/ISummary'

const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return timestamp + random;
}

const successResponse = (paymentType: string): ISummary => {
  return {
    status: 'Exitosa',
    transactionStatus: 'success',
    amount: 500,
    description: 'Transacción creada con éxito',
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
    id: generateId(),
    creationDate: new Date(),
    paymentType
  }
}

const errorResponse = (paymentType: string): ISummary => {
  return {
    status: 'Rechazada',
    transactionStatus: 'error',
    amount: 500,
    description: 'Su transacción ha sido rechazada',
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
    id: generateId(),
    creationDate: new Date(),
    paymentType
  }
}

const apiResponse = (status: number, paymentType: string): Promise<ISummary> => {
  console.log(status)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      status === 1 ? resolve(successResponse(paymentType)) : status === 2 ? resolve(errorResponse(paymentType)) : reject()
    }, 2000)
  })
}

export default apiResponse
