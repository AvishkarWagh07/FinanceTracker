import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions, deleteTransaction, formatAmount, isWait } = useFinance();

  console.log("Dashboard rendering... total tx:", transactions.length);

  // basic calculations
  const totalIncome = transactions
    .filter(t => t.type?.toLowerCase() === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type?.toLowerCase() === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  // show only 5 recent ones
  const recentStuff = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (isWait) {
    return <div className="container"><h3>Wait a sec, loading your wallet...</h3></div>;
  }

  return (
    <div className="container">
      {/* Hero section */}
      <section className="hero">
        <span className="badge badge-gray">FINANCIAL OVERVIEW</span>
        <h1>Track your world's **money** story.</h1>
        <p className="hero-desc">Income, expenses, and savings across every category — updated in real time as you spend.</p>
      </section>

      {/* Summary Cards */}
      <motion.div 
        className="summary-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bento-card">
          <p className={`card-val ${netBalance >= 0 ? 'green' : 'red'}`}>{formatAmount(netBalance)}</p>
          <p className="card-label">NET BALANCE</p>
        </div>
        <div className="bento-card">
          <p className="card-val green">{formatAmount(totalIncome)}</p>
          <p className="card-label">TOTAL INCOME</p>
        </div>
        <div className="bento-card">
          <p className="card-val red">{formatAmount(totalExpenses)}</p>
          <p className="card-label">TOTAL EXPENSES</p>
        </div>
        <div className="bento-card">
          <p className="card-val gray">{transactions.length}</p>
          <p className="card-label">TRANSACTIONS</p>
        </div>
      </motion.div>

      {/* Recent Activity Header */}
      <div className="section-header-flex">
        <p className="country-count">RECENT ACTIVITY</p>
        <Link to="/transactions" className="view-all-btn">View All</Link>
      </div>

      {/* Recent Transactions Grid */}
      <div className="country-grid">
        {recentStuff.length === 0 ? (
          <div className="bento-card empty-card">
            <p>No transactions yet. Add some to see them here!</p>
            <Link to="/transactions/new" className="add-btn-inline">Add Transaction</Link>
          </div>
        ) : (
          recentStuff.map(t => (
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
              </div>
              <p className="stat-footer">{t.description || 'No description'} • {new Date(t.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
