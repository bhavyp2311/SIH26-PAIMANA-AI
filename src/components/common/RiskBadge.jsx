import { getRiskColor, getRiskBgColor, getRiskLabel } from '../../utils/helpers';

const RiskBadge = ({ level, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded ${sizeClasses[size]}`}
      style={{
        backgroundColor: getRiskBgColor(level),
        color: getRiskColor(level)
      }}
    >
      {getRiskLabel(level)}
    </span>
  );
};

export default RiskBadge;
