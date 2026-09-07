import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RiskBadge from '../../components/common/RiskBadge';
import RiskGauge from '../../components/common/RiskGauge';
import RiskCard from '../../components/common/RiskCard';
import RiskDriver from '../../components/common/RiskDriver';
import Timeline from '../../components/common/Timeline';
import ProjectAssistantFloating from '../../components/common/ProjectAssistantFloating';
import { useProjects } from '../../context/ProjectsContext';
import { formatCurrency, getRiskColor } from '../../utils/helpers';
import { ArrowLeft, AlertTriangle, CheckCircle, Bot, Pencil, X, Save, RotateCcw } from 'lucide-react';

const ProjectHealth = () => {
  const { projectId } = useParams();
  const { getProjectById, updateProject, resetProjects } = useProjects();
  const project = getProjectById(projectId);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  const startEdit = () => {
    setForm({
      physicalProgress: project.physicalProgress,
      expenditure: project.expenditure,
      revisedCost: project.revisedCost,
      originalCost: project.originalCost,
      status: project.status,
      originalCompletionDate: project.originalCompletionDate,
      revisedCompletionDate: project.revisedCompletionDate
    });
    setEditing(true);
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const clamp = (value) => Math.min(100, Math.max(0, Number(value)));

  const handleSave = () => {
    updateProject(projectId, {
      ...form,
      physicalProgress: clamp(form.physicalProgress),
      expenditure: Number(form.expenditure),
      revisedCost: Number(form.revisedCost),
      originalCost: Number(form.originalCost)
    });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all project data back to the original demo dataset?')) {
      resetProjects();
      setEditing(false);
    }
  };

  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-text mb-2">Project Not Found</h2>
        <p className="text-muted mb-4">The requested project could not be found.</p>
        <Link to="/ministry/projects" className="text-navy font-medium hover:underline">
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
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <Link to="/ministry/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-navy transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <button
          onClick={startEdit}
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors text-sm font-medium"
        >
          <Pencil className="w-4 h-4" />
          Update Progress
        </button>
      </div>

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
          </div>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
        <RiskCard
          title="Cost Overrun Risk"
          value={project.costRisk}
          severity={getLevel(project.costRisk * 1.5)}
        />
        <RiskCard
          title="Time Delay Risk"
          value={project.timeRisk}
          severity={getLevel(project.timeRisk * 1.5)}
        />
        <RiskCard
          title="Implementation Risk"
          value={project.implementationRisk}
          severity={getLevel(project.implementationRisk * 2)}
        />
      </div>

      {/* Financial & Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">FINANCIAL SUMMARY</h3>
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
                {formatCurrency(costEscalation)} ({costEscalationPercent}%)
              </span>
            </div>
          </div>
        </div>

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
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Original Completion</span>
              <span className="font-medium text-text">{project.originalCompletionDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Revised Completion</span>
              <span className="font-medium text-risk-high">{project.revisedCompletionDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Drivers */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6 mb-5 sm:mb-6">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">RISK INDICATORS</h3>
        <div className="space-y-4">
          {project.riskDrivers.map((driver, index) => (
            <RiskDriver key={index} driver={driver} />
          ))}
        </div>
      </div>

      {/* Timeline & Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        <Timeline project={project} />

        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">WARNINGS</h3>
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
                      {warning.severity.toUpperCase()}
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
              <span className="text-sm text-risk-low">No active warnings</span>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Review */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">RECOMMENDED REVIEW</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-bg rounded-lg">
            <div className="w-2 h-2 rounded-full bg-navy mt-2 flex-shrink-0"></div>
            <div>
              <div className="text-sm font-medium text-text">Review execution schedule</div>
              <div className="text-xs text-muted">Validate timeline with project team</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-bg rounded-lg">
            <div className="w-2 h-2 rounded-full bg-navy mt-2 flex-shrink-0"></div>
            <div>
              <div className="text-sm font-medium text-text">Validate milestone progress</div>
              <div className="text-xs text-muted">Cross-check with physical verification</div>
            </div>
          </div>
        </div>
        <Link
          to="/ministry/assistant"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors text-sm font-medium"
        >
          <Bot className="w-4 h-4" />
          Open Project Assistant
        </Link>
      </div>

      {/* Saved toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-risk-low rounded-xl shadow-lg text-sm font-medium">
          <CheckCircle className="w-5 h-5" />
          Project updated successfully
        </div>
      )}

      <ProjectAssistantFloating project={project} />

      {/* Edit Modal */}
      {editing && form && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-semibold text-text">Update Project Progress</h3>
                <p className="text-xs text-muted mt-0.5">{project.name}</p>
              </div>
              <button
                onClick={() => setEditing(false)}
                className="p-2 hover:bg-bg rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wide mb-2 flex items-center justify-between">
                  <span>Physical Progress</span>
                  <span className="text-sm font-semibold text-text">{form.physicalProgress}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.physicalProgress}
                  onChange={(e) => handleChange('physicalProgress', e.target.value)}
                  className="w-full accent-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-2">Expenditure (₹ Cr)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.expenditure}
                    onChange={(e) => handleChange('expenditure', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-2">Revised Cost (₹ Cr)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.revisedCost}
                    onChange={(e) => handleChange('revisedCost', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-2">Original Cost (₹ Cr)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.originalCost}
                    onChange={(e) => handleChange('originalCost', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-2">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
                  >
                    <option>On Track</option>
                    <option>Delayed</option>
                    <option>Critical</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-2">Original Completion</label>
                  <input
                    type="date"
                    value={form.originalCompletionDate}
                    onChange={(e) => handleChange('originalCompletionDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-2">Revised Completion</label>
                  <input
                    type="date"
                    value={form.revisedCompletionDate}
                    onChange={(e) => handleChange('revisedCompletionDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-risk-high transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo Data
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2.5 text-sm font-medium text-muted hover:bg-bg rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors text-sm font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHealth;
