import PageHeader from '../../components/common/PageHeader';
import RiskMatrix from '../../components/common/RiskMatrix';
import { getRiskMatrixData } from '../../data/riskData';

const RiskIntelligence = () => {
  const matrixData = getRiskMatrixData();

  return (
    <div>
      <PageHeader
        title="Risk Intelligence"
        subtitle="Predictive risk analysis and portfolio assessment"
      />

      <RiskMatrix data={matrixData} basePath="/mospi/projects" />

      <div className="mt-6 p-4 bg-bg border border-border rounded-xl">
        <p className="text-xs text-muted text-center">
          Prototype Risk Score Visualization | Illustrative Prototype Trend | Demo Output
        </p>
      </div>
    </div>
  );
};

export default RiskIntelligence;
