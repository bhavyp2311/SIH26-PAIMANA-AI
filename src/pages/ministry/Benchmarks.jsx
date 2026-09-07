import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useProjects } from '../../context/ProjectsContext';

const MinistryBenchmarks = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');

  const project = projects.find(p => p.id === selectedProject);
  const sectorProjects = project ? projects.filter(p => p.sector === project.sector) : [];
  const ministryProjects = project ? projects.filter(p => p.ministry === project.ministry) : [];

  const calculateAverage = (projectList, key) => {
    if (projectList.length === 0) return 0;
    return Math.round(projectList.reduce((sum, p) => sum + p[key], 0) / projectList.length);
  };

  const metrics = project ? [
    { label: 'Risk Score', project: project.riskScore, sector: calculateAverage(sectorProjects, 'riskScore'), ministry: calculateAverage(ministryProjects, 'riskScore'), max: 100 },
    { label: 'Physical Progress', project: project.physicalProgress, sector: calculateAverage(sectorProjects, 'physicalProgress'), ministry: calculateAverage(ministryProjects, 'physicalProgress'), max: 100 },
    { label: 'Cost Risk', project: project.costRisk, sector: calculateAverage(sectorProjects, 'costRisk'), ministry: calculateAverage(ministryProjects, 'costRisk'), max: 100 },
    { label: 'Time Risk', project: project.timeRisk, sector: calculateAverage(sectorProjects, 'timeRisk'), ministry: calculateAverage(ministryProjects, 'timeRisk'), max: 100 }
  ] : [];

  const legendItems = [
    { color: 'bg-navy', label: 'Your Project' },
    { color: 'bg-navy-light', label: 'Sector Avg' },
    { color: 'bg-muted/30', label: 'Ministry Avg' }
  ];

  return (
    <div>
      <PageHeader
        title="Benchmarks"
        subtitle="Compare your project against sector and ministry averages"
      />

      <div className="mb-6">
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

      {project && (
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4 sm:mb-6">COMPARISON</h3>

          {/* Mobile legend */}
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:hidden">
            {legendItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`}></div>
                <span className="text-[11px] text-muted">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 sm:space-y-8">
            {metrics.map((metric) => {
              const maxValue = Math.max(metric.project, metric.sector, metric.ministry, metric.max);
              return (
                <div key={metric.label}>
                  <div className="text-sm font-medium text-text mb-3">{metric.label}</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Selected</div>
                      <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                        <div className="h-full bg-navy rounded transition-all duration-500" style={{ width: `${(metric.project / maxValue) * 100}%` }} />
                      </div>
                      <div className="w-10 sm:w-16 text-right text-xs sm:text-sm font-medium text-text">{metric.project}</div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Sector Avg</div>
                      <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                        <div className="h-full bg-navy-light rounded transition-all duration-500" style={{ width: `${(metric.sector / maxValue) * 100}%` }} />
                      </div>
                      <div className="w-10 sm:w-16 text-right text-xs sm:text-sm text-muted">{metric.sector}</div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-16 sm:w-28 text-[11px] sm:text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">Ministry Avg</div>
                      <div className="flex-1 h-5 sm:h-6 bg-gray-100 rounded overflow-hidden">
                        <div className="h-full bg-muted/30 rounded transition-all duration-500" style={{ width: `${(metric.ministry / maxValue) * 100}%` }} />
                      </div>
                      <div className="w-10 sm:w-16 text-right text-xs sm:text-sm text-muted">{metric.ministry}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinistryBenchmarks;
