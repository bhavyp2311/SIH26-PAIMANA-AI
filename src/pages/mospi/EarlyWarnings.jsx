import PageHeader from '../../components/common/PageHeader';
import KpiCard from '../../components/common/KpiCard';
import WarningCard from '../../components/common/WarningCard';
import { getAllWarnings, getWarningSummary } from '../../data/warnings';
import { AlertTriangle, Bell, Info } from 'lucide-react';

const EarlyWarnings = () => {
  const warnings = getAllWarnings();
  const summary = getWarningSummary();

  return (
    <div>
      <PageHeader
        title="Early Warning Center"
        subtitle="Monitor and respond to project risk indicators"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <KpiCard
          label="Critical"
          value={summary.critical}
          icon={AlertTriangle}
          color="critical"
        />
        <KpiCard
          label="High"
          value={summary.high}
          icon={AlertTriangle}
          color="red"
        />
        <KpiCard
          label="Medium"
          value={summary.medium}
          icon={Bell}
          color="amber"
        />
        <KpiCard
          label="Low"
          value={summary.low}
          icon={Info}
          color="green"
        />
      </div>

      {/* Warning List */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-text">Active Warnings</h2>
        <span className="text-xs text-muted">{warnings.length} total</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {warnings.map((warning, index) => (
          <WarningCard
            key={index}
            warning={warning}
            basePath="/mospi/projects"
          />
        ))}
      </div>
    </div>
  );
};

export default EarlyWarnings;
