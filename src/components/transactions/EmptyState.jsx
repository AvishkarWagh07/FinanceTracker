import { Link } from 'react-router-dom';
import { FaPlusCircle, FaInbox } from 'react-icons/fa';

const EmptyState = ({ message, showAdd = true }) => {
  return (
    <div className="bento-card empty-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
      <FaInbox style={{ fontSize: '48px', color: '#e5e1da', marginBottom: '20px' }} />
      <p style={{ color: '#666666', fontSize: '18px', fontWeight: '500', marginBottom: '24px' }}>
        {message || "No entries found yet."}
      </p>
      {showAdd && (
        <Link to="/transactions/new" className="add-btn-inline">
          <FaPlusCircle style={{ marginRight: '8px' }} /> Add Your First Entry
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
