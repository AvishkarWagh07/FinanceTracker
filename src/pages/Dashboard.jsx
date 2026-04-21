import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TransactionItem from '../components/transactions/TransactionItem';
import EmptyState from '../components/transactions/EmptyState';
import NewsWidget from '../components/NewsWidget';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions, deleteTransaction, formatAmount, isAppLoading } = useFinance();

  console.log("Dashboard is loading up...");

  // work out the totals manually to be safe
  let myIncome = 0;
  let myExpense = 0;

  transactions.forEach(t => {
    if (t.type === 'income') {
      myIncome += Number(t.amount);
    } else {
      myExpense += Number(t.amount);
    }
  });

  const myBalance = myIncome - myExpense;

  // just show the latest 4 things
  const latestItems = [...transactions]
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 4);

  if (isAppLoading) {
    return (
      <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
        <div className="loader-student">Wait... loading your wallet</div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Top section with text */}
      <section className="hero">
        <span className="badge badge-gray">MY OVERVIEW</span>
        <h1>Track your <span className="highlighted">money</span> story.</h1>
        <p className="hero-desc">Keep an eye on every rupee. Watch your savings grow over time!</p>
      </section>

      {/* Box grid for totals */}
      <motion.div 
        className="summary-grid"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bento-card">
          <p className={`card-val ${myBalance >= 0 ? 'green' : 'red'}`}>{formatAmount(myBalance)}</p>
          <p className="card-label">CURRENT BALANCE</p>
        </div>
        <div className="bento-card">
          <p className="card-val green">{formatAmount(myIncome)}</p>
          <p className="card-label">TOTAL EARNINGS</p>
        </div>
        <div className="bento-card">
          <p className="card-val red">{formatAmount(myExpense)}</p>
          <p className="card-label">TOTAL SPENT</p>
        </div>
        <div className="bento-card">
          <p className="card-val gray">{transactions.length}</p>
          <p className="card-label">NO. OF ENTRIES</p>
        </div>
      </motion.div>

      {/* Latest transactions list */}
      <div className="section-header-flex" style={{marginTop: '40px'}}>
        <p className="country-count">RECENT ACTIVITY</p>
        <Link to="/transactions" className="view-all-btn">Show all history</Link>
      </div>

      <div className="country-grid">
        {latestItems.length === 0 ? (
          <EmptyState message="You haven't added any transactions yet. Try adding one!" />
        ) : (
          latestItems.map(item => {
            return (
              <TransactionItem 
                key={item.id} 
                transaction={item} 
                onDelete={deleteTransaction} 
              />
            );
          })
        )}
      </div>

      {/* Some news at the bottom */}
      <NewsWidget />
    </div>
  );
};

export default Dashboard;
