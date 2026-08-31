const KpiCard = ({ label, value, subtitle, icon: Icon, trend, trendValue, color = 'navy' }) => {
  const accentMap = {
    navy: '#123B68',
    green: '#2E8B57',
    amber: '#C58A16',
    red: '#D95C4F',
    critical: '#B42318'
  };

  const iconBgMap = {
    navy: 'bg-navy/8 text-navy',
    green: 'bg-risk-low/10 text-risk-low',
    amber: 'bg-risk-medium/10 text-risk-medium',
    red: 'bg-risk-high/10 text-risk-high',
    critical: 'bg-risk-critical/10 text-risk-critical'
  };

  const accent = accentMap[color] || '#123B68';

  return (
    <div
      className="min-w-0 bg-white border border-border rounded-xl px-5 py-4 hover:shadow-sm transition-shadow"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">{label}</span>
        {Icon && (
          <div className={`p-1.5 rounded-md ${iconBgMap[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mb-0.5">
        <span className="text-[28px] font-bold text-text leading-none tracking-tight">{value}</span>
      </div>
      {subtitle && (
        <p className="text-[11px] text-muted mt-1.5 leading-relaxed">{subtitle}</p>
      )}
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === 'up' ? 'text-risk-high' : 'text-risk-low'}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
