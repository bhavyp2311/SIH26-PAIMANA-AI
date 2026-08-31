import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

const AssistantPanel = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const suggestedQuestions = [
    'Why is this project high risk?',
    'What are the major risk drivers?',
    'Compare this project with sector average',
    'Which projects need attention first?',
    'What should the monitoring officer review?'
  ];

  const mockResponses = {
    'Why is this project high risk?': {
      sections: [
        {
          title: 'RISK SUMMARY',
          content: 'This project has been classified as HIGH RISK based on multiple indicators including significant schedule delays, cost overruns, and implementation challenges. The overall risk score of 68/100 places it in the top quartile of monitored projects.'
        },
        {
          title: 'KEY DRIVERS',
          content: '1. Schedule Slippage (35% contribution): Project is 36+ months behind original timeline\n2. Cost Escalation (25% contribution): ₹25,000 Cr increase over original estimates\n3. Progress Gap (40% contribution): Physical progress significantly lags expected milestones'
        },
        {
          title: 'EVIDENCE',
          content: 'Based on OCMS data and PMI analysis:\n- Physical progress: 35% vs expected 95%\n- Expenditure: ₹42,000 Cr of ₹135,000 Cr revised budget\n- Last 3 monthly reports show declining trend'
        },
        {
          title: 'RECOMMENDED REVIEW',
          content: '1. Review execution schedule with project authorities\n2. Validate milestone progress against physical verification\n3. Compare expenditure patterns with sector benchmarks\n4. Schedule inter-ministerial review meeting'
        }
      ]
    },
    'What are the major risk drivers?': {
      sections: [
        {
          title: 'RISK SUMMARY',
          content: 'Analysis of 16 monitored infrastructure projects reveals 3 primary risk categories affecting portfolio performance.'
        },
        {
          title: 'KEY DRIVERS',
          content: '1. Schedule Slippage: 10 of 16 projects show delays\n2. Cost Escalation: Average 15.2% overrun across portfolio\n3. Implementation Gaps: 6 projects below 60% progress'
        },
        {
          title: 'EVIDENCE',
          content: 'Portfolio-wide analysis shows:\n- High-risk projects: 5 (31.25%)\n- Medium-risk projects: 5 (31.25%)\n- Average risk score: 32.4/100'
        },
        {
          title: 'RECOMMENDED REVIEW',
          content: 'Focus monitoring on:\n1. Projects with risk score > 50\n2. Projects with cost overrun > 20%\n3. Projects with schedule delay > 12 months'
        }
      ]
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages([...messages, userMessage]);

    const response = mockResponses[inputValue] || {
      sections: [
        {
          title: 'RISK SUMMARY',
          content: `Analysis of your query: "${inputValue}". The project intelligence system has processed this request using prototype predictive models.`
        },
        {
          title: 'KEY DRIVERS',
          content: 'Based on the available data:\n1. Schedule performance index indicates moderate risk\n2. Cost performance index shows controlled variance\n3. Implementation metrics are within acceptable thresholds'
        },
        {
          title: 'EVIDENCE',
          content: 'Data sources consulted:\n- OCMS project reports\n- PMI progress updates\n- Financial expenditure records\n- Risk assessment models'
        },
        {
          title: 'RECOMMENDED REVIEW',
          content: 'Suggested actions:\n1. Review latest project progress report\n2. Cross-reference with sector benchmarks\n3. Schedule follow-up assessment'
        }
      ]
    };

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    }, 500);

    setInputValue('');
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] sm:h-[calc(100vh-200px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-bg rounded-xl border border-border mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-4 bg-navy/10 rounded-full mb-4">
              <Bot className="w-10 h-10 text-navy" />
            </div>
            <h3 className="text-lg font-medium text-text mb-2">Project Intelligence Assistant</h3>
            <p className="text-sm text-muted max-w-md mb-8">
              Ask questions about project risk, performance and monitoring indicators.
            </p>
            <div className="grid grid-cols-1 sm:gap-2 gap-1.5 w-full max-w-lg">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left p-3 bg-white border border-border rounded-lg hover:border-navy hover:bg-navy/5 transition-colors text-sm text-text"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                  {message.type === 'user' ? (
                    <div className="p-4 bg-navy text-white rounded-xl rounded-tr-none">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {message.content.sections.map((section, sIndex) => (
                        <div key={sIndex} className="p-4 bg-white border border-border rounded-xl">
                          <h4 className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">
                            {section.title}
                          </h4>
                          <p className="text-sm text-text whitespace-pre-line">{section.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-border rounded-xl">
        <Sparkles className="w-5 h-5 text-navy flex-shrink-0" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about project risk, performance, or monitoring..."
          className="flex-1 outline-none text-sm text-text placeholder:text-muted"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AssistantPanel;
