import { projects } from './projects';

export const portfolioMetrics = {
  totalProjects: projects.length,
  totalInvestment: projects.reduce((sum, p) => sum + p.revisedCost, 0),
  totalExpenditure: projects.reduce((sum, p) => sum + p.expenditure, 0),
  averageProgress: Math.round(projects.reduce((sum, p) => sum + p.physicalProgress, 0) / projects.length),
  highRiskProjects: projects.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical').length,
  costRiskProjects: projects.filter(p => p.costRisk > 30).length,
  delayRiskProjects: projects.filter(p => p.timeRisk > 30).length,
  ongoingProjects: projects.filter(p => p.status === 'Delayed' || p.status === 'On Track').length
};

export const sectorWiseProgress = [
  { sector: 'Railways', progress: Math.round(projects.filter(p => p.sector === 'Railways').reduce((sum, p) => sum + p.physicalProgress, 0) / projects.filter(p => p.sector === 'Railways').length) },
  { sector: 'Roads', progress: Math.round(projects.filter(p => p.sector === 'Roads').reduce((sum, p) => sum + p.physicalProgress, 0) / projects.filter(p => p.sector === 'Roads').length) },
  { sector: 'Urban Transport', progress: Math.round(projects.filter(p => p.sector === 'Urban Transport').reduce((sum, p) => sum + p.physicalProgress, 0) / projects.filter(p => p.sector === 'Urban Transport').length) },
  { sector: 'Ports', progress: Math.round(projects.filter(p => p.sector === 'Ports').reduce((sum, p) => sum + p.physicalProgress, 0) / projects.filter(p => p.sector === 'Ports').length) },
  { sector: 'Power', progress: Math.round(projects.filter(p => p.sector === 'Power').reduce((sum, p) => sum + p.physicalProgress, 0) / projects.filter(p => p.sector === 'Power').length) }
];

export const costEscalationBySector = [
  { sector: 'Railways', original: projects.filter(p => p.sector === 'Railways').reduce((sum, p) => sum + p.originalCost, 0), revised: projects.filter(p => p.sector === 'Railways').reduce((sum, p) => sum + p.revisedCost, 0) },
  { sector: 'Roads', original: projects.filter(p => p.sector === 'Roads').reduce((sum, p) => sum + p.originalCost, 0), revised: projects.filter(p => p.sector === 'Roads').reduce((sum, p) => sum + p.revisedCost, 0) },
  { sector: 'Urban Transport', original: projects.filter(p => p.sector === 'Urban Transport').reduce((sum, p) => sum + p.originalCost, 0), revised: projects.filter(p => p.sector === 'Urban Transport').reduce((sum, p) => sum + p.revisedCost, 0) },
  { sector: 'Ports', original: projects.filter(p => p.sector === 'Ports').reduce((sum, p) => sum + p.originalCost, 0), revised: projects.filter(p => p.sector === 'Ports').reduce((sum, p) => sum + p.revisedCost, 0) },
  { sector: 'Power', original: projects.filter(p => p.sector === 'Power').reduce((sum, p) => sum + p.originalCost, 0), revised: projects.filter(p => p.sector === 'Power').reduce((sum, p) => sum + p.revisedCost, 0) }
];

export const scheduleStatusData = [
  { status: 'On Track', count: projects.filter(p => p.status === 'On Track').length },
  { status: 'Delayed', count: projects.filter(p => p.status === 'Delayed').length },
  { status: 'Critical', count: projects.filter(p => p.status === 'Critical').length }
];

export const riskDistributionData = [
  { name: 'Low', value: projects.filter(p => p.riskLevel === 'low').length, color: '#2E8B57' },
  { name: 'Medium', value: projects.filter(p => p.riskLevel === 'medium').length, color: '#C58A16' },
  { name: 'High', value: projects.filter(p => p.riskLevel === 'high').length, color: '#D95C4F' },
  { name: 'Critical', value: projects.filter(p => p.riskLevel === 'critical').length, color: '#B42318' }
];

export const monthlyProgressTrend = [
  { month: 'Mar 2026', progress: 42, target: 55 },
  { month: 'Apr 2026', progress: 45, target: 58 },
  { month: 'May 2026', progress: 48, target: 61 },
  { month: 'Jun 2026', progress: 50, target: 64 },
  { month: 'Jul 2026', progress: 52, target: 67 },
  { month: 'Aug 2026', progress: 54, target: 70 }
];

export const expenditureTrend = [
  { month: 'Mar 2026', expenditure: 85000, budget: 120000 },
  { month: 'Apr 2026', expenditure: 92000, budget: 125000 },
  { month: 'May 2026', expenditure: 98000, budget: 130000 },
  { month: 'Jun 2026', expenditure: 105000, budget: 135000 },
  { month: 'Jul 2026', expenditure: 112000, budget: 140000 },
  { month: 'Aug 2026', expenditure: 118000, budget: 145000 }
];
