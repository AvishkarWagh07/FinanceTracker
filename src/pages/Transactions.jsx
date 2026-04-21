import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TransactionItem from '../components/transactions/TransactionItem';
import EmptyState from '../components/transactions/EmptyState';
import './Dashboard.css';

const Transactions = () => {
  const { transactions, deleteTransaction, formatAmount } = useFinance();
  const [query, setQuery] = useState('');

  console.log("History page open, filtering with:", query);

  // use a simple filter loop
  const filtered = [];
  for (let i = 0; i < transactions.length; i++) {
    const item = transactions[i];
    const isMatch = item.description?.toLowerCase().includes(query.toLowerCase()) || 
                   item.category?.toLowerCase().includes(query.toLowerCase());
    if (isMatch) {
      filtered.push(item);
    }
  }

  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">TRANSACTION HISTORY</span>
        <h1>All your <span className="highlighted">activity</span> in one place.</h1>
        <p className="hero-desc">Checking through the past entries to see where the money went.</p>
      </section>

      <div className="filter-bar">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search by category or desc..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{width: '350px'}}
          />
        </div>
        <Link to="/transactions/new" className="add-btn-inline" style={{marginTop: 0}}>
          + New Entry
        </Link>
      </div>

      <p className="country-count">{filtered.length} ENTRIES FOUND</p>

      <div className="country-grid">
        {filtered.length === 0 ? (
          <EmptyState message={query ? "Nothing matches that search." : "Your history is currently empty."} showAdd={!query} />
        ) : (
          filtered.map(t => {
            return (
              <TransactionItem 
                key={t.id} 
                transaction={t} 
                onDelete={deleteTransaction} 
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Transactions;
