import { useFinance } from '../context/FinanceContext';
import './Dashboard.css';

const Budget = () => {
  const { transactions, formatAmount } = useFinance();
  
  // simple student logic: group by category
  const categories = [...new Set(transactions.map(t => t.category))];
  
  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">BUDGETING</span>
        <h1>Control your **spending**.</h1>
        <p className="hero-desc">See how much you are spending in each category.</p>
      </section>

      <div className="country-grid">
        {categories.map(cat => {
          const total = transactions
            .filter(t => t.category === cat && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return (
            <div key={cat} className="bento-card country-card">
              <h3 className="country-name">{cat}</h3>
              <p className="stat-val red">{formatAmount(total)}</p>
              <p className="stat-label">TOTAL SPENT</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;
