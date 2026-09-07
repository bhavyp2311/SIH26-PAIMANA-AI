import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const ProjectAssistantFloating = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const messageEndRef = useRef(null);

  const quickMessages = [
    { key: 'risk', label: 'Explain current risk level' },
    { key: 'progress', label: 'Latest progress summary' },
    { key: 'attention', label: 'What needs my attention?' },
    { key: 'actions', label: 'Suggest recovery actions' },
    { key: 'finance', label: 'Financial snapshot' }
  ];

  const buildResponse = (key) => {
    const escalation = project.revisedCost - project.originalCost;
    const escalationPct = ((escalation / project.originalCost) * 100).toFixed(1);
    const criticalWarnings = project.warnings.filter(w => w.severity === 'critical' || w.severity === 'high');

    const responses = {
      risk: `${project.name} is currently classified as ${project.riskLevel.toUpperCase()} RISK with a score of ${project.riskScore}/100.\n\nKey drivers:\n${project.riskDrivers.slice(0, 3).map(d => `- ${d.title} (${d.contribution}%): ${d.description}`).join('\n')}\n\nCost risk is ${project.costRisk}% and time risk is ${project.timeRisk}%.`,
      progress: `Progress summary for ${project.name}:\n\n- Physical progress: ${project.physicalProgress}%\n- Status: ${project.status}\n- Original completion: ${project.originalCompletionDate}\n- Revised completion: ${project.revisedCompletionDate}\n\n${project.status === 'On Track' ? 'Project is currently on track.' : 'Project is behind schedule and requires active monitoring.'}`,
      attention: criticalWarnings.length > 0
        ? `You have ${project.warnings.length} active warning(s) for ${project.name}.\n\n${criticalWarnings.slice(0, 3).map(w => `- [${w.severity.toUpperCase()}] ${w.message} (${w.date})`).join('\n')}\n\nReview these before the next monitoring cycle.`
        : `No critical warnings detected for ${project.name}. Current status is ${project.status} with ${project.physicalProgress}% physical progress.`,
      actions: `Recommended recovery actions for ${project.name}:\n\n1. Review the execution schedule with the project team\n2. Validate milestone progress against physical verification\n3. Compare expenditure vs physical progress to detect inefficiencies\n4. Escalate critical issues in the next monitoring review`,
      finance: `Financial snapshot for ${project.name}:\n\n- Original cost: ${formatCurrency(project.originalCost)}\n- Revised cost: ${formatCurrency(project.revisedCost)}\n- Expenditure: ${formatCurrency(project.expenditure)}\n- Cost escalation: ${formatCurrency(escalation)} (${escalationPct}%)`
    };

    return responses[key] || responses.risk;
  };

  const sendMessage = (content) => {
    const text = content && content.trim();
    if (!text) return;

    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setInputValue('');
    setTyping(true);

    const quick = quickMessages.find(q => q.label === text);
    const reply = quick ? buildResponse(quick.key) : buildResponse('actions');

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'assistant', content: reply }]);
      setTyping(false);
    }, 650);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className={`fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          open ? 'bg-risk-high rotate-90' : 'bg-navy hover:bg-navy-dark'
        }`}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-30 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[calc(100vh-8rem)] bg-white border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-navy text-white flex-shrink-0">
            <div className="p-2 bg-white/10 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{project.name}</div>
              <div className="text-[11px] text-white/60">Project Assistant</div>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] px-2 py-1 bg-white/10 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-full text-xs text-muted mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-navy" />
                  Pick a quick message below to auto-send
                </div>
                <p className="text-sm text-muted">
                  Ask anything about this project's risk, progress, or finances.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm whitespace-pre-line rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-navy text-white rounded-br-md'
                      : 'bg-white border border-border text-text rounded-bl-md'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-white border border-border rounded-2xl rounded-bl-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Quick messages */}
          <div className="px-3 pt-3 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {quickMessages.map((q) => (
                <button
                  key={q.key}
                  onClick={() => sendMessage(q.label)}
                  className="text-xs px-3 py-1.5 bg-navy/5 border border-navy/15 text-navy rounded-full hover:bg-navy hover:text-white transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 flex-shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              placeholder="Type a message..."
              className="flex-1 px-3.5 py-2.5 bg-bg border border-border rounded-xl text-sm outline-none focus:border-navy"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              className="p-2.5 bg-navy text-white rounded-xl hover:bg-navy-dark transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectAssistantFloating;