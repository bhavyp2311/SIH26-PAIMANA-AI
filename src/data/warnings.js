import { projects } from './projects';

export const getAllWarnings = () => {
  const warnings = [];
  projects.forEach(project => {
    project.warnings.forEach(warning => {
      warnings.push({
        ...warning,
        projectId: project.id,
        projectName: project.name,
        sector: project.sector,
        ministry: project.ministry,
        riskScore: project.riskScore
      });
    });
  });
  return warnings.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
};

export const getWarningsBySeverity = (severity) => {
  return getAllWarnings().filter(w => w.severity === severity);
};

export const getWarningsByProject = (projectId) => {
  return getAllWarnings().filter(w => w.projectId === projectId);
};

export const getWarningSummary = () => {
  const allWarnings = getAllWarnings();
  return {
    total: allWarnings.length,
    critical: allWarnings.filter(w => w.severity === 'critical').length,
    high: allWarnings.filter(w => w.severity === 'high').length,
    medium: allWarnings.filter(w => w.severity === 'medium').length,
    low: allWarnings.filter(w => w.severity === 'low').length
  };
};
