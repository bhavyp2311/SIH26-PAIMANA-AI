const PageHeader = ({ title, subtitle, rightContent }) => {
  return (
    <div className="flex items-start justify-between mb-7">
      <div>
        <h1 className="text-[26px] font-semibold text-text leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-[13px] text-muted mt-1">{subtitle}</p>
        )}
      </div>
      {rightContent && (
        <div className="flex items-center gap-3 flex-shrink-0 ml-6">
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
