import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // sharing styles

const Transactions = () => {
  const { transactions, deleteTransaction, formatAmount } = useFinance();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t => 
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">TRANSACTION HISTORY</span>
        <h1>All your **activity** in one place.</h1>
        <p className="hero-desc">Search through your past spending and earnings easily.</p>
      </section>

      <div className="filter-bar">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="/transactions/new" className="add-btn-inline" style={{marginTop: 0}}>
          + Add New
        </Link>
      </div>

      <p className="country-count">{filtered.length} TRANSACTIONS FOUND</p>

      <div className="country-grid">
        {filtered.map(t => (
          <div key={t.id} className="bento-card country-card">
            <div className="country-header">
              <div className="country-info">
                <span className="country-name">{t.category || 'General'}</span>
              </div>
              <span className={`badge ${t.type === 'expense' ? 'badge-red' : 'badge-green'}`}>
                {t.type}
              </span>
            </div>
            <div className="country-stats">
              <div className="stat-col">
                <p className={`stat-val ${t.type === 'expense' ? 'red' : 'green'}`}>
                  {formatAmount(t.amount)}
                </p>
                <p className="stat-label">AMOUNT</p>
              </div>
              <button 
                onClick={() => deleteTransaction(t.id)}
                className="delete-btn-minimal"
              >
                Delete
              </button>
            </div>
            <p className="stat-footer">{t.description || 'No description'} • {new Date(t.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
