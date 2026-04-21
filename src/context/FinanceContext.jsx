import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchExchangeRates } from '../services/currencyService';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  // this is where we store all our transactions
  const [dataList, setDataList] = useState([]);
  
  const [isLoad, setIsLoad] = useState(true);
  const [currType, setCurrType] = useState('INR');
  const [allRates, setAllRates] = useState({});
  const [currs, setCurrs] = useState(['INR', 'USD', 'EUR', 'GBP', 'JPY']);

  // Connect to Firestore and get data in real-time
  useEffect(() => {
    console.log("Checking Firestore for your data...");
    
    // reference to our collection
    const itemsCol = collection(db, "finance_entries");
    const q = query(itemsCol, orderBy("date", "desc"));

    // listen for any changes (live updates!)
    const unsub = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setDataList(items);
      console.log("Got fresh data from Firebase! Count:", items.length);
      setIsLoad(false); // hide loader once we have data
    }, (error) => {
      console.log("Wait, Firebase error!", error);
      // fallback to local storage if firebase fails
      const saved = localStorage.getItem('finance_tracker_v3');
      if (saved) {
        setDataList(JSON.parse(saved));
      }
      setIsLoad(false);
    });

    return () => unsub();
  }, []);

  // save to local storage as a backup
  useEffect(() => {
    if (dataList.length > 0) {
      localStorage.setItem('finance_tracker_v3', JSON.stringify(dataList));
      console.log("Backing up data locally...");
    }
  }, [dataList]);

  // get currency rates
  useEffect(() => {
    const fetchStuff = async () => {
      try {
        const res = await fetchExchangeRates('INR');
        setAllRates(res.rates);
        if (res.rates) {
          setCurrs(Object.keys(res.rates).slice(0, 12));
        }
      } catch (e) {
        console.log("Currency rate error", e);
      }
    };
    fetchStuff();
  }, []);

  const addNew = async (entry) => {
    console.log("Adding new entry to Firebase...");
    try {
      const finalObj = { 
        ...entry, 
        date: entry.date || new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      // add to Firestore
      await addDoc(collection(db, "finance_entries"), finalObj);
      console.log("Successfully added to cloud!");
    } catch (e) {
      console.log("Firebase add failed, adding locally only", e);
      // local fallback
      const localObj = { ...entry, id: uuidv4(), date: entry.date || new Date().toISOString() };
      setDataList([localObj, ...dataList]);
    }
  };

  const deleteOne = async (id) => {
    console.log("Deleting from Firebase, id:", id);
    try {
      await deleteDoc(doc(db, "finance_entries", id));
      console.log("Deleted from cloud!");
    } catch (e) {
      console.log("Firebase delete failed", e);
      // local fallback
      setDataList(dataList.filter(item => item.id !== id));
    }
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
