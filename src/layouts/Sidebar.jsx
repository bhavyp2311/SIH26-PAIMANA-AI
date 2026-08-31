import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield,
  LayoutDashboard,
  FolderKanban,
  ShieldAlert,
  BellRing,
  BarChart3,
  BarChart2,
  Bot,
  Landmark,
  Activity,
  ChevronLeft,
  ChevronRight,
  Circle,
  X
} from 'lucide-react';

const Sidebar = () => {
  const { currentRole, sidebarCollapsed, toggleSidebar, isMobile, mobileMenuOpen, closeMobileMenu } = useApp();
  const location = useLocation();

  const getNavigationItems = () => {
    switch (currentRole) {
      case 'mospi':
        return [
          {
            group: 'MONITORING',
            items: [
              { label: 'Portfolio Overview', icon: LayoutDashboard, path: '/mospi/overview' },
              { label: 'Projects', icon: FolderKanban, path: '/mospi/projects' },
              { label: 'Risk Intelligence', icon: ShieldAlert, path: '/mospi/risk-intelligence' },
              { label: 'Early Warnings', icon: BellRing, path: '/mospi/early-warnings' }
            ]
          },
          {
            group: 'ANALYTICS',
            items: [
              { label: 'Analytics', icon: BarChart3, path: '/mospi/analytics' },
              { label: 'Benchmarks', icon: BarChart2, path: '/mospi/benchmarks' }
            ]
          },
          {
            group: 'INTELLIGENCE',
            items: [
              { label: 'Project Assistant', icon: Bot, path: '/mospi/assistant' }
            ]
          }
        ];
      case 'ministry':
        return [
          {
            group: 'MY PROJECTS',
            items: [
              { label: 'Projects', icon: FolderKanban, path: '/ministry/projects' },
              { label: 'Project Health', icon: Activity, path: '/ministry/projects' }
            ]
          },
          {
            group: 'MONITORING',
            items: [
              { label: 'Warnings', icon: BellRing, path: '/ministry/warnings' },
              { label: 'Benchmarks', icon: BarChart2, path: '/ministry/benchmarks' }
            ]
          },
          {
            group: 'INTELLIGENCE',
            items: [
              { label: 'Project Assistant', icon: Bot, path: '/ministry/assistant' }
            ]
          }
        ];
      case 'public':
        return [
          {
            group: 'OVERVIEW',
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/public/dashboard' },
              { label: 'Projects', icon: FolderKanban, path: '/public/projects' },
              { label: 'Analytics', icon: BarChart3, path: '/public/analytics' }
            ]
          }
        ];
      default:
        return [];
    }
  };

  const navigation = getNavigationItems();

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-white flex-shrink-0" />
          {(!sidebarCollapsed || isMobile) && (
            <div className="overflow-hidden">
              <div className="font-semibold text-sm tracking-wide">PAIMANA AI</div>
              <div className="text-[11px] text-white/60">Infrastructure Intelligence</div>
            </div>
          )}
          {isMobile && (
            <button
              onClick={closeMobileMenu}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigation.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {(!sidebarCollapsed || isMobile) && (
              <div className="px-4 mb-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                {group.group}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path ||
                               (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={`${item.path}-${groupIndex}`}
                  to={item.path}
                  onClick={() => { if (isMobile) closeMobileMenu(); }}
                  title={sidebarCollapsed && !isMobile ? item.label : undefined}
                  className={`flex items-center gap-3 px-4 py-[11px] mx-2 rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-white before:rounded-r'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } ${sidebarCollapsed && !isMobile ? 'justify-center px-2' : ''}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {(!sidebarCollapsed || isMobile) && (
                    <span className="text-sm">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Status & Collapse */}
      <div className="border-t border-white/10 p-4">
        <div className={`flex items-center gap-2 mb-4 ${(sidebarCollapsed && !isMobile) ? 'justify-center' : ''}`}>
          <Circle className="w-2 h-2 fill-green-400 text-green-400" />
          {(!sidebarCollapsed || isMobile) && (
            <span className="text-xs text-white/70">AI Engine Online</span>
          )}
        </div>
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ${
              sidebarCollapsed ? 'px-2' : ''
            }`}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-white/70" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-white/70" />
                <span className="text-xs text-white/70">Collapse</span>
              </>
            )}
          </button>
        )}
      </div>
    </>
  );

  // Mobile: drawer overlay
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-[280px] max-w-[85vw] bg-navy text-white flex flex-col z-50 transform transition-transform duration-200 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop/Tablet: inline sidebar
  return (
    <aside
      className={`h-full flex-shrink-0 bg-navy text-white flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-[72px]' : 'w-[250px]'
      }`}
    >
      {sidebarContent}
    </aside>
  );
};

export default Sidebar;
