import PageHeader from '../../components/common/PageHeader';
import AssistantPanel from '../../components/common/AssistantPanel';

const Assistant = () => {
  return (
    <div>
      <PageHeader
        title="Project Intelligence Assistant"
        subtitle="Ask questions about project risk, performance and monitoring indicators"
      />

      <AssistantPanel />

      <div className="mt-4 p-4 bg-bg border border-border rounded-xl">
        <p className="text-xs text-muted text-center">
          Prototype AI Assistant | Mock Responses | Demo Output
        </p>
      </div>
    </div>
  );
};

export default Assistant;
