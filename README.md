# Personal Finance & Expense Analytics App

## Main Goal
The core objective of this application is to empower users with a modern, fast, and feature-rich interface to track, categorize, and analyze their personal finances comprehensively. It handles multi-currency transactions, recurring expenses, and dynamic budget tracking while offering an entirely responsive, beautiful dark-mode-native user interface.

## Core Features
1. **Dynamic Dashboard:** A central hub displaying immediate balance, income vs. expenses, and a quick list of recent transactions.
2. **Transaction Management:** Add, edit, query, and delete entries flexibly. Robust validation protects against human error using `yup` and React Hook Form. Support for categorizing operations. 
3. **Advanced Budgeting:** Define a monthly budget threshold and measure current expenses against it with responsive visual progress bars.
4. **Analytics & Visualization:** Powered by `Recharts`, users can explore data using pie charts, bar indicators, and deeply understand their spending taxonomy.
5. **Theme & Currency Flexibility:** Instantly switch currencies dynamically (pulling live or cached exchange rates) and toggle between seamless Light and fully-stylized Dark Mode. Extensively customized CSS variables guarantee total compatibility.
6. **Data Persistence:** Offline-first capable through local storage memoization—transactions, theme selection, custom currency targets, and budgets safely persist.

## Project Structure
```text
project_two/
├── public/                 # Static assets
└── src/
    ├── components/         # Reusable UI fragments
    │   ├── Layout.jsx      # Base container handling Navbar and active sub-routes
    │   ├── Navbar.jsx      # Navigation, Currency Selector, Dark Mode Toggle
    │   └── SkeletonLoader/ # Adaptive shimmer loaders
    ├── context/
    │   └── FinanceContext/ # Centralized application state (Transactions, Budget, Theme)
    ├── hooks/
    │   ├── useCurrency.js  # Exchange rate processing/mapping functionality 
    │   └── useDebounce.js  # Optimizes transaction search filters
    ├── pages/              # Primary route views
    │   ├── Analytics/      
    │   ├── Budget/         
    │   ├── Dashboard/      
    │   ├── TransactionForm/# Detailed forms supporting complex Yup validation   
    │   └── Transactions/   # Core data grid and filtering page
    ├── App.jsx             # React Router instantiation & toast providers
    ├── index.css           # Global typography, resets, and core dark mode CSS variables
    └── main.jsx            # React root component render
```

## Tools Used In React
- **React Router Dom (`v6`):** For scalable client-side routing logic. 
- **React Hook Form & Yup:** Extremely performant form validation, streamlining the process of adding granular `Transactions`.
- **Framer Motion:** Adds subtle aesthetic animations and entrance layout transitions for table grids.
- **Recharts:** Highly customizable charts offering rich tooltips and categorical color mapping.
- **React Toastify:** For unobtrusive but clear user action notifications (Success/Failure alerts). 
- **React Icons (`fa`):** High-quality SVG icons mapping correctly to their component's text.
- **UUID:** Generate robust, globally unique IDs per transaction entity.

## Extensible Utils
* **`useCurrency` Hook:** Pulls and caches currency data, mapping internal integer values dynamically against a calculated conversion schema based on user-preference. 
* **`useDebounce` Hook:** Specifically built to delay exhaustive text filtering algorithms when searching transactions, saving computation cycles. 

## How To Run Locally
1. **Prerequisites:** Make sure you have Node.js installed (LTS recommended).
2. **Installation:** Open your terminal inside the root application logic:
   ```bash
   npm install
   ```
3. **Start Development Server:**
   ```bash
   npm run dev
   ```
4. **Build Production Bundle:** To generate the minified deploy application artifacts:
   ```bash
   npm run build
   ```

## Further Planning
- **Supabase/Firebase Integration:** Shift from browser-local caching to authenticated remote sync architectures.
- **Receipt Parsing:** Utilize an OCR API to automatically ingest receipt images and classify expenses.
- **Goal Sub-Trackers:** Beyond a general "Budget" logic, permit setting up sub-saving plans (e.g. "Vacation Fund", "Emergency Savings").
- **Financial Predictive APIs:** Implement regressions over collected transaction histories forecasting next month's potential burn rate.
