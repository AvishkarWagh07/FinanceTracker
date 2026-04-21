import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { toast } from 'react-toastify';
import './Dashboard.css';

const TransactionForm = () => {
  const { addTransaction } = useFinance();
  const move = useNavigate();

  // local state for the form
  const [amt, setAmt] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('expense');
  const [cat, setCat] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [err, setErr] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving new entry...");

    // simple manual validation
    if (!amt || Number(amt) <= 0) {
      setErr("Amount must be more than 0");
      return;
    }
    if (desc.length < 3) {
      setErr("Description is too short");
      return;
    }

    const newObj = {
      amount: Number(amt),
      description: desc,
      type: type,
      category: cat,
      date: date
    };

    addTransaction(newObj);
    toast.success("Done! Saved.");
    move('/');
  };

  return (
    <div className="container">
      <section className="hero">
        <span className="badge badge-gray">NEW ENTRY</span>
        <h1>Record your <span className="highlighted">spending</span>.</h1>
        <p className="hero-desc">Enter the details below to keep your records straight.</p>
      </section>

      <div className="bento-card" style={{maxWidth: '550px', margin: '0 auto'}}>
        <form onSubmit={handleSave} className="entry-form">
          {err && <p className="error-text" style={{textAlign: 'center', background: '#fee2e2', padding: '10px', borderRadius: '8px'}}>{err}</p>}

          <div className="form-group">
            <label>How much?</label>
            <input 
              type="number" 
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
              placeholder="0.00" 
            />
          </div>

          <div className="form-group">
            <label>What was it for?</label>
            <input 
              type="text" 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Bought some snacks" 
            />
          </div>

          <div className="form-row" style={{display: 'flex', gap: '15px'}}>
            <div className="form-group" style={{flex: 1}}>
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Category</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
                <option value="Salary">Salary</option>
                <option value="Fun">Fun</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>When?</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit" className="add-btn-inline" style={{width: '100%', border: 'none', cursor: 'pointer', marginTop: '10px'}}>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
