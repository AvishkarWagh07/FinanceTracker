import { FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, description, amount, type, category, date } = transaction;

  console.log("Rendering item:", description);

  return (
    <div className="bento-card country-card">
      <div className="country-header">
        <div className="country-info">
          <div className={`type-icon ${type}`}>
            {type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
          </div>
          <div>
            <span className="country-name">{description}</span>
            <p className="stat-label" style={{marginTop: '2px'}}>{category}</p>
          </div>
        </div>
        <span className={`badge ${type === 'expense' ? 'badge-red' : 'badge-green'}`}>
          {type}
        </span>
      </div>
      
      <div className="country-stats" style={{alignItems: 'center'}}>
        <div className="stat-col">
          <p className={`stat-val ${type === 'expense' ? 'red' : 'green'}`}>
            {type === 'expense' ? '-' : '+'}{new Intl.NumberFormat('en-IN').format(amount)}
          </p>
          <p className="stat-label">AMOUNT</p>
        </div>
        <button 
          className="delete-btn-minimal"
          onClick={() => onDelete(id)}
          title="Remove entry"
        >
          <FaTrash />
        </button>
      </div>
      
      <p className="stat-footer">
        {new Date(date).toLocaleDateString(undefined, { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </p>
    </div>
  );
};

export default TransactionItem;
