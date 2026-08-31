import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../context/AppContext';

const AppShell = ({ children }) => {
  const { isMobile, isTablet } = useApp();

  const mainPadding = isMobile
    ? 'px-4 py-5'
    : isTablet
    ? 'px-6 py-6'
    : 'px-10 py-8';

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header />
        <main className={`flex-1 min-h-0 overflow-y-auto ${mainPadding}`}>
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
