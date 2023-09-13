import { Request, Response } from 'express';
import { fetchDataFromDataProvider } from './dataRetriever';

export async function getHistoricalBalance(req: Request, res: Response) {
  try {
    // Call the fetchDataFromDataProvider function to retrieve data
    const { balances, transactions } = await fetchDataFromDataProvider();

    // Log the retrieved data
    console.log('Balances:', balances);
    console.log('Transactions:', transactions);

    // You can also send a response if needed
    res.json({ balances, transactions });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



