import axios from 'axios';

const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest';

/**
 * Service module responsible for fetching live currency exchange rates.
 * By isolating this logic, UI components remain pure and agnostic of specific endpoints.
 * 
 * @param {string} baseCurrency The 3-letter currency code to base conversions against.
 * @returns {Promise<Object>} An object containing the base currency, date, and rates map.
 */
export const fetchExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await axios.get(`${EXCHANGE_RATE_API_URL}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Currency Service Error:', error);
    throw new Error('Failed to fetch the latest exchange rates.');
  }
};
