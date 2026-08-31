import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import KpiCard from '../../components/common/KpiCard';
import ChartCard from '../../components/common/ChartCard';
import RiskBadge from '../../components/common/RiskBadge';
import { projects } from '../../data/projects';
import { riskDistribution, sectorRiskData, riskTrendData } from '../../data/riskData';
import { getAllWarnings } from '../../data/warnings';
import {
  FolderKanban,
  ShieldAlert,
  IndianRupee,
  Clock3,
  Activity,
  AlertTriangle,
  Bell,
  Eye,
  ArrowRight
} from 'lucide-react';

const Overview = () => {
  const navigate = useNavigate();
  const highRiskProjects = projects.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical');
  const costRiskProjects = projects.filter(p => p.costRisk > 30);
  const delayRiskProjects = projects.filter(p => p.timeRisk > 30);
  const warnings = getAllWarnings().slice(0, 4);

  const riskPieData = [
    { name: 'Low', value: riskDistribution.low, color: '#2E8B57' },
    { name: 'Medium', value: riskDistribution.medium, color: '#C58A16' },
    { name: 'High', value: riskDistribution.high, color: '#D95C4F' },
    { name: 'Critical', value: riskDistribution.critical, color: '#B42318' }
  ];

  const getRiskScoreColor = (score) => {
    if (score <= 29) return '#2E8B57';
    if (score <= 59) return '#C58A16';
    if (score <= 79) return '#D95C4F';
    return '#B42318';
  };

  const getRiskLevel = (score) => {
    if (score <= 29) return 'LOW';
    if (score <= 59) return 'MEDIUM';
    if (score <= 79) return 'HIGH';
    return 'CRITICAL';
  };

  const sectorBarColors = sectorRiskData.map(s =>
    s.avgRisk > 40 ? '#D95C4F' : s.avgRisk > 25 ? '#C58A16' : '#245A91'
  );

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Infrastructure Project Intelligence"
        subtitle="AI-powered predictive monitoring for India's infrastructure portfolio"
        rightContent={
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-[13px] text-muted">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="hidden sm:inline">Prototype Intelligence Layer</span>
              <span className="sm:hidden">Prototype</span>
            </div>
            <div className="text-[11px] text-muted mt-1">Last Updated: 30 Aug 2026</div>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <KpiCard
          label="Total Projects"
          value={projects.length}
          subtitle="Monitored portfolio"
          icon={FolderKanban}
          color="navy"
        />
        <KpiCard
          label="High-Risk Projects"
          value={highRiskProjects.length}
          subtitle="Requiring immediate attention"
          icon={ShieldAlert}
          color="red"
        />
        <KpiCard
          label="Cost-Risk Projects"
          value={costRiskProjects.length}
          subtitle="Cost escalation > 30%"
          icon={IndianRupee}
          color="amber"
        />
        <KpiCard
          label="Delay-Risk Projects"
          value={delayRiskProjects.length}
          subtitle="Schedule deviation > 30%"
          icon={Clock3}
          color="amber"
        />
        <KpiCard
          label="Ongoing"
          value={projects.length}
          subtitle="Currently in execution"
          icon={Activity}
          color="navy"
        />
      </div>

      {/* Micro context */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-6 sm:mb-8 text-[12px] text-muted">
        <span>{highRiskProjects.length} projects require immediate attention</span>
        <span className="hidden sm:inline text-border">|</span>
        <span>{costRiskProjects.length} projects show elevated cost risk</span>
        <span className="hidden sm:inline text-border">|</span>
        <span>{delayRiskProjects.length} projects show schedule deviation</span>
        <span className="hidden sm:inline text-border">|</span>
        <span>{warnings.length} active warnings</span>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6 sm:mb-8">
        {/* Risk Distribution Donut */}
        <ChartCard title="Project Risk Overview" subtitle="Distribution by risk level">
          <div className="flex items-center justify-between h-full gap-4">
            <div className="w-0 flex-1 min-h-0">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={riskPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {riskPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} projects`, name]}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #D8E0E8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-shrink-0 space-y-3.5">
              {riskPieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[13px] text-muted w-14">{item.name}</span>
                  <span className="text-[14px] font-semibold text-text w-5 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Risk Trend */}
        <ChartCard title="Portfolio Risk Trend" subtitle="Monthly risk distribution">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#667085" />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #D8E0E8' }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="low" stroke="#2E8B57" strokeWidth={2} dot={false} name="Low" />
              <Line type="monotone" dataKey="medium" stroke="#C58A16" strokeWidth={2} dot={false} name="Medium" />
              <Line type="monotone" dataKey="high" stroke="#D95C4F" strokeWidth={2} dot={false} name="High" />
              <Line type="monotone" dataKey="critical" stroke="#B42318" strokeWidth={2} dot={false} name="Critical" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sector Risk */}
        <ChartCard title="Sector Risk Overview" subtitle="Average risk by sector">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorRiskData} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#667085" domain={[0, 50]} />
              <YAxis dataKey="sector" type="category" tick={{ fontSize: 11 }} stroke="#667085" width={110} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #D8E0E8' }}
                formatter={(value) => [`${value} avg risk`]}
              />
              <Bar dataKey="avgRisk" radius={[0, 4, 4, 0]}>
                {sectorRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={sectorBarColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Projects Requiring Attention */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-[17px] font-semibold text-text">Projects Requiring Attention</h2>
            <p className="text-[12px] text-muted mt-0.5">Sorted by risk score — highest first</p>
          </div>
          <span className="text-[11px] text-muted px-2.5 py-1 bg-bg rounded-md self-start">Prototype Dataset</span>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg/60">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Sector</th>
                  <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Risk Score</th>
                  <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Cost Risk</th>
                  <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Time Risk</th>
                  <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
                  <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {highRiskProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-border last:border-0 hover:bg-bg/40 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="text-[11px] text-muted font-mono mb-0.5">{project.id}</div>
                      <div className="text-[13px] font-medium text-text leading-snug">{project.name}</div>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-muted">{project.sector}</td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-[15px] font-bold" style={{ color: getRiskScoreColor(project.riskScore) }}>
                          {project.riskScore}
                        </span>
                        <span className="text-[10px] font-semibold mt-0.5" style={{ color: getRiskScoreColor(project.riskScore) }}>
                          {getRiskLevel(project.riskScore)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-[13px] font-medium ${project.costRisk > 40 ? 'text-risk-high' : project.costRisk > 25 ? 'text-risk-medium' : 'text-muted'}`}>
                        {project.costRisk}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-[13px] font-medium ${project.timeRisk > 40 ? 'text-risk-high' : project.timeRisk > 25 ? 'text-risk-medium' : 'text-muted'}`}>
                        {project.timeRisk}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <RiskBadge level={project.riskLevel} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => navigate(`/mospi/projects/${project.id}`)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-navy hover:text-navy-dark transition-colors px-2.5 py-1.5 rounded-md hover:bg-navy/5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {highRiskProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/mospi/projects/${project.id}`)}
              className="bg-white border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
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
                  <div className={`text-[14px] font-medium ${project.costRisk > 40 ? 'text-risk-high' : 'text-muted'}`}>
                    {project.costRisk}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted uppercase">Time Risk</div>
                  <div className={`text-[14px] font-medium ${project.timeRisk > 40 ? 'text-risk-high' : 'text-muted'}`}>
                    {project.timeRisk}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-[12px] text-muted">{project.sector}</span>
                <span className="text-[12px] font-medium text-navy">View Project →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Early Warning Center */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-[17px] font-semibold text-text">Early Warning Center</h2>
            <p className="text-[12px] text-muted mt-0.5">Emerging signals requiring monitoring attention</p>
          </div>
          <button
            onClick={() => navigate('/mospi/early-warnings')}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-navy hover:text-navy-dark transition-colors self-start"
          >
            View All Warnings
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {warnings.map((warning, index) => {
            const severityConfig = {
              critical: { bg: 'bg-risk-critical/5', border: 'border-risk-critical/20', badge: 'bg-risk-critical/10 text-risk-critical', icon: AlertTriangle },
              high: { bg: 'bg-risk-high/5', border: 'border-risk-high/20', badge: 'bg-risk-high/10 text-risk-high', icon: AlertTriangle },
              medium: { bg: 'bg-risk-medium/5', border: 'border-risk-medium/20', badge: 'bg-risk-medium/10 text-risk-medium', icon: Bell },
              low: { bg: 'bg-risk-low/5', border: 'border-risk-low/20', badge: 'bg-risk-low/10 text-risk-low', icon: Bell }
            };
            const config = severityConfig[warning.severity] || severityConfig.medium;
            const WarningIcon = config.icon;

            return (
              <div
                key={index}
                onClick={() => navigate(`/mospi/projects/${warning.projectId}`)}
                className={`${config.bg} border ${config.border} rounded-xl p-4 sm:p-5 cursor-pointer hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2 rounded-lg ${config.badge} flex-shrink-0 mt-0.5`}>
                    <WarningIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${config.badge}`}>
                        {warning.severity} Priority
                      </span>
                    </div>
                    <h4 className="text-[13px] font-semibold text-text mb-1 leading-snug">{warning.message}</h4>
                    <p className="text-[12px] text-muted mb-2.5">{warning.projectName}</p>
                    <div className="flex items-center gap-4">
                      {warning.riskScore && (
                        <span className="text-[11px] text-muted">
                          Risk Score: <span className="font-semibold" style={{ color: getRiskScoreColor(warning.riskScore) }}>{warning.riskScore}</span>
                        </span>
                      )}
                      <span className="text-[11px] text-navy font-medium ml-auto">View Project →</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;
