import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { useProjects } from '../../context/ProjectsContext';
import { formatCurrency } from '../../utils/helpers';

const PublicProjects = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Browse major infrastructure projects across India"
      />

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Sector</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Ministry</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Progress</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Original Cost</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Revised Cost</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => navigate(`/public/projects/${project.id}`)}
                  className="border-b border-border last:border-0 hover:bg-bg/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-text">{project.name}</div>
                    <div className="text-xs text-muted font-mono">{project.id}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{project.sector}</td>
                  <td className="px-5 py-4 text-sm text-muted max-w-[200px] truncate">{project.ministry}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-navy rounded-full"
                          style={{ width: `${project.physicalProgress}%` }}
                        />
                      </div>
                      <span className="text-sm text-text">{project.physicalProgress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-text">{formatCurrency(project.originalCost)}</td>
                  <td className="px-5 py-4 text-right text-sm text-text">{formatCurrency(project.revisedCost)}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      project.status === 'On Track' ? 'bg-green-50 text-risk-low' : 'bg-amber-50 text-risk-medium'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/public/projects/${project.id}`)}
              className="p-4 hover:bg-bg/50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-text">{project.name}</div>
                  <div className="text-xs text-muted font-mono">{project.id}</div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ml-2 ${
                  project.status === 'On Track' ? 'bg-green-50 text-risk-low' : 'bg-amber-50 text-risk-medium'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-navy rounded-full" style={{ width: `${project.physicalProgress}%` }} />
                </div>
                <span className="text-xs text-muted">{project.physicalProgress}%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{project.sector}</span>
                <span className="font-medium text-text">{formatCurrency(project.revisedCost)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProjects;
