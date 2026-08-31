import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { projects } from '../../data/projects';

const Benchmarks = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');

  const project = projects.find(p => p.id === selectedProject);

  const calculateAverages = (projectList) => {
    if (projectList.length === 0) return { riskScore: 0, progress: 0, costEscalation: 0, scheduleDeviation: 0 };
    return {
      riskScore: Math.round(projectList.reduce((sum, p) => sum + p.riskScore, 0) / projectList.length),
      progress: Math.round(projectList.reduce((sum, p) => sum + p.physicalProgress, 0) / projectList.length),
      costEscalation: Math.round(projectList.reduce((sum, p) => sum + ((p.revisedCost - p.originalCost) / p.originalCost * 100), 0) / projectList.length),
      scheduleDeviation: Math.round(projectList.reduce((sum, p) => sum + Math.round((new Date(p.revisedCompletionDate) - new Date(p.originalCompletionDate)) / (1000 * 60 * 60 * 24 * 30)), 0) / projectList.length)
    };
  };

  const sectorProjects = project ? projects.filter(p => p.sector === project.sector) : [];
  const ministryProjects = project ? projects.filter(p => p.ministry === project.ministry) : [];

  const projectMetrics = project ? {
    riskScore: project.riskScore,
    progress: project.physicalProgress,
    costEscalation: ((project.revisedCost - project.originalCost) / project.originalCost * 100).toFixed(1),
    scheduleDeviation: Math.round((new Date(project.revisedCompletionDate) - new Date(project.originalCompletionDate)) / (1000 * 60 * 60 * 24 * 30))
  } : null;

  const sectorAvg = calculateAverages(sectorProjects);
  const ministryAvg = calculateAverages(ministryProjects);
  const portfolioAvg = calculateAverages(projects);

  const metrics = [
    { label: 'Risk Score', key: 'riskScore', unit: '/100', max: 100 },
    { label: 'Physical Progress', key: 'progress', unit: '%', max: 100 },
    { label: 'Cost Escalation', key: 'costEscalation', unit: '%', max: 50 },
    { label: 'Schedule Deviation', key: 'scheduleDeviation', unit: 'mo', max: 36 }
  ];

  const legendItems = [
    { color: 'bg-navy', label: 'Selected' },
    { color: 'bg-navy-light', label: 'Sector Avg' },
    { color: 'bg-muted/30', label: 'Ministry Avg' },
    { color: 'bg-gray-400', label: 'Portfolio Avg' }
  ];

  return (
    <div>
      <PageHeader
        title="Project Benchmarking"
        subtitle="Compare project performance against sector, ministry and portfolio averages"
      />

      {/* Project Selector */}
      <div className="mb-6 sm:mb-8">
        <label className="text-sm text-muted mr-3">Select Project:</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full sm:w-auto sm:min-w-[400px] px-4 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
        >
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
          ))}
        </select>
      </div>

      {project && projectMetrics && (
        <>
          {/* Mobile Legend */}
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:hidden">
            {legendItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`}></div>
                <span className="text-[11px] text-muted">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Comparison Chart */}
          <div className="bg-white border border-border rounded-xl p-4 sm:p-6 mb-6">
            <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4 sm:mb-6">COMPARISON ANALYSIS</h3>

            <div className="space-y-6 sm:space-y-8">
              {metrics.map((metric) => {
                const projectValue = parseFloat(projectMetrics[metric.key]);
                const sectorValue = sectorAvg[metric.key];
                const ministryValue = ministryAvg[metric.key];
                const portfolioValue = portfolioAvg[metric.key];
                const maxValue = Math.max(projectValue, sectorValue, ministryValue, portfolioValue, metric.max);

                return (
                  <div key={metric.key}>
                    <div className="text-sm font-medium text-text mb-3">{metric.label}</div>
                    <div className="space-y-2">
                      {/* Project */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Selected</div>
                        <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                          <div
                            className="h-full bg-navy rounded transition-all duration-500"
                            style={{ width: `${(projectValue / maxValue) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 sm:w-20 text-right text-xs sm:text-sm font-medium text-text">
                          {projectValue}{metric.unit}
                        </div>
                      </div>
                      {/* Sector Average */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Sector Avg</div>
                        <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                          <div
                            className="h-full bg-navy-light rounded transition-all duration-500"
                            style={{ width: `${(sectorValue / maxValue) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 sm:w-20 text-right text-xs sm:text-sm text-muted">
                          {sectorValue}{metric.unit}
                        </div>
                      </div>
                      {/* Ministry Average */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Ministry Avg</div>
                        <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                          <div
                            className="h-full bg-muted/30 rounded transition-all duration-500"
                            style={{ width: `${(ministryValue / maxValue) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 sm:w-20 text-right text-xs sm:text-sm text-muted">
                          {ministryValue}{metric.unit}
                        </div>
                      </div>
                      {/* Portfolio Average */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Portfolio Avg</div>
                        <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                          <div
                            className="h-full bg-gray-400 rounded transition-all duration-500"
                            style={{ width: `${(portfolioValue / maxValue) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 sm:w-20 text-right text-xs sm:text-sm text-muted">
                          {portfolioValue}{metric.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-bg border border-border rounded-xl">
            <p className="text-xs text-muted text-center">
              Prototype Benchmarking Data | Illustrative Prototype Trend | Demo Output
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Benchmarks;
