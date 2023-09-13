import { Request, Response } from 'express';
import { fetchDataFromDataProvider } from './dataRetriever';


// Function to calculate daily balances
const calculateDailyBalances = async (
  balancesData: { amount: number; currency: string; date: string },
  transactionsData: { transactions: { amount: number; currency: string; date: string; status: string }[] },
  from: string,
  to: string,
  sort: string
) => {
  try {
    // Extract balances and transactions from the data objects
    const balances = [balancesData];
    const transactions = transactionsData.transactions;

    // Create a date range based on 'from' and 'to' dates
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Initialize a map to store daily balances
    const dailyBalancesMap = new Map();

    // Initialize daily balance with the initial balance
    balances.forEach((balance) => {
      const balanceDate = new Date(balance.date).toISOString().split('T')[0];
      if (balanceDate >= from && balanceDate <= to) {
        dailyBalancesMap.set(balanceDate, balance.amount / 100); // Convert cents to currency
      }
    });

    // Process transactions to update daily balances
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date).toISOString().split('T')[0];

      // Check if the transaction date is within the specified date range
      if (transactionDate >= from && transactionDate <= to) {
        const currentBalance = dailyBalancesMap.get(transactionDate) || 0;
        dailyBalancesMap.set(transactionDate, currentBalance + transaction.amount / 100); // Convert cents to currency
      }
    });
   // Convert the map to an array and sort if required
  const dailyBalances = Array.from(dailyBalancesMap).map(([date, amount]) => ({
    date: new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }),
  amount,
  currency: 'EUR', // Assuming currency is always EUR
}));


    // Sort the daily balances if required
    if (sort === 'desc') {
      dailyBalances.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    }

    return dailyBalances;
  } catch (error) {
    throw error;
  }
};


// Express route handler for /historical-balances
// Express route handler for /historical-balances
export const getHistoricalBalance = async (req: Request, res: Response) => {
  const { from, to, sort } = req.query;

  // Check if 'from' and 'to' are valid dates and 'sort' is a string
  if (typeof from === 'string' && typeof to === 'string' && typeof sort === 'string') {
    try {
      // Fetch data from the Data Provider API using the existing function
      const { balances, transactions } = await fetchDataFromDataProvider();

      // Calculate daily balances based on the specified date range and sorting
      const dailyBalances = await calculateDailyBalances(balances, transactions, from, to, sort);

      res.json(dailyBalances);
    } catch (error) {
      console.error('Error calculating historical daily balances:', error);

      // Send an error response with the specific error message for debugging
      res.status(500).json({ error: 'Internal Server Error', details: (error as Error).message });
    }
  } else {
    // Handle invalid query parameters
    res.status(400).json({ error: 'Invalid query parameters' });
  }
};
