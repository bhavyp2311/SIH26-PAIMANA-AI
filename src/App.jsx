import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppShell from './layouts/AppShell';

// Landing
import Landing from './pages/landing/Landing';

// MoSPI Pages
import MoSPIOverview from './pages/mospi/Overview';
import MoSPIProjects from './pages/mospi/Projects';
import MoSPIProjectDetail from './pages/mospi/ProjectDetail';
import MoSPIRiskIntelligence from './pages/mospi/RiskIntelligence';
import MoSPIEarlyWarnings from './pages/mospi/EarlyWarnings';
import MoSPIAnalytics from './pages/mospi/Analytics';
import MoSPIBenchmarks from './pages/mospi/Benchmarks';
import MoSPIAssistant from './pages/mospi/Assistant';

// Ministry Pages
import MinistryProjects from './pages/ministry/Projects';
import MinistryProjectHealth from './pages/ministry/ProjectHealth';
import MinistryWarnings from './pages/ministry/Warnings';
import MinistryBenchmarks from './pages/ministry/Benchmarks';
import MinistryAssistant from './pages/ministry/Assistant';

// Public Pages
import PublicDashboard from './pages/public/PublicDashboard';
import PublicProjects from './pages/public/PublicProjects';
import PublicProjectDetail from './pages/public/PublicProjectDetail';
import PublicAnalytics from './pages/public/PublicAnalytics';

// 404
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8 text-center">
    <Shield className="w-16 h-16 text-navy mb-6" />
    <h1 className="text-[48px] font-bold text-text mb-2">404</h1>
    <p className="text-lg text-muted mb-2">Page Not Found</p>
    <p className="text-sm text-muted mb-8 max-w-md">
      The requested intelligence workspace could not be found.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Return to Dashboard
    </Link>
  </div>
);

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />

          {/* MoSPI Routes */}
          <Route path="/mospi" element={<AppShell><Navigate to="/mospi/overview" replace /></AppShell>} />
          <Route path="/mospi/overview" element={<AppShell><MoSPIOverview /></AppShell>} />
          <Route path="/mospi/projects" element={<AppShell><MoSPIProjects /></AppShell>} />
          <Route path="/mospi/projects/:projectId" element={<AppShell><MoSPIProjectDetail /></AppShell>} />
          <Route path="/mospi/risk-intelligence" element={<AppShell><MoSPIRiskIntelligence /></AppShell>} />
          <Route path="/mospi/early-warnings" element={<AppShell><MoSPIEarlyWarnings /></AppShell>} />
          <Route path="/mospi/analytics" element={<AppShell><MoSPIAnalytics /></AppShell>} />
          <Route path="/mospi/benchmarks" element={<AppShell><MoSPIBenchmarks /></AppShell>} />
          <Route path="/mospi/assistant" element={<AppShell><MoSPIAssistant /></AppShell>} />

          {/* Ministry Routes */}
          <Route path="/ministry" element={<AppShell><Navigate to="/ministry/projects" replace /></AppShell>} />
          <Route path="/ministry/projects" element={<AppShell><MinistryProjects /></AppShell>} />
          <Route path="/ministry/projects/:projectId" element={<AppShell><MinistryProjectHealth /></AppShell>} />
          <Route path="/ministry/warnings" element={<AppShell><MinistryWarnings /></AppShell>} />
          <Route path="/ministry/benchmarks" element={<AppShell><MinistryBenchmarks /></AppShell>} />
          <Route path="/ministry/assistant" element={<AppShell><MinistryAssistant /></AppShell>} />

          {/* Public Routes */}
          <Route path="/public" element={<AppShell><Navigate to="/public/dashboard" replace /></AppShell>} />
          <Route path="/public/dashboard" element={<AppShell><PublicDashboard /></AppShell>} />
          <Route path="/public/projects" element={<AppShell><PublicProjects /></AppShell>} />
          <Route path="/public/projects/:projectId" element={<AppShell><PublicProjectDetail /></AppShell>} />
          <Route path="/public/analytics" element={<AppShell><PublicAnalytics /></AppShell>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
