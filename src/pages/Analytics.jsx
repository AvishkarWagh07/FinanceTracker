import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import EmptyState from '../components/transactions/EmptyState';
import './Dashboard.css';

const Analytics = () => {
  const { transactions, formatAmount } = useFinance();

  console.log("Analytics page is rendering...");

  // work out chart data for expenses
  const expenseData = [];
  transactions.forEach(t => {
    if (t.type === 'expense') {
      // see if we already have this category
      let found = false;
      for (let i = 0; i < expenseData.length; i++) {
        if (expenseData[i].name === t.category) {
          expenseData[i].value += Number(t.amount);
          found = true;
          break;
        }
      }
      // if not found, add it
      if (!found) {
        expenseData.push({ name: t.category, value: Number(t.amount) });
      }
    }
  });

  // work out income vs expense
  let totalIn = 0;
  let totalOut = 0;
  
  transactions.forEach(t => {
    if (t.type === 'income') {
      totalIn += Number(t.amount);
    } else {
      totalOut += Number(t.amount);
    }
  });

  const barData = [
    { name: 'Income', value: totalIn },
    { name: 'Expenses', value: totalOut }
  ];

  const MY_COLORS = ['#1a1a1a', '#52525b', '#71717a', '#a1a1aa', '#d4d4d8'];

  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">STATISTICS</span>
        <h1>Your money <span className="highlighted">stats</span> & trends.</h1>
        <p className="hero-desc">Checking out the charts to see where the money goes.</p>
      </section>

      {transactions.length === 0 ? (
        <EmptyState message="No data here! Add some transactions to see the charts." />
      ) : (
        <div className="summary-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))'}}>
          {/* Pie chart for categories */}
          <div className="bento-card" style={{minHeight: '400px'}}>
            <h3 className="card-label" style={{marginBottom: '20px'}}>SPENDING BY CATEGORY</h3>
            {expenseData.length > 0 ? (
              <div style={{width: '100%', height: '300px'}}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={MY_COLORS[index % MY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p style={{marginTop: '100px', color: '#888'}}>No expenses recorded yet.</p>
            )}
          </div>

          {/* Bar chart for comparison */}
          <div className="bento-card" style={{minHeight: '400px'}}>
            <h3 className="card-label" style={{marginBottom: '20px'}}>INCOME VS SPENT</h3>
            <div style={{width: '100%', height: '300px'}}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v) => formatAmount(v)} />
                  <Bar dataKey="value">
                    {barData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.name === 'Income' ? '#16a34a' : '#dc2626'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
