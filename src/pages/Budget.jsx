import { useFinance } from '../context/FinanceContext';
import EmptyState from '../components/transactions/EmptyState';
import './Dashboard.css';

const Budget = () => {
  const { transactions, formatAmount } = useFinance();
  
  console.log("Budget page loading... total entries:", transactions.length);

  // find all unique categories first
  const cats = [];
  transactions.forEach(t => {
    if (t.category && !cats.includes(t.category)) {
      cats.push(t.category);
    }
  });
  
  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">BUDGETING</span>
        <h1>Control your <span className="highlighted">spending</span>.</h1>
        <p className="hero-desc">Checking how much I spent on different things.</p>
      </section>

      {transactions.length === 0 ? (
        <EmptyState message="Nothing to show here yet. Add some data!" />
      ) : (
        <div className="country-grid">
          {cats.map(c => {
            // work out the total for this specific category
            let totalVal = 0;
            transactions.forEach(t => {
              if (t.category === c && t.type === 'expense') {
                totalVal += Number(t.amount);
              }
            });
            
            // don't show it if it's zero
            if (totalVal <= 0) {
              return null;
            }

            return (
              <div key={c} className="bento-card country-card">
                <h3 className="country-name">{c}</h3>
                <p className="stat-val red">{formatAmount(totalVal)}</p>
                <p className="stat-label">TOTAL SPENT</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Budget;
