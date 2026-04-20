import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import './Dashboard.css';

const TransactionForm = () => {
  const { addTransaction } = useFinance();
  const move = useNavigate(); // humanised variable name
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    
    if (!formData.amount || isNaN(formData.amount)) {
      alert("Please enter a valid amount!");
      return;
    }

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    move('/'); // move back to dashboard
  };

  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">ADD NEW</span>
        <h1>Record a new **entry**.</h1>
        <p className="hero-desc">Keep your records straight by adding your latest transaction.</p>
      </section>

      <div className="bento-card" style={{maxWidth: '500px', margin: '0 auto'}}>
        <form onSubmit={handleSubmit} className="entry-form">
          <div className="form-group">
            <label>Amount</label>
            <input 
              type="number" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What was this for?"
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <button type="submit" className="add-btn-inline" style={{width: '100%', border: 'none', cursor: 'pointer'}}>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
