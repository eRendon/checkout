import { IResponse } from './models/IResponse'

const successResponse: IResponse = {
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
  creationDate: new Date()
}

const errorResponse: IResponse = {
  status: 'error',
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
  creationDate: new Date()
}
const apiResponse = (status: number): Promise<IResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(status === 1 ? successResponse : errorResponse)
    }, 2000)
  })
}
