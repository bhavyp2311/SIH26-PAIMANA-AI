import { formatDate, calculateMonthsDelayed } from '../../utils/helpers';

const Timeline = ({ project }) => {
  const monthsDelayed = calculateMonthsDelayed(
    project.originalCompletionDate,
    project.revisedCompletionDate
  );

  const milestones = [
    { label: 'SANCTION', date: project.startDate, type: 'start' },
    { label: 'ORIGINAL COMMISSIONING', date: project.originalCompletionDate, type: 'original' },
    { label: 'REVISED COMMISSIONING', date: project.revisedCompletionDate, type: 'revised' }
  ];

  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-6">PROJECT TIMELINE</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
        
        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Dot */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.type === 'revised' && monthsDelayed > 0
                  ? 'bg-risk-high text-white'
                  : milestone.type === 'original'
                  ? 'bg-gray-200 text-muted'
                  : 'bg-navy text-white'
              }`}>
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                  {milestone.label}
                </div>
                <div className="text-sm font-medium text-text">
                  {formatDate(milestone.date)}
                </div>
                {milestone.type === 'revised' && monthsDelayed > 0 && (
                  <div className="text-xs text-risk-high mt-1">
                    +{monthsDelayed} months delayed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
