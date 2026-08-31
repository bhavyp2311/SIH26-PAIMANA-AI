import { useParams, Link } from 'react-router-dom';
import RiskBadge from '../../components/common/RiskBadge';
import RiskGauge from '../../components/common/RiskGauge';
import RiskCard from '../../components/common/RiskCard';
import RiskDriver from '../../components/common/RiskDriver';
import Timeline from '../../components/common/Timeline';
import { getProjectById } from '../../data/projects';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Bot } from 'lucide-react';

const getRiskColor = (level) => {
  const colors = {
    low: '#2E8B57',
    medium: '#C58A16',
    high: '#D95C4F',
    critical: '#B42318'
  };
  return colors[level] || '#667085';
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-text mb-2">Project Not Found</h2>
        <p className="text-muted mb-4">The requested project could not be found.</p>
        <Link to="/mospi/projects" className="text-navy font-medium hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const getLevel = (score) => {
    if (score <= 25) return 'low';
    if (score <= 50) return 'medium';
    if (score <= 75) return 'high';
    return 'critical';
  };

  const costEscalation = project.revisedCost - project.originalCost;
  const costEscalationPercent = ((costEscalation / project.originalCost) * 100).toFixed(1);

  return (
    <div>
      {/* Back Link */}
      <Link to="/mospi/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-navy mb-4 sm:mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono text-muted">{project.id}</span>
              <RiskBadge level={project.riskLevel} size="md" />
            </div>
            <h1 className="text-[22px] sm:text-[28px] font-semibold text-text mb-2 leading-tight">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>{project.sector}</span>
              <span className="hidden sm:inline">•</span>
              <span>{project.ministry}</span>
              <span className="hidden sm:inline">•</span>
              <span>{project.agency}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <div className="text-xs text-muted mb-1">Risk Score</div>
              <RiskGauge score={project.riskScore} size="lg" />
            </div>
            <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: `${getRiskColor(project.riskLevel)}15` }}>
              <span className="text-sm font-semibold" style={{ color: getRiskColor(project.riskLevel) }}>
                {project.riskLevel.toUpperCase()} RISK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
        <RiskCard
          title="Cost Overrun Risk"
          value={project.costRisk}
          severity={getLevel(project.costRisk * 1.5)}
          description="Illustrative Risk Driver"
        />
        <RiskCard
          title="Time Delay Risk"
          value={project.timeRisk}
          severity={getLevel(project.timeRisk * 1.5)}
          description="Illustrative Risk Driver"
        />
        <RiskCard
          title="Implementation Risk"
          value={project.implementationRisk}
          severity={getLevel(project.implementationRisk * 2)}
          description="Illustrative Risk Driver"
        />
      </div>

      {/* Financial Snapshot */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6 mb-5 sm:mb-6">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">FINANCIAL SNAPSHOT</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <div className="text-xs text-muted mb-1">Original Cost</div>
            <div className="text-base sm:text-lg font-semibold text-text">{formatCurrency(project.originalCost)}</div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Revised Cost</div>
            <div className="text-base sm:text-lg font-semibold text-text">{formatCurrency(project.revisedCost)}</div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Expenditure</div>
            <div className="text-base sm:text-lg font-semibold text-text">{formatCurrency(project.expenditure)}</div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Cost Escalation</div>
            <div className="text-base sm:text-lg font-semibold text-risk-high">
              {formatCurrency(costEscalation)} ({costEscalationPercent}%)
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Physical Progress</span>
            <span className="font-medium text-text">{project.physicalProgress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-navy rounded-full transition-all duration-500"
              style={{ width: `${project.physicalProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Risk Drivers */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6 mb-5 sm:mb-6">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">
          WHY IS THIS PROJECT RISKY?
        </h3>
        <p className="text-xs text-muted mb-4">Illustrative Risk Driver</p>
        <div className="space-y-4">
          {project.riskDrivers.map((driver, index) => (
            <RiskDriver key={index} driver={driver} />
          ))}
        </div>
      </div>

      {/* Timeline & Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        <Timeline project={project} />

        {/* Early Warning */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">EARLY WARNING</h3>
          {project.warnings.length > 0 ? (
            <div className="space-y-3">
              {project.warnings.map((warning, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: `${getRiskColor(warning.severity)}08`,
                    borderColor: `${getRiskColor(warning.severity)}30`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" style={{ color: getRiskColor(warning.severity) }} />
                    <span className="text-xs font-semibold" style={{ color: getRiskColor(warning.severity) }}>
                      {warning.severity.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-sm text-text">{warning.message}</p>
                  <p className="text-xs text-muted mt-2">{warning.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-risk-low" />
              <span className="text-sm text-risk-low">No active warnings for this project</span>
            </div>
          )}
        </div>
      </div>

      {/* Decision Support */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">RECOMMENDED REVIEW</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-bg rounded-lg">
            <FileText className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-text">Review execution schedule</div>
              <div className="text-xs text-muted">Validate timeline assumptions and identify acceleration opportunities</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-bg rounded-lg">
            <Clock className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-text">Validate milestone progress</div>
              <div className="text-xs text-muted">Cross-reference reported progress with physical verification</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-bg rounded-lg">
            <AlertTriangle className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-text">Compare expenditure with physical progress</div>
              <div className="text-xs text-muted">Identify potential cost inefficiencies or budget misallocation</div>
            </div>
          </div>
        </div>
        <Link
          to="/mospi/assistant"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors text-sm font-medium"
        >
          <Bot className="w-4 h-4" />
          Open Project Assistant
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
