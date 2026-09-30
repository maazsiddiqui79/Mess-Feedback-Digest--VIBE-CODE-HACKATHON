import { useState, useEffect, useRef } from 'react';
import { FileText, Calendar, TrendingUp, CheckCircle, RefreshCcw, Download, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../lib/api';
import SEO from '../../components/common/SEO';
import BackToTop from '../../components/common/BackToTop';

/* ── CSV Export ─────────────────────────────────────── */
const exportCSV = (feedbacks, date) => {
  if (!feedbacks?.length) { alert('No data to export.'); return; }
  const headers = ['ID','Student','Meal','Rating','Issue Tags','Positive Tags','Comment','Sentiment','Severity','Submitted'];
  const rows = feedbacks.map(fb => [
    fb.id, fb.student_email||'', fb.meal_name||'', fb.rating,
    (fb.issue_tags||[]).join('; '), (fb.positive_tags||[]).join('; '),
    (fb.custom_remark||'').replace(/,/g,' '),
    fb.analysis?.sentiment||'N/A', fb.analysis?.severity||'N/A',
    new Date(fb.created_at).toLocaleString(),
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], {type:'text/csv'})),
    download: `messmind-${date}.csv`,
  });
  a.click();
};

/* ── Countdown Hook ─────────────────────────────────── */
function useCountdown(initial, active) {
  const [count, setCount] = useState(initial);
  const ref = useRef(null);
  useEffect(() => {
    if (!active) { setCount(initial); return; }
    setCount(initial);
    ref.current = setInterval(() => setCount(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(ref.current);
  }, [active, initial]);
  return count;
}

/* ── Digest Card ────────────────────────────────────── */
const DigestCard = ({ digest }) => {
  const [expanded,  setExpanded]  = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    api.get(`feedback/?date=${digest.date}`)
       .then(r => setFeedbacks(r.data))
       .catch(() => {});
  }, [digest.date]);

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg animate-slide-up transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
          <div>
            <h2 className="font-display font-bold text-primary text-base leading-tight">
              {new Date(digest.date).toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'})}
            </h2>
            <div className="flex gap-4 mt-0.5">
              <span className="text-xs text-secondary">{digest.response_count} responses</span>
              <span className="text-xs text-secondary">Avg {Number(digest.average_rating).toFixed(1)}/5.0</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportCSV(feedbacks, digest.date)} className="btn-secondary py-1.5 px-3 text-xs">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button onClick={() => setExpanded(e => !e)} className="p-2 rounded-lg bg-surface-2 border border-border text-secondary hover:text-primary transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-6 space-y-5 animate-fade-in">
          {/* Overview */}
          <div className="bg-bg rounded-xl p-4 border border-border">
            <p className="label mb-2">AI Overview</p>
            <p className="text-sm text-primary leading-relaxed mt-2">{digest.overview}</p>
          </div>

          {/* Issues & Positives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-danger/5 rounded-xl p-4 border border-danger/15">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <p className="text-xs font-bold text-danger uppercase tracking-widest">Top Issues</p>
              </div>
              <ul className="space-y-1.5">
                {digest.top_issues?.map((x,i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger mt-2 flex-shrink-0" />{x}
                  </li>
                ))}
                {!digest.top_issues?.length && <li className="text-sm text-muted italic">None reported.</li>}
              </ul>
            </div>
            <div className="bg-success/5 rounded-xl p-4 border border-success/15">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-success" />
                <p className="text-xs font-bold text-success uppercase tracking-widest">Positive Signals</p>
              </div>
              <ul className="space-y-1.5">
                {digest.positive_signals?.map((x,i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />{x}
                  </li>
                ))}
                {!digest.positive_signals?.length && <li className="text-sm text-muted italic">None noted.</li>}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-accent/5 rounded-xl p-5 border border-accent/15">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-accent" />
              <p className="text-xs font-bold text-accent uppercase tracking-widest">Recommendations</p>
            </div>
            <ol className="space-y-2">
              {digest.recommendations?.map((r,i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-primary">
                  <span className="w-5 h-5 rounded-full bg-accent/15 text-accent text-[11px] font-bold flex-shrink-0 flex items-center justify-center mt-0.5">{i+1}</span>
                  {r}
                </li>
              ))}
              {!digest.recommendations?.length && <li className="text-sm text-muted italic">No recommendations.</li>}
            </ol>
          </div>

          {/* Individual Feedback */}
          {feedbacks.length > 0 && (
            <div className="bg-bg rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="label">All Feedback ({feedbacks.length})</p>
              </div>
              <div className="divide-y divide-border">
                {feedbacks.slice(0, 8).map(fb => (
                  <div key={fb.id} className="px-4 py-3 flex items-start gap-4 hover:bg-surface transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-primary truncate">{fb.student_email}</span>
                        <span className="text-[10px] text-muted">· {fb.meal_name}</span>
                      </div>
                      {fb.custom_remark && (
                        <p className="text-xs text-secondary line-clamp-1 italic">"{fb.custom_remark}"</p>
                      )}
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={`text-xs ${s<=fb.rating ? 'text-warning' : 'text-border'}`}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
                {feedbacks.length > 8 && (
                  <p className="px-4 py-3 text-xs text-muted italic">…{feedbacks.length-8} more. Export CSV for all data.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Reports Page ────────────────────────────────────── */
export default function Reports() {
  const [digests,    setDigests]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [generating, setGenerating] = useState(false);
  const [toast,      setToast]      = useState(null); // { type, msg }
  const [counting,   setCounting]   = useState(false);
  const countdown = useCountdown(5, counting);

  const fetchDigests = async () => {
    try {
      const r = await api.get('analytics/digests/');
      setDigests(r.data);
    } catch { setToast({ type:'error', msg:'Failed to load reports.' }); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchDigests(); }, []);

  // When countdown hits 0, refresh
  useEffect(() => {
    if (counting && countdown === 0) {
      setCounting(false);
      fetchDigests();
    }
  }, [countdown, counting]);

  const handleGenerate = async () => {
    setGenerating(true);
    setToast(null);
    try {
      await api.post('analytics/digests/generate/');
      setToast({ type:'success', msg:'Generation started. Refreshing in:' });
      setCounting(true);
    } catch {
      setToast({ type:'error', msg:'Generation failed. Check AI configuration.' });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-secondary text-sm animate-pulse2">Loading reports…</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in relative pb-12">
      <SEO 
        title="Daily Digests & Reports - Operations" 
        description="Comprehensive daily AI summaries, ratings, recommendations, and CSV exports for dining management." 
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">AI Engine</p>
          <h1 className="text-3xl font-display font-bold text-primary">Daily Digests</h1>
          <p className="text-sm text-secondary mt-1">AI-generated summaries of daily mess operations.</p>
        </div>
        <button onClick={handleGenerate} disabled={generating || counting} className="btn-primary">
          <RefreshCcw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          {generating ? 'Generating…' : counting ? `Refreshing in ${countdown}s…` : "Generate Today's Report"}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`p-4 rounded-xl border text-sm flex items-center gap-3 animate-slide-down transition-all ${
          toast.type === 'success'
            ? 'bg-success/10 border-success/25 text-success'
            : 'bg-danger/10 border-danger/25 text-danger'
        }`}>
          {toast.msg}
          {counting && (
            <span className="ml-1 inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/20 font-display font-bold text-lg animate-pulse2">
              {countdown}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      {digests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface border border-dashed border-border rounded-2xl text-center">
          <FileText className="w-12 h-12 text-muted mb-4" />
          <h3 className="text-base font-semibold text-secondary">No reports generated yet</h3>
          <p className="text-sm text-muted mt-1">Click "Generate Today's Report" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {digests.map(d => <DigestCard key={d.id} digest={d} />)}
        </div>
      )}

      <BackToTop />
    </div>
  );
}
