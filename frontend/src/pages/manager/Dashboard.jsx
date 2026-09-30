import { useState, useEffect } from 'react';
import { Users, Star, TrendingDown, Clock, Activity, AlertCircle, ChevronRight, X, Image, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../../lib/api';
import SEO from '../../components/common/SEO';
import BackToTop from '../../components/common/BackToTop';
import { StatCardSkeleton, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const MEDIA_BASE = import.meta.env.VITE_MEDIA_URL || 'http://localhost:8000';
const mediaUrl = u => (!u || u.startsWith('http')) ? u : `${MEDIA_BASE}${u}`;

const StarRow = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(s => (
      <Star key={s} className={`w-3.5 h-3.5 ${s<=rating ? 'fill-warning text-warning' : 'text-border'}`} />
    ))}
  </div>
);

const FeedbackModal = ({ fb, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
    <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">Feedback Detail</p>
          <h2 className="text-lg font-display font-bold text-primary">{fb.meal_name}</h2>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-2 text-secondary hover:text-primary transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg rounded-xl p-4 border border-border">
            <p className="label mb-1">Student</p>
            <p className="text-sm text-primary font-medium truncate mt-1">{fb.student_email}</p>
          </div>
          <div className="bg-bg rounded-xl p-4 border border-border">
            <p className="label mb-2">Rating</p>
            <StarRow rating={fb.rating} />
          </div>
        </div>

        {(fb.issue_tags?.length > 0 || fb.positive_tags?.length > 0) && (
          <div className="bg-bg rounded-xl p-4 border border-border">
            <p className="label mb-3">Tags</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {fb.issue_tags?.map(t => <span key={t} className="badge-red">{t}</span>)}
              {fb.positive_tags?.map(t => <span key={t} className="badge-green">{t}</span>)}
            </div>
          </div>
        )}

        {fb.custom_remark && (
          <div className="bg-bg rounded-xl p-4 border border-border">
            <p className="label mb-2">Comment</p>
            <p className="text-sm text-primary leading-relaxed italic mt-1">"{fb.custom_remark}"</p>
          </div>
        )}

        {fb.analysis && (
          <div className="bg-accent/5 rounded-xl p-4 border border-accent/15">
            <p className="label mb-3 text-accent">AI Analysis</p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <p className="text-xs text-secondary">Sentiment</p>
                <p className="text-sm font-semibold text-primary">{fb.analysis.sentiment}</p>
              </div>
              <div>
                <p className="text-xs text-secondary">Severity</p>
                <p className={`text-sm font-semibold ${
                  fb.analysis.severity==='CRITICAL' ? 'text-danger' :
                  fb.analysis.severity==='HIGH'     ? 'text-warning' : 'text-success'
                }`}>{fb.analysis.severity}</p>
              </div>
            </div>
            {fb.analysis.summary && <p className="text-xs text-secondary leading-relaxed mt-3">{fb.analysis.summary}</p>}
          </div>
        )}

        {fb.media?.length > 0 ? (
          <div className="bg-bg rounded-xl p-4 border border-border">
            <p className="label mb-3">Attached Media</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {fb.media.map(m => m.media_type === 'IMAGE'
                ? <a key={m.id} href={mediaUrl(m.file)} target="_blank" rel="noopener noreferrer">
                    <img src={mediaUrl(m.file)} alt={`Photo evidence for meal ${fb.meal_name || 'review'}`}
                      className="rounded-lg w-full h-32 object-cover border border-border hover:opacity-90 transition-opacity cursor-zoom-in" />
                  </a>
                : <video key={m.id} src={mediaUrl(m.file)} controls className="rounded-lg w-full border border-border" />
              )}
            </div>
          </div>
        ) : (
          <div className="bg-bg rounded-xl p-4 border border-border text-center">
            <p className="text-sm text-secondary italic">The image is not uploaded by student</p>
          </div>
        )}

        <p className="text-xs text-muted text-right">
          {new Date(fb.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats,  setStats]  = useState(null);
  const [loading,setLoading]= useState(true);
  const [error,  setError]  = useState('');
  const [sel,    setSel]    = useState(null);

  useEffect(() => {
    api.get('analytics/dashboard/')
       .then(r => setStats(r.data))
       .catch(() => setError('Failed to load metrics.'))
       .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-surface-2 rounded animate-pulse" />
          <div className="h-8 w-48 bg-surface-2 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="card p-6 h-64 bg-surface border border-border flex items-center justify-center">
        <span className="text-xs text-secondary animate-pulse2">Loading live metrics & distribution…</span>
      </div>
    </div>
  );
  if (error) return (
    <div className="p-4 rounded-xl bg-danger/10 border border-danger/25 text-danger flex items-center gap-3 animate-fade-in">
      <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
    </div>
  );

  return (
    <>
      {sel && <FeedbackModal fb={sel} onClose={() => setSel(null)} />}

      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">Operations</p>
            <h1 className="text-3xl font-display font-bold text-primary">Today's Overview</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/25 rounded-full">
            <Activity className="w-3.5 h-3.5 text-success animate-pulse2" />
            <span className="text-xs font-semibold text-success">Live</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label:'Total Feedback',  value: stats.total_today,            icon: Users,        color:'#58a6ff' },
            { label:'Average Rating',  value:`${stats.avg_rating} / 5.0`,   icon: Star,         color:'#d29922' },
            { label:'Critical Issues', value: stats.critical_issues || 0,   icon: TrendingDown, color:'#f85149' },
          ].map((c,i) => (
            <div key={c.label}
              className="card flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i*60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: c.color+'18' }}>
                <c.icon className="w-6 h-6" style={{ color: c.color }} />
              </div>
              <div>
                <p className="text-xs text-secondary font-semibold mb-1">{c.label}</p>
                <p className="text-2xl font-display font-bold text-primary">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        {stats.rating_distribution && (
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg p-6 animate-slide-up" style={{ animationDelay: '120ms' }}>
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-accent" />
              <h2 className="font-display font-bold text-lg text-primary">Today's Rating Distribution</h2>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.rating_distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                  <XAxis dataKey="name" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '8px', color: '#e6edf3' }}
                    itemStyle={{ color: '#58a6ff' }}
                    cursor={{ fill: '#21262d' }}
                  />
                  <Bar dataKey="count" fill="#58a6ff" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg animate-slide-up" style={{animationDelay:'180ms'}}>
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              <h2 className="font-display font-semibold text-primary">Recent Feedback</h2>
            </div>
            <span className="text-xs text-muted">Click row to view details</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Student','Meal','Rating','Tags','Time',''].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-secondary uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recent_feedbacks?.map((fb, i) => (
                  <tr key={fb.id} onClick={() => setSel(fb)}
                    className="border-b border-border hover:bg-surface-2 cursor-pointer transition-colors duration-150 animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-5 py-4 text-primary font-medium">{fb.student_email}</td>
                    <td className="px-5 py-4 text-secondary">{fb.meal_name}</td>
                    <td className="px-5 py-4"><StarRow rating={fb.rating} /></td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {fb.issue_tags?.map(t => <span key={t} className="badge-red">{t}</span>)}
                        {fb.positive_tags?.map(t => <span key={t} className="badge-green">{t}</span>)}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted text-xs">
                      {new Date(fb.created_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                    </td>
                    <td className="px-5 py-4">
                      <ChevronRight className="w-4 h-4 text-muted" />
                    </td>
                  </tr>
                ))}
                {!stats.recent_feedbacks?.length && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-secondary text-sm">No feedback today yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
