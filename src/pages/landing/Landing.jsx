import { useNavigate } from 'react-router-dom';
import { Shield, Landmark, Users, ArrowRight, Activity, BarChart3, Bell } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'mospi',
      icon: Shield,
      title: 'MoSPI / IPMD Officer',
      description: 'Portfolio monitoring, risk intelligence & early warnings',
      path: '/mospi/overview',
      color: 'bg-navy'
    },
    {
      id: 'ministry',
      icon: Landmark,
      title: 'Ministry / Implementing Agency',
      description: 'Project health, benchmarks & review actions',
      path: '/ministry/projects',
      color: 'bg-navy-light'
    },
    {
      id: 'public',
      icon: Users,
      title: 'Public User',
      description: 'Read-only infrastructure transparency',
      path: '/public/dashboard',
      color: 'bg-muted'
    }
  ];

  const steps = [
    { icon: Activity, label: 'Monitor' },
    { icon: BarChart3, label: 'Predict' },
    { icon: Bell, label: 'Warn' },
    { icon: Shield, label: 'Prioritise' }
  ];

  return (
    <div className="h-full bg-bg flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="bg-navy text-white shrink-0">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <div className="font-semibold tracking-wide">PAIMANA AI</div>
              <div className="text-xs text-white/60">Infrastructure Intelligence Platform</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl w-full mx-auto text-center">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-[42px] font-bold text-text mb-4 leading-tight">
              PAIMANA AI
            </h1>
            <p className="text-lg text-muted mb-2">
              Predictive Infrastructure Risk & Early Warning System
            </p>
            <p className="text-sm text-muted">
              Transforming infrastructure monitoring from descriptive to predictive + prescriptive
            </p>
          </div>

          {/* Flow */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-white border border-border rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <span className="text-xs font-medium text-text">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted -mt-6" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => navigate(role.path)}
                  className="bg-white border border-border rounded-xl p-6 text-left hover:shadow-lg hover:border-navy transition-all group"
                >
                  <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">{role.title}</h3>
                  <p className="text-sm text-muted mb-4">{role.description}</p>
                  <div className="flex items-center text-sm font-medium text-navy group-hover:gap-2 transition-all">
                    <span>Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="text-xs text-muted">
            <p className="mb-1">Prototype Demonstration</p>
            <p>Smart India Hackathon 2026 | SIH26103 | MoSPI</p>
            <p className="mt-2 text-muted/70">
              Prediction outputs are illustrative prototype values
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
