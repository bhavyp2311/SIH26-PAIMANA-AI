import { projects } from './projects';

export const riskDistribution = {
  low: projects.filter(p => p.riskLevel === 'low').length,
  medium: projects.filter(p => p.riskLevel === 'medium').length,
  high: projects.filter(p => p.riskLevel === 'high').length,
  critical: projects.filter(p => p.riskLevel === 'critical').length
};

export const sectorRiskData = [
  { sector: 'Railways', avgRisk: 36, projectCount: 4 },
  { sector: 'Roads', avgRisk: 19, projectCount: 3 },
  { sector: 'Urban Transport', avgRisk: 40, projectCount: 5 },
  { sector: 'Ports', avgRisk: 21, projectCount: 2 },
  { sector: 'Power', avgRisk: 32, projectCount: 1 }
];

export const riskTrendData = [
  { month: 'Mar 2026', low: 6, medium: 5, high: 4, critical: 1 },
  { month: 'Apr 2026', low: 5, medium: 6, high: 4, critical: 1 },
  { month: 'May 2026', low: 5, medium: 5, high: 5, critical: 1 },
  { month: 'Jun 2026', low: 4, medium: 6, high: 5, critical: 1 },
  { month: 'Jul 2026', low: 4, medium: 5, high: 6, critical: 1 },
  { month: 'Aug 2026', low: 5, medium: 5, high: 5, critical: 1 }
];

export const costEscalationData = projects.map(p => ({
  id: p.id,
  name: p.name.substring(0, 30) + (p.name.length > 30 ? '...' : ''),
  originalCost: p.originalCost,
  revisedCost: p.revisedCost,
  escalation: p.revisedCost - p.originalCost,
  escalationPercent: ((p.revisedCost - p.originalCost) / p.originalCost * 100).toFixed(1)
}));

export const physicalProgressData = projects.map(p => ({
  id: p.id,
  name: p.name.substring(0, 30) + (p.name.length > 30 ? '...' : ''),
  progress: p.physicalProgress,
  expected: Math.min(100, Math.round((Date.now() - new Date(p.startDate).getTime()) / (new Date(p.revisedCompletionDate).getTime() - new Date(p.startDate).getTime()) * 100))
}));

export const scheduleSlippageData = projects.map(p => ({
  id: p.id,
  name: p.name.substring(0, 30) + (p.name.length > 30 ? '...' : ''),
  originalDate: p.originalCompletionDate,
  revisedDate: p.revisedCompletionDate,
  monthsSlipped: Math.round((new Date(p.revisedCompletionDate) - new Date(p.originalCompletionDate)) / (1000 * 60 * 60 * 24 * 30))
}));

export const getRiskMatrixData = () => {
  return projects.map(p => ({
    id: p.id,
    name: p.name,
    timeRisk: p.timeRisk,
    costRisk: p.costRisk,
    riskLevel: p.riskLevel,
    riskScore: p.riskScore
  }));
};

export const getWarningSummary = () => {
  const allWarnings = projects.flatMap(p => p.warnings.map(w => ({ ...w, projectId: p.id, projectName: p.name })));
  return {
    total: allWarnings.length,
    critical: allWarnings.filter(w => w.severity === 'critical').length,
    high: allWarnings.filter(w => w.severity === 'high').length,
    medium: allWarnings.filter(w => w.severity === 'medium').length,
    low: allWarnings.filter(w => w.severity === 'low').length,
    warnings: allWarnings
  };
};
