import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ProjectTable from '../../components/common/ProjectTable';
import { projects, getSectors } from '../../data/projects';

const Projects = () => {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const sectors = getSectors();

  const filteredProjects = projects.filter(p => {
    if (sectorFilter !== 'all' && p.sector !== sectorFilter) return false;
    if (riskFilter !== 'all' && p.riskLevel !== riskFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Project Explorer"
        subtitle="Browse and analyze all monitored infrastructure projects"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted whitespace-nowrap">Sector:</label>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
          >
            <option value="all">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted whitespace-nowrap">Risk Level:</label>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
          >
            <option value="all">All Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="sm:ml-auto text-sm text-muted">
          {filteredProjects.length} projects
        </div>
      </div>

      <ProjectTable projects={filteredProjects} basePath="/mospi/projects" />
    </div>
  );
};

export default Projects;
