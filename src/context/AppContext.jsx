import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const AppContext = createContext(null);

const getRoleFromPath = (path) => {
  if (path.startsWith('/ministry')) return 'ministry';
  if (path.startsWith('/public')) return 'public';
  return 'mospi';
};

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState(() => getRoleFromPath(window.location.pathname));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const checkBreakpoints = useCallback(() => {
    const w = window.innerWidth;
    setIsMobile(w < 768);
    setIsTablet(w >= 768 && w < 1280);
    if (w < 768) {
      setSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    checkBreakpoints();
    window.addEventListener('resize', checkBreakpoints);
    return () => window.removeEventListener('resize', checkBreakpoints);
  }, [checkBreakpoints]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const roleFromPath = getRoleFromPath(location.pathname);
    setCurrentRole((prev) => (prev === roleFromPath ? prev : roleFromPath));
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    setMobileMenuOpen(false);
  };

  const value = {
    currentRole,
    sidebarCollapsed,
    mobileMenuOpen,
    isMobile,
    isTablet,
    toggleSidebar,
    openMobileMenu,
    closeMobileMenu,
    switchRole,
    setSidebarCollapsed
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
