// historicalBalances.test.js



import {getHistoricalBalance } from '../../src/services/getHistoricalBalances'; // Replace with the actual path
import { Request, Response } from 'express';
jest.mock('axios');

// Mock data for testing
const mockBalancesData = {
  amount: 10000,
  currency: 'EUR',
  date: '2022-06-30T23:59:59.577Z',
};

const mockTransactionsData = {
  transactions: [
    {
      amount: -765,
      currency: 'EUR',
      date: '2022-02-07T09:57:27.235Z',
      status: 'BOOKED',
    },
    // Add more transaction objects as needed
  ],
};

// Mock Express Request and Response objects
const mockRequest: Request = {
  query: {
    from: '2022-01-03',
    to: '2022-01-05',
    sort: 'desc',
  },
} as unknown as Request;

const mockResponse: Response = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(), // Mocking the status function
} as unknown as Response;

describe('getHistoricalBalance', () => {
  it('should handle valid query parameters', async () => {
    await getHistoricalBalance(mockRequest, mockResponse);

    // Add Jest assertions to test the response
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
  
  });

  it('should handle invalid query parameters', async () => {
    const invalidRequest = {
      query: {
        // Missing required query parameters
      },
    } as Request;

    await getHistoricalBalance(invalidRequest, mockResponse);

    // Add Jest assertions to test the response for invalid parameters
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid query parameters' });
   
  });
});
