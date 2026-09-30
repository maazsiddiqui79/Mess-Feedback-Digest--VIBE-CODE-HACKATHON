import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck, Clock, MessageSquare } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 'faq-ai',
    icon: Sparkles,
    question: 'How does the AI analyze my feedback?',
    answer: 'MessMind utilizes modern LLM intelligence (Groq LLaMA/GPT-OSS engine) to review sentiment, detect themes (taste, hygiene, temperature, quantity), and automatically assess severity. Food poisoning, foreign objects, or severe safety hazards are immediately flagged as CRITICAL.',
  },
  {
    id: 'faq-privacy',
    icon: ShieldCheck,
    question: 'Is my feedback anonymous?',
    answer: 'Yes! You can toggle the "Submit Anonymously" switch when submitting feedback. Anonymous feedback conceals your name and student ID from kitchen staff and managers while still training the analytics engine.',
  },
  {
    id: 'faq-digest',
    icon: Clock,
    question: 'What is the Daily Digest and when is it generated?',
    answer: 'Daily Digests automatically summarize all student feedback gathered throughout each meal session into key highlights, top operational issues, and AI recommendations for mess managers and committee members.',
  },
  {
    id: 'faq-photos',
    icon: MessageSquare,
    question: 'Can I upload photos of meal issues?',
    answer: 'Yes, you can attach photos directly when submitting feedback. Images are securely stored and reviewed alongside AI analysis by mess supervisors to verify meal quality.',
  },
  {
    id: 'faq-urgent',
    icon: HelpCircle,
    question: 'What happens when a critical issue is reported?',
    answer: 'Critical issues (such as raw food or hygiene concerns) are immediately displayed with urgent alert banners on the manager dashboard and reflected in live operational statistics.',
  },
];

export default function ExpandableFAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="card bg-surface border border-border rounded-2xl p-6 md:p-8 animate-fade-in shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-display text-primary">Frequently Asked Questions</h2>
          <p className="text-xs text-secondary mt-0.5">Learn more about MessMind feedback, dining intelligence, and AI processing</p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-surface-2 border-accent/40 shadow-[0_0_12px_rgba(88,166,255,0.1)]' 
                  : 'bg-surface-2/40 border-border hover:border-border/80 hover:bg-surface-2/70'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-secondary'}`} />
                  <span className={`text-sm font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-secondary hover:text-primary'}`}>
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-accent' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-secondary leading-relaxed border-t border-border/40 animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
