import { useNavigate } from 'react-router-dom';
import RiskBadge from './RiskBadge';

const ProjectTable = ({ projects, basePath = '/mospi/projects' }) => {
  const navigate = useNavigate();

  const getRiskColor = (level) => {
    const colors = {
      low: 'text-risk-low',
      medium: 'text-risk-medium',
      high: 'text-risk-high',
      critical: 'text-risk-critical'
    };
    return colors[level] || 'text-muted';
  };

  const getRiskScoreColor = (score) => {
    if (score <= 29) return '#2E8B57';
    if (score <= 59) return '#C58A16';
    if (score <= 79) return '#D95C4F';
    return '#B42318';
  };

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Sector</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Ministry</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Risk Score</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Cost Risk</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Time Risk</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => navigate(`${basePath}/${project.id}`)}
                  className="border-b border-border last:border-0 hover:bg-bg/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <div className="text-xs text-muted font-mono mb-0.5">{project.id}</div>
                      <div className="text-sm font-medium text-text">{project.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{project.sector}</td>
                  <td className="px-5 py-4 text-sm text-muted max-w-[200px] truncate">{project.ministry}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-sm font-semibold ${getRiskColor(project.riskLevel)}`}>
                      {project.riskScore}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-sm ${project.costRisk > 30 ? 'text-risk-high font-medium' : 'text-muted'}`}>
                      {project.costRisk}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-sm ${project.timeRisk > 30 ? 'text-risk-high font-medium' : 'text-muted'}`}>
                      {project.timeRisk}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <RiskBadge level={project.riskLevel} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`${basePath}/${project.id}`)}
            className="bg-white border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] text-muted font-mono">{project.id}</div>
                <div className="text-[14px] font-medium text-text leading-snug mt-0.5">{project.name}</div>
              </div>
              <RiskBadge level={project.riskLevel} size="sm" />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-border">
              <div>
                <div className="text-[10px] text-muted uppercase">Risk Score</div>
                <div className="text-[15px] font-bold" style={{ color: getRiskScoreColor(project.riskScore) }}>
                  {project.riskScore}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase">Cost Risk</div>
                <div className={`text-[14px] font-medium ${project.costRisk > 30 ? 'text-risk-high' : 'text-muted'}`}>
                  {project.costRisk}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase">Time Risk</div>
                <div className={`text-[14px] font-medium ${project.timeRisk > 30 ? 'text-risk-high' : 'text-muted'}`}>
                  {project.timeRisk}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-[12px] text-muted truncate mr-2">{project.sector}</span>
              <span className="text-[12px] font-medium text-navy flex-shrink-0">View →</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectTable;
