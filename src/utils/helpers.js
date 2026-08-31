export const formatCurrency = (amount) => {
  if (amount >= 10000) {
    return `₹${(amount / 100).toFixed(2)} Lakh Cr`;
  }
  return `₹${amount.toLocaleString('en-IN')} Cr`;
};

export const formatNumber = (num) => {
  return num.toLocaleString('en-IN');
};

export const getRiskColor = (level) => {
  const colors = {
    low: '#2E8B57',
    medium: '#C58A16',
    high: '#D95C4F',
    critical: '#B42318'
  };
  return colors[level] || '#667085';
};

export const getRiskBgColor = (level) => {
  const colors = {
    low: '#E8F5E9',
    medium: '#FFF8E1',
    high: '#FFEBEE',
    critical: '#FFCDD2'
  };
  return colors[level] || '#F5F7FA';
};

export const getRiskLabel = (level) => {
  const labels = {
    low: 'LOW RISK',
    medium: 'MEDIUM RISK',
    high: 'HIGH RISK',
    critical: 'CRITICAL RISK'
  };
  return labels[level] || 'UNKNOWN';
};

export const getStatusColor = (status) => {
  const colors = {
    'On Track': '#2E8B57',
    'Delayed': '#C58A16',
    'Critical': '#B42318',
    'Completed': '#245A91'
  };
  return colors[status] || '#667085';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const calculateMonthsDelayed = (originalDate, revisedDate) => {
  const original = new Date(originalDate);
  const revised = new Date(revisedDate);
  const diffTime = Math.abs(revised - original);
  const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30));
  return diffMonths;
};

export const getSeveirtBgColor = (severity) => {
  const colors = {
    low: 'bg-green-50 text-green-700',
    medium: 'bg-amber-50 text-amber-700',
    high: 'bg-red-50 text-red-700',
    critical: 'bg-red-100 text-red-800'
  };
  return colors[severity] || 'bg-gray-50 text-gray-700';
};
