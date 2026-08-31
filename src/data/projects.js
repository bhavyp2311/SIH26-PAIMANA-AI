export const projects = [
  {
    id: 'PRJ-001',
    name: 'Udhampur-Srinagar-Baramulla Rail Link',
    sector: 'Railways',
    ministry: 'Ministry of Railways',
    agency: 'Northern Railway',
    originalCost: 27158,
    revisedCost: 33947,
    expenditure: 20368,
    physicalProgress: 62,
    startDate: '2018-04-01',
    originalCompletionDate: '2024-12-31',
    revisedCompletionDate: '2026-12-31',
    status: 'Delayed',
    costRisk: 20,
    timeRisk: 40,
    implementationRisk: 5,
    riskScore: 24,
    riskLevel: 'medium',
    riskDrivers: [
      { type: 'progress_gap', severity: 'medium', title: 'Progress Gap', description: 'Physical progress (62%) lags behind schedule (85% expected)', contribution: 35 },
      { type: 'schedule_slippage', severity: 'high', title: 'Schedule Slippage', description: 'Original completion date exceeded by 18 months', contribution: 45 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Cost escalation of ₹67.89 Cr (25% over original)', contribution: 20 }
    ],
    warnings: [
      { type: 'schedule', severity: 'medium', message: 'Schedule deviation detected - project 23% behind expected progress', date: '2026-08-28' },
      { type: 'milestone', severity: 'low', message: 'Q3 milestone review due', date: '2026-09-15' }
    ]
  },
  {
    id: 'PRJ-002',
    name: 'Mumbai-Ahmedabad High Speed Rail',
    sector: 'Railways',
    ministry: 'Ministry of Railways',
    agency: 'National High Speed Rail Corporation',
    originalCost: 110000,
    revisedCost: 135000,
    expenditure: 42000,
    physicalProgress: 35,
    startDate: '2017-09-14',
    originalCompletionDate: '2023-12-31',
    revisedCompletionDate: '2028-12-31',
    status: 'Delayed',
    costRisk: 55,
    timeRisk: 70,
    implementationRisk: 45,
    riskScore: 68,
    riskLevel: 'high',
    riskDrivers: [
      { type: 'progress_gap', severity: 'high', title: 'Progress Gap', description: 'Physical progress (35%) significantly behind schedule (95% expected)', contribution: 40 },
      { type: 'schedule_slippage', severity: 'critical', title: 'Schedule Slippage', description: 'Original completion date exceeded by 36+ months', contribution: 35 },
      { type: 'cost_trend', severity: 'high', title: 'Cost Trend', description: 'Cost escalation of ₹25,000 Cr (22.7% over original)', contribution: 25 }
    ],
    warnings: [
      { type: 'critical', severity: 'critical', message: 'Critical schedule delay - project at high risk', date: '2026-08-25' },
      { type: 'cost', severity: 'high', message: 'Significant cost overrun detected', date: '2026-08-20' }
    ]
  },
  {
    id: 'PRJ-003',
    name: 'Rishikesh-Karnaprayag Rail Link',
    sector: 'Railways',
    ministry: 'Ministry of Railways',
    agency: 'Northern Railway',
    originalCost: 18000,
    revisedCost: 21500,
    expenditure: 8200,
    physicalProgress: 45,
    startDate: '2019-03-01',
    originalCompletionDate: '2025-06-30',
    revisedCompletionDate: '2027-06-30',
    status: 'Delayed',
    costRisk: 30,
    timeRisk: 45,
    implementationRisk: 15,
    riskScore: 38,
    riskLevel: 'medium',
    riskDrivers: [
      { type: 'progress_gap', severity: 'medium', title: 'Progress Gap', description: 'Physical progress (45%) behind schedule (75% expected)', contribution: 40 },
      { type: 'schedule_slippage', severity: 'high', title: 'Schedule Slippage', description: 'Project delayed by 18 months', contribution: 35 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Moderate cost escalation of ₹3,500 Cr', contribution: 25 }
    ],
    warnings: [
      { type: 'schedule', severity: 'medium', message: 'Schedule deviation - mountain terrain challenges', date: '2026-08-27' }
    ]
  },
  {
    id: 'PRJ-004',
    name: 'Gorakhpur Terminal Station Redevelopment',
    sector: 'Railways',
    ministry: 'Ministry of Railways',
    agency: 'Northern Railway',
    originalCost: 490,
    revisedCost: 580,
    expenditure: 320,
    physicalProgress: 72,
    startDate: '2020-01-15',
    originalCompletionDate: '2024-03-31',
    revisedCompletionDate: '2025-09-30',
    status: 'Delayed',
    costRisk: 15,
    timeRisk: 25,
    implementationRisk: 10,
    riskScore: 18,
    riskLevel: 'low',
    riskDrivers: [
      { type: 'progress_gap', severity: 'low', title: 'Progress Gap', description: 'Physical progress (72%) slightly behind schedule (85% expected)', contribution: 45 },
      { type: 'schedule_slippage', severity: 'medium', title: 'Schedule Slippage', description: 'Project delayed by 12 months', contribution: 35 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Minor cost escalation of ₹90 Cr', contribution: 20 }
    ],
    warnings: []
  },
  {
    id: 'PRJ-005',
    name: 'Delhi-Mumbai Expressway',
    sector: 'Roads',
    ministry: 'Ministry of Road Transport & Highways',
    agency: 'National Highways Authority of India',
    originalCost: 98000,
    revisedCost: 105000,
    expenditure: 78000,
    physicalProgress: 88,
    startDate: '2019-11-15',
    originalCompletionDate: '2024-03-31',
    revisedCompletionDate: '2025-06-30',
    status: 'On Track',
    costRisk: 10,
    timeRisk: 15,
    implementationRisk: 5,
    riskScore: 12,
    riskLevel: 'low',
    riskDrivers: [
      { type: 'progress_gap', severity: 'low', title: 'Progress Gap', description: 'Physical progress (88%) close to schedule', contribution: 40 },
      { type: 'schedule_slippage', severity: 'low', title: 'Schedule Slippage', description: 'Minor delay due to land acquisition', contribution: 30 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Controlled cost escalation', contribution: 30 }
    ],
    warnings: []
  },
  {
    id: 'PRJ-006',
    name: 'Bengaluru-Chennai Expressway',
    sector: 'Roads',
    ministry: 'Ministry of Road Transport & Highways',
    agency: 'National Highways Authority of India',
    originalCost: 58000,
    revisedCost: 62000,
    expenditure: 35000,
    physicalProgress: 55,
    startDate: '2021-06-01',
    originalCompletionDate: '2025-12-31',
    revisedCompletionDate: '2026-12-31',
    status: 'Delayed',
    costRisk: 25,
    timeRisk: 35,
    implementationRisk: 20,
    riskScore: 32,
    riskLevel: 'medium',
    riskDrivers: [
      { type: 'progress_gap', severity: 'medium', title: 'Progress Gap', description: 'Physical progress (55%) behind schedule (70% expected)', contribution: 35 },
      { type: 'schedule_slippage', severity: 'medium', title: 'Schedule Slippage', description: 'Project delayed by 6 months', contribution: 40 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Moderate cost increase', contribution: 25 }
    ],
    warnings: [
      { type: 'schedule', severity: 'medium', message: 'Schedule slippage detected', date: '2026-08-26' }
    ]
  },
  {
    id: 'PRJ-007',
    name: 'Bundelkhand Expressway Extension',
    sector: 'Roads',
    ministry: 'Ministry of Road Transport & Highways',
    agency: 'Uttar Pradesh Public Works Department',
    originalCost: 15000,
    revisedCost: 16200,
    expenditure: 12800,
    physicalProgress: 85,
    startDate: '2020-08-01',
    originalCompletionDate: '2024-06-30',
    revisedCompletionDate: '2025-03-31',
    status: 'On Track',
    costRisk: 8,
    timeRisk: 12,
    implementationRisk: 5,
    riskScore: 9,
    riskLevel: 'low',
    riskDrivers: [
      { type: 'progress_gap', severity: 'low', title: 'Progress Gap', description: 'Progress on track', contribution: 40 },
      { type: 'schedule_slippage', severity: 'low', title: 'Schedule Slippage', description: 'Minor delays manageable', contribution: 35 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Cost within acceptable range', contribution: 25 }
    ],
    warnings: []
  },
  {
    id: 'PRJ-008',
    name: 'Delhi-Meerut Regional Rapid Transit System',
    sector: 'Urban Transport',
    ministry: 'Ministry of Housing & Urban Affairs',
    agency: 'National Capital Region Transport Corporation',
    originalCost: 30268,
    revisedCost: 35000,
    expenditure: 18500,
    physicalProgress: 52,
    startDate: '2019-03-08',
    originalCompletionDate: '2024-06-30',
    revisedCompletionDate: '2027-03-31',
    status: 'Delayed',
    costRisk: 40,
    timeRisk: 60,
    implementationRisk: 35,
    riskScore: 55,
    riskLevel: 'high',
    riskDrivers: [
      { type: 'progress_gap', severity: 'high', title: 'Progress Gap', description: 'Physical progress (52%) significantly behind schedule (80% expected)', contribution: 35 },
      { type: 'schedule_slippage', severity: 'critical', title: 'Schedule Slippage', description: 'Project delayed by 33 months', contribution: 40 },
      { type: 'cost_trend', severity: 'high', title: 'Cost Trend', description: 'Cost escalation of ₹4,732 Cr (15.6%)', contribution: 25 }
    ],
    warnings: [
      { type: 'critical', severity: 'critical', message: 'Critical delay - requires immediate intervention', date: '2026-08-24' },
      { type: 'cost', severity: 'high', message: 'Cost overrun exceeds threshold', date: '2026-08-22' }
    ]
  },
  {
    id: 'PRJ-009',
    name: 'Chennai Metro Phase II',
    sector: 'Urban Transport',
    ministry: 'Ministry of Housing & Urban Affairs',
    agency: 'Chennai Metro Rail Corporation',
    originalCost: 63000,
    revisedCost: 68000,
    expenditure: 25000,
    physicalProgress: 38,
    startDate: '2021-12-01',
    originalCompletionDate: '2026-12-31',
    revisedCompletionDate: '2028-06-30',
    status: 'Delayed',
    costRisk: 35,
    timeRisk: 50,
    implementationRisk: 30,
    riskScore: 48,
    riskLevel: 'high',
    riskDrivers: [
      { type: 'progress_gap', severity: 'high', title: 'Progress Gap', description: 'Physical progress (38%) behind schedule (55% expected)', contribution: 40 },
      { type: 'schedule_slippage', severity: 'high', title: 'Schedule Slippage', description: 'Project delayed by 18 months', contribution: 35 },
      { type: 'cost_trend', severity: 'medium', title: 'Cost Trend', description: 'Cost escalation of ₹5,000 Cr', contribution: 25 }
    ],
    warnings: [
      { type: 'schedule', severity: 'high', message: 'Significant schedule deviation detected', date: '2026-08-27' }
    ]
  },
  {
    id: 'PRJ-010',
    name: 'Sagarmala Coastal Economic Zone',
    sector: 'Ports',
    ministry: 'Ministry of Ports, Shipping & Waterways',
    agency: 'Sagarmala Development Company',
    originalCost: 8500,
    revisedCost: 9200,
    expenditure: 4800,
    physicalProgress: 52,
    startDate: '2020-06-01',
    originalCompletionDate: '2025-03-31',
    revisedCompletionDate: '2026-06-30',
    status: 'Delayed',
    costRisk: 20,
    timeRisk: 30,
    implementationRisk: 15,
    riskScore: 28,
    riskLevel: 'medium',
    riskDrivers: [
      { type: 'progress_gap', severity: 'medium', title: 'Progress Gap', description: 'Physical progress (52%) behind schedule', contribution: 35 },
      { type: 'schedule_slippage', severity: 'medium', title: 'Schedule Slippage', description: 'Project delayed by 15 months', contribution: 40 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Moderate cost increase', contribution: 25 }
    ],
    warnings: [
      { type: 'schedule', severity: 'medium', message: 'Schedule review required', date: '2026-08-25' }
    ]
  },
  {
    id: 'PRJ-011',
    name: 'JNPT Port Modernization',
    sector: 'Ports',
    ministry: 'Ministry of Ports, Shipping & Waterways',
    agency: 'Jawaharlal Nehru Port Trust',
    originalCost: 12000,
    revisedCost: 13500,
    expenditure: 9800,
    physicalProgress: 78,
    startDate: '2019-01-15',
    originalCompletionDate: '2024-06-30',
    revisedCompletionDate: '2025-12-31',
    status: 'On Track',
    costRisk: 12,
    timeRisk: 18,
    implementationRisk: 8,
    riskScore: 14,
    riskLevel: 'low',
    riskDrivers: [
      { type: 'progress_gap', severity: 'low', title: 'Progress Gap', description: 'Progress on track', contribution: 40 },
      { type: 'schedule_slippage', severity: 'low', title: 'Schedule Slippage', description: 'Minor manageable delays', contribution: 35 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Cost escalation within limits', contribution: 25 }
    ],
    warnings: []
  },
  {
    id: 'PRJ-012',
    name: 'Parli Thermal Power Plant Renovation',
    sector: 'Power',
    ministry: 'Ministry of Power',
    agency: 'Maharashtra State Electricity Board',
    originalCost: 4200,
    revisedCost: 5100,
    expenditure: 3200,
    physicalProgress: 68,
    startDate: '2020-04-01',
    originalCompletionDate: '2024-12-31',
    revisedCompletionDate: '2025-12-31',
    status: 'Delayed',
    costRisk: 35,
    timeRisk: 28,
    implementationRisk: 22,
    riskScore: 32,
    riskLevel: 'medium',
    riskDrivers: [
      { type: 'progress_gap', severity: 'medium', title: 'Progress Gap', description: 'Physical progress (68%) behind schedule (80% expected)', contribution: 30 },
      { type: 'schedule_slippage', severity: 'medium', title: 'Schedule Slippage', description: 'Project delayed by 12 months', contribution: 40 },
      { type: 'cost_trend', severity: 'medium', title: 'Cost Trend', description: 'Cost escalation of ₹900 Cr (21.4%)', contribution: 30 }
    ],
    warnings: [
      { type: 'cost', severity: 'medium', message: 'Cost overrun approaching threshold', date: '2026-08-28' }
    ]
  },
  {
    id: 'PRJ-013',
    name: 'Lucknow-Agra Expressway Extension',
    sector: 'Roads',
    ministry: 'Ministry of Road Transport & Highways',
    agency: 'Uttar Pradesh Expressways Industrial Development Authority',
    originalCost: 22000,
    revisedCost: 24500,
    expenditure: 18000,
    physicalProgress: 78,
    startDate: '2019-09-01',
    originalCompletionDate: '2024-03-31',
    revisedCompletionDate: '2025-06-30',
    status: 'On Track',
    costRisk: 12,
    timeRisk: 15,
    implementationRisk: 8,
    riskScore: 14,
    riskLevel: 'low',
    riskDrivers: [
      { type: 'progress_gap', severity: 'low', title: 'Progress Gap', description: 'Progress on track', contribution: 40 },
      { type: 'schedule_slippage', severity: 'low', title: 'Schedule Slippage', description: 'Minor delays', contribution: 35 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Cost escalation acceptable', contribution: 25 }
    ],
    warnings: []
  },
  {
    id: 'PRJ-014',
    name: 'Patna Metro Phase I',
    sector: 'Urban Transport',
    ministry: 'Ministry of Housing & Urban Affairs',
    agency: 'Patna Metro Rail Corporation',
    originalCost: 18000,
    revisedCost: 21000,
    expenditure: 7500,
    physicalProgress: 35,
    startDate: '2021-02-01',
    originalCompletionDate: '2025-12-31',
    revisedCompletionDate: '2027-12-31',
    status: 'Delayed',
    costRisk: 45,
    timeRisk: 55,
    implementationRisk: 40,
    riskScore: 52,
    riskLevel: 'high',
    riskDrivers: [
      { type: 'progress_gap', severity: 'high', title: 'Progress Gap', description: 'Physical progress (35%) well behind schedule (60% expected)', contribution: 35 },
      { type: 'schedule_slippage', severity: 'critical', title: 'Schedule Slippage', description: 'Project delayed by 24 months', contribution: 40 },
      { type: 'cost_trend', severity: 'high', title: 'Cost Trend', description: 'Cost escalation of ₹3,000 Cr (16.7%)', contribution: 25 }
    ],
    warnings: [
      { type: 'critical', severity: 'critical', message: 'Critical delay - project at high risk', date: '2026-08-26' },
      { type: 'cost', severity: 'high', message: 'Significant cost overrun', date: '2026-08-24' }
    ]
  },
  {
    id: 'PRJ-015',
    name: 'Kochi Water Metro Expansion',
    sector: 'Urban Transport',
    ministry: 'Ministry of Housing & Urban Affairs',
    agency: 'Kochi Metro Rail Corporation',
    originalCost: 750,
    revisedCost: 820,
    expenditure: 580,
    physicalProgress: 72,
    startDate: '2021-08-01',
    originalCompletionDate: '2025-03-31',
    revisedCompletionDate: '2025-09-30',
    status: 'On Track',
    costRisk: 8,
    timeRisk: 10,
    implementationRisk: 5,
    riskScore: 8,
    riskLevel: 'low',
    riskDrivers: [
      { type: 'progress_gap', severity: 'low', title: 'Progress Gap', description: 'Progress on track', contribution: 40 },
      { type: 'schedule_slippage', severity: 'low', title: 'Schedule Slippage', description: 'Minor delays', contribution: 35 },
      { type: 'cost_trend', severity: 'low', title: 'Cost Trend', description: 'Cost within budget', contribution: 25 }
    ],
    warnings: []
  },
  {
    id: 'PRJ-016',
    name: 'Amritsar-Jalandhar Corridor Development',
    sector: 'Urban Transport',
    ministry: 'Ministry of Housing & Urban Affairs',
    agency: 'Punjab Municipal Infrastructure Development Corporation',
    originalCost: 5200,
    revisedCost: 6100,
    expenditure: 2800,
    physicalProgress: 48,
    startDate: '2020-11-01',
    originalCompletionDate: '2025-06-30',
    revisedCompletionDate: '2026-12-31',
    status: 'Delayed',
    costRisk: 32,
    timeRisk: 38,
    implementationRisk: 28,
    riskScore: 38,
    riskLevel: 'medium',
    riskDrivers: [
      { type: 'progress_gap', severity: 'medium', title: 'Progress Gap', description: 'Physical progress (48%) behind schedule (65% expected)', contribution: 35 },
      { type: 'schedule_slippage', severity: 'medium', title: 'Schedule Slippage', description: 'Project delayed by 18 months', contribution: 40 },
      { type: 'cost_trend', severity: 'medium', title: 'Cost Trend', description: 'Cost escalation of ₹900 Cr (17.3%)', contribution: 25 }
    ],
    warnings: [
      { type: 'schedule', severity: 'medium', message: 'Schedule deviation detected', date: '2026-08-27' }
    ]
  }
];

export const getProjectsByRiskLevel = (level) => {
  return projects.filter(p => p.riskLevel === level);
};

export const getProjectById = (id) => {
  return projects.find(p => p.id === id);
};

export const getProjectsBySector = (sector) => {
  return projects.filter(p => p.sector === sector);
};

export const getProjectsByMinistry = (ministry) => {
  return projects.filter(p => p.ministry === ministry);
};

export const getSectors = () => {
  return [...new Set(projects.map(p => p.sector))];
};

export const getMinistries = () => {
  return [...new Set(projects.map(p => p.ministry))];
};
