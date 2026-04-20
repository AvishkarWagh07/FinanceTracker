import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates } from '../services/currencyService';

/**
 * Reusable hook to fetch currency exchange rates and handle live conversions.
 * Responsibilities:
 * 1. Safely handle Axios side-effects and network errors.
 * 2. Keep state on Exchange Rates from the base currency.
 * 3. Provide an isolated memoized `convert` function to be passed around globally.
 */
const useCurrency = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchExchangeRates(baseCurrency);
        if (isMounted) {
          // api.exchangerate-api.com natively provides the 1:1 base match within data.rates
          setRates(data.rates);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    getRates();

    return () => {
      isMounted = false;
    };
  }, [baseCurrency]);

  const convert = useCallback((amount, toCurrency) => {
    if (!rates || !rates[toCurrency]) return amount;
    return amount * rates[toCurrency];
  }, [rates]);

  const availableCurrencies = Object.keys(rates).sort();

  return { rates, loading, error, convert, availableCurrencies };
};

export default useCurrency;
