import { useNavigate } from 'react-router-dom';
import { getRiskColor } from '../../utils/helpers';

const RiskMatrix = ({ data, basePath = '/mospi/projects' }) => {
  const navigate = useNavigate();

  const quadrants = [
    { x: 0, y: 0, width: 50, height: 50, label: 'LOW PRIORITY', color: '#2E8B57' },
    { x: 50, y: 0, width: 50, height: 50, label: 'WATCH', color: '#C58A16' },
    { x: 0, y: 50, width: 50, height: 50, label: 'WATCH', color: '#C58A16' },
    { x: 50, y: 50, width: 50, height: 50, label: 'HIGH PRIORITY', color: '#D95C4F' }
  ];

  return (
    <div className="min-w-0 bg-white border border-border rounded-xl p-4 sm:p-5">
      <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-2">RISK MATRIX</h3>
      <p className="text-xs text-muted mb-4">Prototype Risk Score Visualization</p>

      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="relative min-w-[320px]" style={{ height: '350px' }}>
          {/* Quadrants */}
          <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            {quadrants.map((q, i) => (
              <rect
                key={i}
                x={q.x}
                y={100 - q.y - q.height}
                width={q.width}
                height={q.height}
                fill={q.color}
                fillOpacity={0.08}
                stroke={q.color}
                strokeWidth={0.5}
                strokeOpacity={0.2}
              />
            ))}
          </svg>

          {/* Axis labels */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted font-medium">
            TIME RISK →
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted font-medium">
            COST RISK →
          </div>

          {/* Data points */}
          {data.map((point) => {
            const x = point.timeRisk;
            const y = 100 - point.costRisk;
            const color = getRiskColor(point.riskLevel);

            return (
              <div
                key={point.id}
                className="absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform z-10"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor: color
                }}
                title={`${point.name}\nRisk Score: ${point.riskScore}\nTime Risk: ${point.timeRisk}%\nCost Risk: ${point.costRisk}%`}
                onClick={() => navigate(`${basePath}/${point.id}`)}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-risk-low"></div>
          <span className="text-xs text-muted">Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-risk-medium"></div>
          <span className="text-xs text-muted">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-risk-high"></div>
          <span className="text-xs text-muted">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-risk-critical"></div>
          <span className="text-xs text-muted">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default RiskMatrix;
