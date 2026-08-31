import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { getRiskColor } from '../../utils/helpers';

const WarningCard = ({ warning, basePath = '/mospi/projects' }) => {
  const navigate = useNavigate();

  const getWarningIcon = (type) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'cost': return DollarSign;
      case 'milestone': return Clock;
      default: return Bell;
    }
  };

  const Icon = getWarningIcon(warning.type);
  const color = getRiskColor(warning.severity);

  return (
    <div 
      className="p-4 bg-white border border-border rounded-xl hover:shadow-sm transition-shadow cursor-pointer"
      onClick={() => navigate(`${basePath}/${warning.projectId}`)}
    >
      <div className="flex items-start gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-muted">{warning.projectId}</span>
            <span 
              className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase"
              style={{ backgroundColor: `${color}15`, color }}
            >
              {warning.severity}
            </span>
          </div>
          <h4 className="text-sm font-medium text-text mb-1 truncate">{warning.projectName}</h4>
          <p className="text-sm text-muted mb-2">{warning.message}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">{warning.date}</span>
            <span className="text-xs text-navy font-medium">View Details →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningCard;
