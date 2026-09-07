import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import RiskBadge from '../../components/common/RiskBadge';
import { useProjects } from '../../context/ProjectsContext';
import { formatCurrency } from '../../utils/helpers';

const MinistryProjects = () => {
  const navigate = useNavigate();
  const { projects, getMinistries } = useProjects();
  const [ministryFilter, setMinistryFilter] = useState('Ministry of Railways');

  const ministries = getMinistries();
  const filteredProjects = projects.filter(p => p.ministry === ministryFilter);

  return (
    <div>
      <PageHeader
        title="My Projects"
        subtitle="Monitor project health and take review actions"
      />

      {/* Ministry Selector */}
      <div className="mb-6">
        <label className="text-sm text-muted mr-3">Ministry:</label>
        <select
          value={ministryFilter}
          onChange={(e) => setMinistryFilter(e.target.value)}
          className="w-full sm:w-auto sm:min-w-[400px] px-4 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
        >
          {ministries.map(ministry => (
            <option key={ministry} value={ministry}>{ministry}</option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/ministry/projects/${project.id}`)}
            className="bg-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-muted">{project.id}</span>
                  <RiskBadge level={project.riskLevel} size="sm" />
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{project.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>{project.sector}</span>
                  <span>•</span>
                  <span>{project.agency}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-2xl font-semibold text-text mb-1">{project.riskScore}</div>
                <div className="text-xs text-muted">Risk Score</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <div className="text-xs text-muted mb-1">Physical Progress</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-navy rounded-full"
                        style={{ width: `${project.physicalProgress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text">{project.physicalProgress}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Cost Risk</div>
                  <span className={`text-sm font-medium ${project.costRisk > 30 ? 'text-risk-high' : 'text-text'}`}>
                    {project.costRisk}%
                  </span>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Time Risk</div>
                  <span className={`text-sm font-medium ${project.timeRisk > 30 ? 'text-risk-high' : 'text-text'}`}>
                    {project.timeRisk}%
                  </span>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Revised Cost</div>
                  <span className="text-sm font-medium text-text">{formatCurrency(project.revisedCost)}</span>
                </div>
              </div>
            </div>

            {project.warnings.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-risk-high animate-pulse"></span>
                <span className="text-xs text-risk-high">
                  {project.warnings.length} active warning{project.warnings.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinistryProjects;
