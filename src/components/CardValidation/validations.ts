import { number } from 'card-validator';
import creditCardType from 'credit-card-type';
interface CreditCardValidationResult {
  valid: boolean
  errorMessage?: string
}

const validateCreditCardNumber = (creditCardNumber: string): CreditCardValidationResult => {
  const validations = number(creditCardNumber)
  if (validations.isValid) {
    return { valid: true }
  } else {
    return {
      valid: false,
      errorMessage: 'Número de tarjeta de crédito inválido'
    }
  }
}

const validateCreditCardType = (creditCardNumber: string): string | null => {
  const types = creditCardType(creditCardNumber)
  console.log('lost types', types)
  if (types.length > 0) {
    return types[0].type
  }
  return null
}

export { validateCreditCardType, validateCreditCardNumber}
