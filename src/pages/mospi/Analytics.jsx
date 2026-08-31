import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import ChartCard from '../../components/common/ChartCard';
import { projects, getSectors, getMinistries } from '../../data/projects';
import { sectorWiseProgress, riskDistributionData } from '../../data/analyticsData';

const Analytics = () => {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [ministryFilter, setMinistryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const sectors = getSectors();
  const ministries = getMinistries();

  const filteredProjects = projects.filter(p => {
    if (sectorFilter !== 'all' && p.sector !== sectorFilter) return false;
    if (ministryFilter !== 'all' && p.ministry !== ministryFilter) return false;
    if (riskFilter !== 'all' && p.riskLevel !== riskFilter) return false;
    return true;
  });

  const costData = filteredProjects.map(p => ({
    name: p.name.substring(0, 15) + '...',
    original: p.originalCost,
    revised: p.revisedCost
  }));

  const progressData = filteredProjects.map(p => ({
    name: p.name.substring(0, 15) + '...',
    progress: p.physicalProgress
  }));

  const scheduleData = filteredProjects.map(p => ({
    name: p.name.substring(0, 15) + '...',
    months: Math.round((new Date(p.revisedCompletionDate) - new Date(p.originalCompletionDate)) / (1000 * 60 * 60 * 24 * 30))
  }));

  return (
    <div>
      <PageHeader
        title="Portfolio Analytics"
        subtitle="Comprehensive analysis of infrastructure project performance"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
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
          <label className="text-sm text-muted whitespace-nowrap">Ministry:</label>
          <select
            value={ministryFilter}
            onChange={(e) => setMinistryFilter(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:border-navy"
          >
            <option value="all">All Ministries</option>
            {ministries.map(ministry => (
              <option key={ministry} value={ministry}>{ministry}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted whitespace-nowrap">Risk:</label>
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
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
        {/* Cost Escalation */}
        <ChartCard title="Cost Escalation" subtitle="Original vs Revised Cost (₹ Cr)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#667085" angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip />
              <Legend />
              <Bar dataKey="original" name="Original" fill="#245A91" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revised" name="Revised" fill="#D95C4F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Physical Progress */}
        <ChartCard title="Physical Progress" subtitle="Project completion percentage">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#667085" angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip />
              <Bar dataKey="progress" fill="#2E8B57" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Schedule Slippage */}
        <ChartCard title="Schedule Slippage" subtitle="Months delayed from original schedule">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scheduleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#667085" angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} stroke="#667085" />
              <Tooltip />
              <Bar dataKey="months" fill="#C58A16" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sector Risk */}
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

      {/* Risk Distribution */}
      <ChartCard title="Risk Distribution" subtitle="Portfolio risk breakdown">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 h-full">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
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
          <div className="flex flex-row sm:flex-col flex-wrap justify-center gap-4 sm:space-y-4 sm:gap-0">
            {riskDistributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-[13px] text-muted">{item.name}</span>
                <span className="text-[15px] font-semibold text-text">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default Analytics;
