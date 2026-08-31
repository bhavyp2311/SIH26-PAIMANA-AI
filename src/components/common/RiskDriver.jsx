import { getRiskColor } from '../../utils/helpers';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const RiskDriver = ({ driver }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'progress_gap': return AlertTriangle;
      case 'schedule_slippage': return Clock;
      case 'cost_trend': return TrendingUp;
      default: return AlertTriangle;
    }
  };

  const Icon = getIcon(driver.type);
  const color = getRiskColor(driver.severity);

  return (
    <div className="p-4 bg-bg rounded-lg border border-border">
      <div className="flex items-start gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium text-text">{driver.title}</h4>
            <span 
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{ backgroundColor: `${color}15`, color }}
            >
              {driver.severity.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-muted mb-3">{driver.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Contribution:</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${driver.contribution}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-xs font-medium text-text">{driver.contribution}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDriver;
