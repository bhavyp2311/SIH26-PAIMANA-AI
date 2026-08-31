import { Inbox } from 'lucide-react';

const EmptyState = ({ icon: Icon = Inbox, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="p-4 bg-bg rounded-full mb-4">
        <Icon className="w-8 h-8 text-muted" />
      </div>
      <h3 className="text-lg font-medium text-text mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md mb-6">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;
