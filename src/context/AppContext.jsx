import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('mospi');
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
