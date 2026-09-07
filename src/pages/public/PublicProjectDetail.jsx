import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { formatCurrency, formatDate, calculateMonthsDelayed } from '../../utils/helpers';
import { ArrowLeft } from 'lucide-react';

const PublicProjectDetail = () => {
  const { projectId } = useParams();
  const { getProjectById } = useProjects();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-text mb-2">Project Not Found</h2>
        <p className="text-muted mb-4">The requested project could not be found.</p>
        <Link to="/public/projects" className="text-navy font-medium hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const monthsDelayed = calculateMonthsDelayed(project.originalCompletionDate, project.revisedCompletionDate);

  return (
    <div>
      <Link to="/public/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-navy mb-4 sm:mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-mono text-muted mb-2">{project.id}</div>
            <h1 className="text-[22px] sm:text-[28px] font-semibold text-text mb-2 leading-tight">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>{project.sector}</span>
              <span className="hidden sm:inline">•</span>
              <span>{project.ministry}</span>
              <span className="hidden sm:inline">•</span>
              <span>{project.agency}</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg self-start ${
            project.status === 'On Track' ? 'bg-green-50 text-risk-low' : 'bg-amber-50 text-risk-medium'
          }`}>
            <span className="text-sm font-medium">{project.status}</span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        {/* Financial */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">FINANCIAL DETAILS</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Original Cost</span>
              <span className="text-sm font-medium text-text">{formatCurrency(project.originalCost)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Revised Cost</span>
              <span className="text-sm font-medium text-text">{formatCurrency(project.revisedCost)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Expenditure</span>
              <span className="text-sm font-medium text-text">{formatCurrency(project.expenditure)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm text-muted">Cost Escalation</span>
              <span className="text-sm font-medium text-risk-high">
                {formatCurrency(project.revisedCost - project.originalCost)} ({((project.revisedCost - project.originalCost) / project.originalCost * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">PROGRESS</h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Physical Progress</span>
              <span className="text-lg font-semibold text-text">{project.physicalProgress}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-navy rounded-full transition-all duration-500"
                style={{ width: `${project.physicalProgress}%` }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Status</span>
              <span className="font-medium text-text">{project.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">PROJECT TIMELINE</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          <div className="space-y-8">
            <div className="relative flex items-start gap-6">
              <div className="relative z-10 w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
              </div>
              <div className="flex-1 pb-2">
                <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">SANCTION</div>
                <div className="text-sm font-medium text-text">{formatDate(project.startDate)}</div>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="relative z-10 w-8 h-8 rounded-full bg-gray-200 text-muted flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
              </div>
              <div className="flex-1 pb-2">
                <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">ORIGINAL COMMISSIONING</div>
                <div className="text-sm font-medium text-text">{formatDate(project.originalCompletionDate)}</div>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                monthsDelayed > 0 ? 'bg-risk-high text-white' : 'bg-navy text-white'
              }`}>
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
              </div>
              <div className="flex-1 pb-2">
                <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">REVISED COMMISSIONING</div>
                <div className="text-sm font-medium text-text">{formatDate(project.revisedCompletionDate)}</div>
                {monthsDelayed > 0 && (
                  <div className="text-xs text-risk-high mt-1">+{monthsDelayed} months delayed</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-bg border border-border rounded-xl">
        <p className="text-xs text-muted text-center">
          Public Transparency View | Prototype Data | Smart India Hackathon 2026
        </p>
      </div>
    </div>
  );
};

export default PublicProjectDetail;
