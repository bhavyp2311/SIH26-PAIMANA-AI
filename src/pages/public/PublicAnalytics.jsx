import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import ChartCard from '../../components/common/ChartCard';
import { useProjects } from '../../context/ProjectsContext';
import { scheduleStatusData, sectorWiseProgress, riskDistributionData } from '../../data/analyticsData';

const PublicAnalytics = () => {
  const { projects } = useProjects();
  const sectorData = [
    { sector: 'Railways', projects: projects.filter(p => p.sector === 'Railways').length },
    { sector: 'Roads', projects: projects.filter(p => p.sector === 'Roads').length },
    { sector: 'Urban Transport', projects: projects.filter(p => p.sector === 'Urban Transport').length },
    { sector: 'Ports', projects: projects.filter(p => p.sector === 'Ports').length },
    { sector: 'Power', projects: projects.filter(p => p.sector === 'Power').length }
  ];

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Public overview of infrastructure project performance"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
        <ChartCard title="Sector Distribution" subtitle="Projects by sector">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="sector" tick={{ fontSize: 11 }} stroke="#667085" />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip />
              <Bar dataKey="projects" fill="#245A91" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sector Progress" subtitle="Average progress by sector">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorWiseProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="sector" tick={{ fontSize: 11 }} stroke="#667085" />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip />
              <Bar dataKey="progress" fill="#2E8B57" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Schedule Status" subtitle="Project status overview">
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
              {scheduleStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${
                    index === 0 ? 'bg-risk-low' : index === 1 ? 'bg-risk-medium' : 'bg-risk-critical'
                  }`}></div>
                  <span className="text-sm text-muted">{item.status}</span>
                  <span className="text-sm font-semibold text-text ml-2">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Risk Overview" subtitle="Projects by risk level">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 h-full">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-row sm:flex-col flex-wrap justify-center gap-4 sm:space-y-3 sm:gap-0">
              {riskDistributionData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-muted">{item.name}</span>
                  <span className="text-sm font-semibold text-text ml-2">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="p-4 bg-bg border border-border rounded-xl">
        <p className="text-xs text-muted text-center">
          Public Analytics | Prototype Data | Smart India Hackathon 2026
        </p>
      </div>
    </div>
  );
};

export default PublicAnalytics;
