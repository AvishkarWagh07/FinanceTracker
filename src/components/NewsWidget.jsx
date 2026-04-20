import { useState, useEffect } from 'react';
import { fetchFinancialNews } from '../services/newsService';
import SkeletonLoader from './SkeletonLoader';
import { FaNewspaper, FaExternalLinkAlt } from 'react-icons/fa';
import './NewsWidget.css';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getNews = async () => {
      const articles = await fetchFinancialNews();
      if (isMounted) {
        setNews(articles);
        setLoading(false);
      }
    };
    getNews();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="news-widget">
        <div className="section-header">
          <h3><FaNewspaper className="news-title-icon" /> Market News</h3>
        </div>
        <div className="news-list">
          <SkeletonLoader type="list-item" />
          <SkeletonLoader type="list-item" />
        </div>
      </div>
    );
  }

  return (
    <div className="news-widget">
      <div className="section-header">
        <h3><FaNewspaper className="news-title-icon" /> Market News</h3>
      </div>
      <div className="news-list">
        {news.slice(0, 3).map((article, idx) => (
          <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer" className="news-item">
            <div className="news-content">
              <h4>{article.title}</h4>
              <p>{article.description ? article.description.substring(0, 90) + '...' : 'Click to read full story...'}</p>
              <div className="news-meta">
                <span>{article.source.name}</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <FaExternalLinkAlt className="news-icon" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
