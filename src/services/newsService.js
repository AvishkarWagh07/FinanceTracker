import axios from 'axios';

// Users should add VITE_NEWS_API_KEY to their .env file
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '7e7dbc234fbf44968c967cc5aebb0915';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

/**
 * Service to fetch financial news.
 * If no API key is provided, or the request limits are hit, 
 * it returns fallback realistic mock data so the UI can still be safely demonstrated.
 */
export const fetchFinancialNews = async () => {
  if (!NEWS_API_KEY) {
    console.warn("No VITE_NEWS_API_KEY found. Returning mock financial news.");
    return getMockNews();
  }

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: 'business',
        language: 'en',
        apiKey: NEWS_API_KEY,
        pageSize: 4
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('News Service Error:', error);
    return getMockNews(); // Fallback on networking/CORS error
  }
};

const getMockNews = () => [
  {
    title: "Global Markets Rally as Tech Stocks Surge",
    description: "Technology sector leads the global market recovery following strong quarterly earnings reports from industry giants.",
    url: "#",
    publishedAt: new Date().toISOString(),
    source: { name: "Finance Weekly" }
  },
  {
    title: "Central Bank Announces Steady Interest Rates",
    description: "The central bank has decided to keep interest rates steady for the upcoming quarter, citing stabilized inflation metrics.",
    url: "#",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: { name: "Market Watch" }
  },
  {
    title: "New Renewable Energy Investments Peak",
    description: "Massive influx of capital into solar and wind sectors as major funds shift priorities towards sustainable portfolios.",
    url: "#",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: { name: "Eco Finance News" }
  }
];
