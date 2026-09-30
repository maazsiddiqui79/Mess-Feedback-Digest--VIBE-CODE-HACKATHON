import { useState, useEffect } from 'react';
import { Star, Upload, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../lib/api';
import SEO from '../../components/common/SEO';
import ExpandableFAQ from '../../components/common/ExpandableFAQ';
import BackToTop from '../../components/common/BackToTop';

const POSITIVE_TAGS = ['Tasty', 'Good Portion', 'Hot & Fresh', 'Clean Ambience', 'Polite Staff'];
const ISSUE_TAGS    = ['Cold Food', 'Undercooked', 'Too Spicy', 'Salty', 'Poor Hygiene', 'Late Service'];
const EMOJI_MAP     = { 1:'😖', 2:'😕', 3:'😐', 4:'🙂', 5:'😄' };
const EMOJI_LABEL   = { 1:'Terrible', 2:'Poor', 3:'Average', 4:'Good', 5:'Excellent' };

export default function FeedbackForm() {
  const [meals,          setMeals]          = useState([]);
  const [selectedMeal,   setSelectedMeal]   = useState('');
  const [customMealName, setCustomMealName] = useState('');
  const [rating,         setRating]         = useState(0);
  const [hoveredRating,  setHoveredRating]  = useState(0);
  const [selectedTags,   setSelectedTags]   = useState([]);
  const [customRemark,   setCustomRemark]   = useState('');
  const [mediaFile,      setMediaFile]      = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [submitting,     setSubmitting]     = useState(false);
  const [success,        setSuccess]        = useState(false);
  const [error,          setError]          = useState('');

  useEffect(() => {
    api.get('meals/today/')
      .then(res => {
        setMeals(res.data);
        if (res.data.length > 0) setSelectedMeal(res.data[0].id);
      })
      .catch(() => setError('Failed to load today\'s menu.'))
      .finally(() => setLoading(false));
  }, []);

  const toggleTag = (tag) =>
    setSelectedTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!selectedMeal)                                       return setError('Please select a meal.');
    if (selectedMeal === 'custom' && !customMealName.trim()) return setError('Please describe your custom meal.');
    if (rating === 0)                                        return setError('Please give a star rating.');

    setSubmitting(true);
    try {
      const isPositive = rating >= 4;
      const payload = {
        meal:             selectedMeal === 'custom' ? null : selectedMeal,
        custom_meal_name: selectedMeal === 'custom' ? customMealName.trim() : undefined,
        rating,
        issue_tags:    isPositive ? [] : selectedTags,
        positive_tags: isPositive ? selectedTags : [],
        custom_remark: customRemark,
        is_anonymous:  false,
      };
      const res = await api.post('feedback/create/', payload);

      if (mediaFile && res.data.id) {
        const fd = new FormData();
        fd.append('media_type', mediaFile.type.startsWith('video/') ? 'VIDEO' : 'IMAGE');
        fd.append('file', mediaFile);
        await api.post(`feedback/${res.data.id}/media/`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedMeal(meals[0]?.id ?? '');
        setCustomMealName(''); setRating(0); setSelectedTags([]);
        setCustomRemark(''); setMediaFile(null);
      }, 3000);
    } catch {
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-secondary text-sm animate-pulse2">Loading today's menu…</div>
    </div>
  );

  if (success) return (
    <div className="flex flex-col items-center justify-center h-80 max-w-md mx-auto text-center animate-scale-in p-6">
      <SEO title="Feedback Received - Student Dining" description="Your meal feedback has been recorded." />
      <div className="w-16 h-16 rounded-full bg-success/10 border border-success/25 flex items-center justify-center mb-4 text-success shadow-[0_0_20px_rgba(63,185,80,0.25)]">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-display font-bold text-primary">Feedback Submitted!</h2>
      <p className="text-secondary text-sm mt-2 max-w-xs leading-relaxed">
        Thank you. Your feedback has been analyzed and sent to mess operations.
      </p>
      <button
        onClick={() => {
          setSuccess(false);
          setRating(0);
          setSelectedTags([]);
          setCustomRemark('');
          setMediaFile(null);
        }}
        className="btn-primary mt-6 flex items-center gap-2 text-xs py-2.5 px-5"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Submit Another Feedback
      </button>
    </div>
  );

  const activeRating   = hoveredRating || rating;
  const availableTags  = rating >= 4 ? POSITIVE_TAGS : ISSUE_TAGS;

  return (
    <div className="max-w-2xl mx-auto pb-12 animate-fade-in relative">
      <SEO 
        title="Rate Your Meal - Student Dining" 
        description="Share student feedback for hostel breakfast, lunch, snacks, and dinner meals." 
      />
      {/* Header */}
      <div className="mb-7">
        <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">Student Feedback</p>
        <h1 className="text-3xl font-display font-bold text-primary">Rate Your Meal</h1>
        <p className="text-sm text-secondary mt-1">Your honest feedback drives real improvements.</p>
      </div>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-danger/10 border border-danger/25 text-danger text-sm flex items-start gap-3 animate-slide-down">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1 */}
        <div className="card">
          <p className="label mb-3">Step 1 · Which meal did you have?</p>
          <div className="flex flex-wrap gap-2">
            {meals.map(m => (
              <button key={m.id} type="button"
                onClick={() => { setSelectedMeal(m.id); setCustomMealName(''); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  selectedMeal === m.id
                    ? 'bg-accent text-[#0d1117] border-accent shadow-[0_0_12px_rgba(88,166,255,0.25)]'
                    : 'bg-bg border-border text-secondary hover:border-accent/50 hover:text-primary'
                }`}
              >{m.name}</button>
            ))}
            <button type="button"
              onClick={() => setSelectedMeal('custom')}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                selectedMeal === 'custom'
                  ? 'bg-accent text-[#0d1117] border-accent shadow-[0_0_12px_rgba(88,166,255,0.25)]'
                  : 'bg-bg border-border text-secondary hover:border-accent/50 hover:text-primary'
              }`}
            >Other / Custom</button>
          </div>

          {selectedMeal === 'custom' && (
            <div className="mt-4 pt-4 border-t border-border animate-slide-down">
              <p className="label mb-2">What did you have?</p>
              <input autoFocus type="text" value={customMealName} onChange={e => setCustomMealName(e.target.value)}
                placeholder="e.g. Vada Pav from canteen…" className="input-field" />
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div className="card">
          <p className="label mb-4 text-center">Step 2 · How was it?</p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {[1,2,3,4,5].map(s => (
                <button key={s} type="button"
                  onMouseEnter={() => setHoveredRating(s)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => { setRating(s); setSelectedTags([]); }}
                  className="transition-transform duration-500 ease-in-out hover:scale-125 active:scale-95 focus:outline-none"
                >
                  <Star className={`w-10 h-10 transition-colors duration-500 delay-75 ease-in-out ${
                    s <= activeRating ? 'fill-[#d29922] text-[#d29922]' : 'text-border fill-transparent'
                  }`} />
                </button>
              ))}
            </div>
            {activeRating > 0 && (
              <div className="flex flex-col items-center animate-slide-up mt-2 h-16 justify-center">
                <span className="text-4xl transition-transform duration-500 hover:scale-110 cursor-default">{EMOJI_MAP[activeRating]}</span>
                <span className="text-xs font-bold text-accent mt-1 tracking-wide">{EMOJI_LABEL[activeRating]}</span>
              </div>
            )}
            {activeRating === 0 && (
              <div className="h-16 mt-2"></div>
            )}
          </div>
        </div>

        {/* Step 3 - animate in */}
        {rating > 0 && (
          <div className="card animate-slide-up">
            <p className="label mb-3">{rating >= 4 ? 'Step 3 · What did you love?' : 'Step 3 · What went wrong?'}</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button key={tag} type="button" onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-accent/15 border-accent text-accent'
                      : 'bg-bg border-border text-secondary hover:border-accent/40'
                  }`}
                >{tag}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        <div className="card">
          <p className="label mb-3">Step 4 · Comments & media (optional)</p>
          <textarea value={customRemark} onChange={e => setCustomRemark(e.target.value)}
            className="input-field resize-none min-h-[90px]" placeholder="Anything else to share…" />
          <div className="mt-3 flex items-center gap-3">
            <label className="cursor-pointer group">
              <input type="file" accept="image/*,video/*" className="hidden"
                onChange={e => setMediaFile(e.target.files[0] || null)} />
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                mediaFile
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-bg border-border text-secondary hover:border-accent/40 hover:text-primary'
              }`}>
                <Upload className="w-4 h-4" />
                {mediaFile ? (mediaFile.name.length > 25 ? mediaFile.name.slice(0,25)+'…' : mediaFile.name) : 'Attach Image / Video'}
              </div>
            </label>
            {mediaFile && (
              <button type="button" onClick={() => setMediaFile(null)}
                className="text-xs text-danger hover:underline transition-colors">Remove</button>
            )}
          </div>
        </div>

        <button type="submit" disabled={submitting || rating === 0} className="btn-primary w-full py-3.5 text-sm mt-2">
          {submitting ? 'Submitting…' : 'Submit Feedback'}
        </button>
      </form>

      {/* Expandable FAQ Section */}
      <div className="mt-12">
        <ExpandableFAQ />
      </div>

      <BackToTop />
    </div>
  );
}
