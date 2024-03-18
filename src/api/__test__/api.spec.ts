import { describe, expect, it } from 'vitest'
import apiResponse, { errorResponse, generateId, successResponse } from '@/api/api'
describe('api file', () => {
  it('generate randomId', () => {
    const randomId = generateId()
    const regex = /^[0-9a-z]+$/;

    expect(typeof  randomId).toBe('string')
    expect(randomId.length).toBeGreaterThan(0)
    expect(regex.test(randomId)).toBe(true)
  })

  describe('successResponse function', () => {
    it('should return a successful summary', () => {
      const paymentType = 'credit-card';
      const summary = successResponse(paymentType);

      expect(summary.status).toBe('Exitosa');
      expect(summary.transactionStatus).toBe('success');
      expect(summary.amount).toBe(500);
      expect(summary.description).toBe('Transacción creada con éxito');
      expect(summary.paymentType).toBe(paymentType);
    });
  });

  describe('errorResponse function', () => {
    it('should return an error summary', () => {
      const paymentType = 'credit-card';
      const summary = errorResponse(paymentType);

      expect(summary.status).toBe('Rechazada');
      expect(summary.transactionStatus).toBe('error');
      expect(summary.amount).toBe(500);
      expect(summary.description).toBe('Su transacción ha sido rechazada');
      expect(summary.paymentType).toBe(paymentType);
    });
  });

  describe('apiResponse function', () => {
    it('should return a successful summary for status 1', async () => {
      const paymentType = 'credit-card';
      const summary = await apiResponse(1, paymentType);

      expect(summary.status).toBe('Exitosa');
      expect(summary.transactionStatus).toBe('success');
      expect(summary.amount).toBe(500);
      expect(summary.description).toBe('Transacción creada con éxito');
      expect(summary.paymentType).toBe(paymentType);
    });

    it('should return an error summary for status 2', async () => {
      const paymentType = 'credit-card';
      const summary = await apiResponse(2, paymentType);

      expect(summary.status).toBe('Rechazada');
      expect(summary.transactionStatus).toBe('error');
      expect(summary.amount).toBe(500);
      expect(summary.description).toBe('Su transacción ha sido rechazada');
      expect(summary.paymentType).toBe(paymentType);
    });

    it('should reject for other status codes', async () => {
      expect.assertions(1);
      const paymentType = 'credit-card';

      try {
        await apiResponse(3, paymentType);
      } catch (error) {
        expect(error).toBe('Tuvimos un problema al intentar crear la transacción');
      }
    });
  });
})
