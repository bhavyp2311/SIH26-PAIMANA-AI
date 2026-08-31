import { getRiskColor } from '../../utils/helpers';

const RiskCard = ({ title, value, maxValue = 100, description, severity }) => {
  const percentage = (value / maxValue) * 100;
  const color = getRiskColor(severity);

  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-text">{title}</h4>
        <span className="text-lg font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      {description && (
        <p className="text-xs text-muted mt-2">{description}</p>
      )}
    </div>
  );
};

export default RiskCard;
