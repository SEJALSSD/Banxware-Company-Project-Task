import axios from 'axios';

// Function to fetch data from the Data Provider API
export const fetchDataFromDataProvider = async (): Promise<any> => {
  try {
    const apiKey = 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18';
    const balancesResponse = await axios.get('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/balances', {
      headers: { 'x-api-key': apiKey },
    });
    const transactionsResponse = await axios.get('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions', {
      headers: { 'x-api-key': apiKey },
    });
    const balances = balancesResponse.data;
    const transactions = transactionsResponse.data;

    console.log('Fetched Balances:', balances);
    console.log('Fetched Transactions:', transactions);

    return { balances, transactions };
  } catch (error) {
    throw error;
  }
};

// Call the function to fetch data from the Data Provider API and log the response done to check whether data is getting fetched or not.
fetchDataFromDataProvider()
  .then(() => {
    console.log('Data fetched successfully.');
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
