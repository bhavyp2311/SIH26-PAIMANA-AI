import PageHeader from '../../components/common/PageHeader';
import AssistantPanel from '../../components/common/AssistantPanel';

const MinistryAssistant = () => {
  return (
    <div>
      <PageHeader
        title="Project Assistant"
        subtitle="Ask questions about your project risk and performance"
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

export default MinistryAssistant;
