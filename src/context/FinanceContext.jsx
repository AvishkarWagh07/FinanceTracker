import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchExchangeRates } from '../services/currencyService';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  // this is where we store all our transactions
  const [dataList, setDataList] = useState(() => {
    // let's try to find data from any previous keys we might have used
    const keys = ['finance_tracker_v3', 'my_tracker_data', 'finance_data_v2', 'my_money_data'];
    
    for (let key of keys) {
      const saved = localStorage.getItem(key);
      if (saved) {
        console.log(`Found data in ${key}, loading it...`);
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.log("Error parsing data from", key);
        }
      }
    }
    
    console.log("No previous data found, starting fresh.");
    return [];
  });
  
  const [isLoad, setIsLoad] = useState(true);
  const [currType, setCurrType] = useState('INR');
  const [allRates, setAllRates] = useState({});
  const [currs, setCurrs] = useState(['INR', 'USD', 'EUR', 'GBP', 'JPY']);

  // save to local storage whenever dataList changes
  useEffect(() => {
    // we only save if we actually have a list (even empty) 
    // but we use a stable key
    localStorage.setItem('finance_tracker_v3', JSON.stringify(dataList));
    console.log("Data auto-saved! Total items:", dataList.length);
  }, [dataList]);

  // get the latest currency rates from the api
  useEffect(() => {
    const fetchStuff = async () => {
      console.log("Fetching currency rates, please wait...");
      try {
        const res = await fetchExchangeRates('INR');
        setAllRates(res.rates);
        
        // just take the first few currencies to keep it simple
        if (res.rates) {
          const keys = Object.keys(res.rates);
          setCurrs(keys.slice(0, 12));
        }
      } catch (e) {
        console.log("Error fetching rates, using defaults instead", e);
      } finally {
        // give it a small delay so the loader is visible
        setTimeout(() => {
          setIsLoad(false);
          console.log("App is ready for use!");
        }, 1000);
      }
    };
    fetchStuff();
  }, []);

  const addNew = (entry) => {
    const finalObj = { 
      ...entry, 
      id: uuidv4(), 
      date: entry.date || new Date().toISOString() 
    };
    setDataList([finalObj, ...dataList]);
    console.log("New entry added to list:", finalObj);
  };

  const deleteOne = (id) => {
    const newList = dataList.filter(item => item.id !== id);
    setDataList(newList);
    console.log("Item removed, id was:", id);
  };

  const getMoney = (val) => {
    // convert the amount based on selected currency
    let num = Number(val);
    if (currType !== 'INR') {
      const rate = allRates[currType] || 1;
      num = num * rate;
    }
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currType,
    }).format(num);
  };

  const shared = {
    transactions: dataList,
    addTransaction: addNew,
    deleteTransaction: deleteOne,
    formatAmount: getMoney,
    isAppLoading: isLoad,
    targetCurrency: currType,
    setTargetCurrency: setCurrType,
    availableCurrencies: currs,
    rates: allRates
  };

  return (
    <FinanceContext.Provider value={shared}>
      {children}
    </FinanceContext.Provider>
  );
};
