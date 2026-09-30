import { useState, useEffect } from 'react';
import { Utensils, PlusCircle, Trash2, Edit2, X, Check } from 'lucide-react';
import api from '../../lib/api';
import SEO from '../../components/common/SEO';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import BackToTop from '../../components/common/BackToTop';

export default function MenuManager() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Confirmation Modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState('LUNCH');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('14:00');
  const [isActive, setIsActive] = useState(true);

  const fetchMeals = async () => {
    try {
      const res = await api.get('meals/manager/');
      setMeals(res.data);
    } catch (e) {
      setError('Failed to load menu data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleOpenNew = () => {
    setIsEditing(false);
    setCurrentMeal(null);
    setName('');
    setMealType('LUNCH');
    setDate(new Date().toISOString().split('T')[0]);
    setStartTime('12:00');
    setEndTime('14:00');
    setIsActive(true);
    setShowModal(true);
  };

  const handleOpenEdit = (m) => {
    setIsEditing(true);
    setCurrentMeal(m);
    setName(m.name);
    setMealType(m.meal_type);
    setDate(m.date);
    setStartTime(m.start_time.substring(0, 5));
    setEndTime(m.end_time.substring(0, 5));
    setIsActive(m.is_active);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`meals/manager/${deleteTarget.id}/`);
      setMeals(meals.filter(m => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setError('Failed to delete meal.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      meal_type: mealType,
      date,
      start_time: startTime,
      end_time: endTime,
      is_active: isActive
    };

    try {
      if (isEditing) {
        const res = await api.patch(`meals/manager/${currentMeal.id}/`, payload);
        setMeals(meals.map(m => m.id === currentMeal.id ? res.data : m));
      } else {
        const res = await api.post('meals/manager/', payload);
        setMeals([res.data, ...meals]);
      }
      setShowModal(false);
    } catch {
      alert('Failed to save meal.');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-secondary text-sm animate-pulse2">Loading menu…</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in relative pb-12">
      <SEO 
        title="Menu Management - Operations" 
        description="Configure meal schedules, active dining times, and hostel mess daily menus." 
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">Configuration</p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary">Menu Management</h1>
        </div>
        <button onClick={handleOpenNew} className="btn-primary self-start sm:self-auto flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Add Meal
        </button>
      </div>

      {error && <div className="p-4 rounded-xl bg-danger/10 text-danger text-sm">{error}</div>}

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg animate-slide-up">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Utensils className="w-4 h-4 text-secondary" />
          <h2 className="font-display font-semibold text-primary">All Meals ({meals.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/60">
                {['Name', 'Type', 'Date', 'Time Window', 'Active', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-secondary uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meals.map(m => (
                <tr key={m.id} className="border-b border-border hover:bg-surface-2/60 transition-colors">
                  <td className="px-5 py-4 text-primary font-medium">{m.name}</td>
                  <td className="px-5 py-4"><span className="badge badge-gray">{m.meal_type}</span></td>
                  <td className="px-5 py-4 text-secondary">{new Date(m.date).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-secondary">{m.start_time.substring(0,5)} - {m.end_time.substring(0,5)}</td>
                  <td className="px-5 py-4">
                    {m.is_active ? <span className="text-success font-bold text-xs"><Check className="w-3 h-3 inline mr-1"/>Yes</span> : <span className="text-muted text-xs font-bold">No</span>}
                  </td>
                  <td className="px-5 py-4 flex gap-2">
                    <button onClick={() => handleOpenEdit(m)} className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-bg transition-colors" title="Edit Meal">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteTarget({ id: m.id, name: m.name })} className="p-2 bg-danger/10 text-danger rounded-lg hover:bg-danger hover:text-white transition-colors" title="Delete Meal">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {meals.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-secondary">No meals found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Meal Item"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmText="Delete Meal"
        type="danger"
        isLoading={deleting}
        onConfirm={confirmDelete}
        onClose={() => !deleting && setDeleteTarget(null)}
      />

      <BackToTop />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-display font-bold text-primary">
                {isEditing ? 'Edit Meal' : 'Add New Meal'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-surface-2 text-secondary hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-secondary block mb-2">Meal Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="e.g. Samosa & Chai" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-secondary block mb-2">Type</label>
                  <select value={mealType} onChange={e => setMealType(e.target.value)} className="input-field">
                    <option value="BREAKFAST" className="bg-[#0d1117] text-white">Breakfast</option>
                    <option value="LUNCH" className="bg-[#0d1117] text-white">Lunch</option>
                    <option value="SNACKS" className="bg-[#0d1117] text-white">Snacks</option>
                    <option value="DINNER" className="bg-[#0d1117] text-white">Dinner</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-secondary block mb-2">Date</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-secondary block mb-2">Start Time</label>
                  <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-secondary block mb-2">End Time</label>
                  <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="input-field" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                <label htmlFor="isActive" className="text-sm font-semibold text-primary cursor-pointer">Active (Visible to Students)</label>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-2.5">Cancel</button>
                <button type="submit" className="btn-primary flex-1 py-2.5">Save Meal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
