import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  // state for transactions - load from storage if we have any
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('my_money_data');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isWait, setIsWait] = useState(true);
  const [targetCurrency, setTargetCurrency] = useState('INR');

  // saving to storage whenever transactions change
  useEffect(() => {
    localStorage.setItem('my_money_data', JSON.stringify(transactions));
    console.log("Saving data to storage...", transactions.length, "items");
  }, [transactions]);

  // simulate loading for that student vibe
  useEffect(() => {
    setTimeout(() => {
      setIsWait(false);
      console.log("App is ready to go!");
    }, 1000);
  }, []);

  const addTransaction = (data) => {
    const newTx = { ...data, id: uuidv4(), date: data.date || new Date().toISOString() };
    setTransactions(prev => [newTx, ...prev]);
    console.log("Added new stuff:", newTx);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    console.log("Deleted item with id:", id);
  };

  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: targetCurrency,
    }).format(amt);
  };

  const val = {
    transactions,
    addTransaction,
    deleteTransaction,
    formatAmount,
    isWait,
    targetCurrency,
    setTargetCurrency,
    availableCurrencies: ['INR', 'USD', 'EUR', 'GBP']
  };

  return (
    <FinanceContext.Provider value={val}>
      {children}
    </FinanceContext.Provider>
  );
};
