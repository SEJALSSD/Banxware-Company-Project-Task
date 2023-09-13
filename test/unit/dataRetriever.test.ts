import axios from 'axios';
import { fetchDataFromDataProvider } from '../../src/services/dataRetriever';

// Mock Axios requests using jest.mock
jest.mock('axios');

describe('fetchDataFromDataProvider', () => {
  it('should fetch balances and transactions successfully', async () => {
    // Mock Axios responses
    const mockedBalancesResponse = { data: { /* mocked balances data */ } };
    const mockedTransactionsResponse = { data: { /* mocked transactions data */ } };

    // Mock Axios.get implementation for both calls
    (axios.get as jest.MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce(mockedBalancesResponse)
      .mockResolvedValueOnce(mockedTransactionsResponse);

    // Call fetchDataFromDataProvider
    const result = await fetchDataFromDataProvider();

    // Asserting that the function returned the expected result
    expect(result).toEqual({ balances: mockedBalancesResponse.data, transactions: mockedTransactionsResponse.data });
  });

  it('should throw an error on network error', async () => {
    // Mock Axios.get implementation to throw an error
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Network error'));

    // Call fetchDataFromDataProvider and expect it to throw an error
    await expect(fetchDataFromDataProvider()).rejects.toThrow('Network error');
  });
});
