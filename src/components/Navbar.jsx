import { Link, NavLink } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import './Navbar.css';

const Navbar = () => {
  const { targetCurrency, setTargetCurrency, availableCurrencies } = useFinance();
  
  // keep it clean and minimal like the photo
  console.log("Navbar is here! Current currency:", targetCurrency);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="navbar-brand">
          FinTrack
        </Link>
        
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/budget" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Budget
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Analytics
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <select 
            className="currency-drop"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {availableCurrencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Link to="/transactions/new" className="new-btn">
            + New
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
