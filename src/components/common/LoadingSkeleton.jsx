const LoadingSkeleton = ({ type = 'card' }) => {
  const shimmer = 'animate-pulse bg-gray-200 rounded';

  if (type === 'card') {
    return (
      <div className="bg-white border border-border rounded-xl p-5">
        <div className={`${shimmer} h-4 w-24 mb-4`}></div>
        <div className={`${shimmer} h-8 w-32 mb-2`}></div>
        <div className={`${shimmer} h-3 w-48`}></div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-bg/50">
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${shimmer} h-4 flex-1`}></div>
            ))}
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b border-border last:border-0">
            <div className="flex gap-4">
              {[...Array(6)].map((_, j) => (
                <div key={j} className={`${shimmer} h-4 flex-1`}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="bg-white border border-border rounded-xl p-5">
        <div className={`${shimmer} h-4 w-32 mb-4`}></div>
        <div className={`${shimmer} h-[300px] w-full`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`${shimmer} h-16 w-full`}></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
