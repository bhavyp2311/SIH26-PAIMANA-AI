const ChartCard = ({ title, subtitle, children, height = '380px' }) => {
  return (
    <div className="min-w-0 bg-white border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted mt-1">{subtitle}</p>
        )}
      </div>
      <div className="min-w-0 overflow-hidden" style={{ height }}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
