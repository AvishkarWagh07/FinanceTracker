import { useFinance } from '../context/FinanceContext';
import './Dashboard.css';

const Analytics = () => {
  const { transactions, formatAmount } = useFinance();
  
  const income = transactions.filter(t => t.type === 'income').length;
  const expense = transactions.filter(t => t.type === 'expense').length;

  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">ANALYTICS</span>
        <h1>Your money **stats**.</h1>
        <p className="hero-desc">A quick breakdown of your transaction types.</p>
      </section>

      <div className="summary-grid">
        <div className="bento-card">
          <p className="card-val gray">{income}</p>
          <p className="card-label">INCOME ENTRIES</p>
        </div>
        <div className="bento-card">
          <p className="card-val gray">{expense}</p>
          <p className="card-label">EXPENSE ENTRIES</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
