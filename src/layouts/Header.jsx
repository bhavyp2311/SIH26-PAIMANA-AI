import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  ChevronRight,
  Landmark,
  Shield,
  Users,
  Menu
} from 'lucide-react';

const Header = () => {
  const { currentRole, switchRole, isMobile, isTablet, openMobileMenu } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const crumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      const label = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      crumbs.push({ label, path: currentPath });
    });

    return crumbs;
  };

  const getRoleIcon = () => {
    switch (currentRole) {
      case 'mospi': return Shield;
      case 'ministry': return Landmark;
      case 'public': return Users;
      default: return Shield;
    }
  };

  const handleRoleChange = (role) => {
    switchRole(role);
    const routeMap = {
      mospi: '/mospi/overview',
      ministry: '/ministry/projects',
      public: '/public/dashboard'
    };
    navigate(routeMap[role]);
  };

  const breadcrumbs = getBreadcrumbs();
  const RoleIcon = getRoleIcon();

  // Mobile header
  if (isMobile) {
    return (
      <header className="h-[60px] flex-shrink-0 bg-white border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={openMobileMenu}
            className="p-2 -ml-2 hover:bg-bg rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-text" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-navy" />
            <span className="text-sm font-semibold text-text">PAIMANA AI</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-bg rounded-lg transition-colors relative" aria-label="Notifications">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-risk-high rounded-full"></span>
          </button>
        </div>
      </header>
    );
  }

  // Tablet header
  if (isTablet) {
    return (
      <header className="h-[68px] flex-shrink-0 bg-white border-b border-border flex items-center justify-between px-5">
        <nav className="flex items-center gap-1.5 min-w-0">
          {breadcrumbs.slice(-2).map((crumb, index, arr) => (
            <div key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted flex-shrink-0" />}
              {index === arr.length - 1 ? (
                <span className="text-sm font-medium text-text truncate">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="text-sm text-muted hover:text-navy transition-colors truncate">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <button className="p-2 hover:bg-bg rounded-lg transition-colors" aria-label="Search">
            <Search className="w-5 h-5 text-muted" />
          </button>
          <button className="p-2 hover:bg-bg rounded-lg transition-colors relative" aria-label="Notifications">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-risk-high rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-bg rounded-lg">
              <RoleIcon className="w-4 h-4 text-navy" />
              <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="bg-transparent text-xs font-medium text-text outline-none cursor-pointer appearance-none"
              >
                <option value="mospi">MoSPI</option>
                <option value="ministry">Ministry</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Desktop header
  return (
    <header className="h-[68px] flex-shrink-0 bg-white border-b border-border flex items-center justify-between px-8">
      <nav className="flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-sm font-medium text-text">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="text-sm text-muted hover:text-navy transition-colors">
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-bg rounded-lg transition-colors" aria-label="Search">
          <Search className="w-5 h-5 text-muted" />
        </button>

        <button className="p-2 hover:bg-bg rounded-lg transition-colors relative" aria-label="Notifications">
          <Bell className="w-5 h-5 text-muted" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-risk-high rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-border">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-bg rounded-lg">
            <RoleIcon className="w-4 h-4 text-navy" />
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-transparent text-sm font-medium text-text outline-none cursor-pointer pr-6 appearance-none"
            >
              <option value="mospi">MoSPI / IPMD Officer</option>
              <option value="ministry">Ministry / Agency</option>
              <option value="public">Public User</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
