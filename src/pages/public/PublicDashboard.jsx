import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import KpiCard from '../../components/common/KpiCard';
import ChartCard from '../../components/common/ChartCard';
import { projects } from '../../data/projects';
import { portfolioMetrics, scheduleStatusData, sectorWiseProgress } from '../../data/analyticsData';
import { FolderKanban, IndianRupee, Activity, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const PublicDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Public Infrastructure Dashboard"
        subtitle="Track the progress of major infrastructure projects in India"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <KpiCard
          label="Total Projects"
          value={portfolioMetrics.totalProjects}
          icon={FolderKanban}
          color="navy"
        />
        <KpiCard
          label="Total Investment"
          value={formatCurrency(portfolioMetrics.totalInvestment)}
          icon={IndianRupee}
          color="navy"
        />
        <KpiCard
          label="Average Progress"
          value={`${portfolioMetrics.averageProgress}%`}
          icon={Activity}
          color="navy"
        />
        <KpiCard
          label="Total Escalation"
          value={formatCurrency(portfolioMetrics.totalInvestment - projects.reduce((sum, p) => sum + p.originalCost, 0))}
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <ChartCard title="Schedule Status" subtitle="Project status distribution">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 h-full">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={scheduleStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="status"
                >
                  <Cell fill="#2E8B57" />
                  <Cell fill="#C58A16" />
                  <Cell fill="#B42318" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-row sm:flex-col flex-wrap justify-center gap-4 sm:space-y-3 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-risk-low"></div>
                <span className="text-sm text-muted">On Track</span>
                <span className="text-sm font-semibold text-text ml-2">{scheduleStatusData[0].count}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-risk-medium"></div>
                <span className="text-sm text-muted">Delayed</span>
                <span className="text-sm font-semibold text-text ml-2">{scheduleStatusData[1].count}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-risk-critical"></div>
                <span className="text-sm text-muted">Critical</span>
                <span className="text-sm font-semibold text-text ml-2">{scheduleStatusData[2].count}</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Sector-wise Progress" subtitle="Average progress by sector">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorWiseProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="sector" tick={{ fontSize: 11 }} stroke="#667085" />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip />
              <Bar dataKey="progress" fill="#245A91" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-border">
          <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide">MAJOR PROJECTS</h3>
        </div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Sector</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Progress</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Cost</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
                <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 10).map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-text">{project.name}</div>
                    <div className="text-xs text-muted font-mono">{project.id}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{project.sector}</td>
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
                  <td className="px-5 py-4 text-right text-sm text-text">{formatCurrency(project.revisedCost)}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      project.status === 'On Track' ? 'bg-green-50 text-risk-low' : 'bg-amber-50 text-risk-medium'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-sm text-muted">
                    {project.revisedCompletionDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {projects.slice(0, 10).map((project) => (
            <div key={project.id} className="p-4 hover:bg-bg/50">
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

      <div className="mt-6 p-4 bg-bg border border-border rounded-xl">
        <p className="text-xs text-muted text-center">
          Public Transparency Dashboard | Prototype Data | Smart India Hackathon 2026
        </p>
      </div>
    </div>
  );
};

export default PublicDashboard;
