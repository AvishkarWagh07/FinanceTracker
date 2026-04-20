import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card' }) => {
  return (
    <div className={`skeleton-loader skeleton-${type}`}>
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

export default SkeletonLoader;
