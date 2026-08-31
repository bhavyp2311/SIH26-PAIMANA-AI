import { getRiskColor } from '../../utils/helpers';

const RiskGauge = ({ score, size = 'lg' }) => {
  const getLevel = (score) => {
    if (score <= 25) return 'low';
    if (score <= 50) return 'medium';
    if (score <= 75) return 'high';
    return 'critical';
  };

  const level = getLevel(score);
  const color = getRiskColor(level);
  
  const sizeConfig = {
    sm: { width: 60, height: 60, strokeWidth: 6, fontSize: '14px' },
    md: { width: 80, height: 80, strokeWidth: 8, fontSize: '18px' },
    lg: { width: 100, height: 100, strokeWidth: 10, fontSize: '22px' }
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={config.width} height={config.height} className="-rotate-90">
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={config.strokeWidth}
        />
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-semibold text-text" style={{ fontSize: config.fontSize }}>
          {score}
        </span>
      </div>
    </div>
  );
};

export default RiskGauge;
