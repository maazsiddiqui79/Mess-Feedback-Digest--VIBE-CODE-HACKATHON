import { useState, useEffect } from 'react';
import { Globe, Link as LinkIcon, Save, AlertCircle, CheckCircle2, User } from 'lucide-react';
import api from '../../lib/api';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: '', description: '', github_url: '', linkedin_url: '', hostel: '', room: '', student_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    api.get('auth/profile/')
      .then(res => setProfile(res.data))
      .catch(() => setMessage({ type: 'error', text: 'Failed to load profile. Please refresh.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await api.patch('auth/profile/', profile);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    } catch (err) {
      const detail = err?.response?.data ? JSON.stringify(err.response.data) : 'Unknown error';
      setMessage({ type: 'error', text: `Failed to update profile: ${detail}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-[#8b90a7] text-sm animate-pulse">Loading profile…</div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto pb-10">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-[#4f6ef7] uppercase mb-1">Account</p>
        <h1 className="text-3xl font-display font-bold text-[#e8eaf0]">Your Profile</h1>
        <p className="text-sm text-[#8b90a7] mt-1">Customize how others see you in the student network.</p>
      </div>

      {message.text && (
        <div className={`mb-5 p-4 rounded-xl border text-sm flex items-start gap-3 ${
          message.type === 'success'
            ? 'bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]'
            : 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Info */}
        <div className="bg-[#1a1d27] border border-[#2a2d3e] rounded-2xl p-6 shadow-md">
          <p className="text-[10px] font-bold text-[#8b90a7] uppercase tracking-widest mb-5 flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Personal Info
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#8b90a7] block mb-2">Display Name</label>
              <input type="text" name="name" value={profile.name || ''} onChange={handleChange}
                placeholder="e.g. Arjun Sharma" className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#8b90a7] block mb-2">Bio</label>
              <textarea name="description" value={profile.description || ''} onChange={handleChange}
                placeholder="Tell others about yourself…" rows={3}
                className="input-field resize-none" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#1a1d27] border border-[#2a2d3e] rounded-2xl p-6 shadow-md">
          <p className="text-[10px] font-bold text-[#8b90a7] uppercase tracking-widest mb-5 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Social Links
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#555870] flex-shrink-0" />
              <input type="url" name="github_url" value={profile.github_url || ''} onChange={handleChange}
                placeholder="https://github.com/username" className="input-field" />
            </div>
            <div className="flex items-center gap-3">
              <LinkIcon className="w-5 h-5 text-[#555870] flex-shrink-0" />
              <input type="url" name="linkedin_url" value={profile.linkedin_url || ''} onChange={handleChange}
                placeholder="https://linkedin.com/in/username" className="input-field" />
            </div>
          </div>
        </div>

        {/* Hostel Details */}
        <div className="bg-[#1a1d27] border border-[#2a2d3e] rounded-2xl p-6 shadow-md">
          <p className="text-[10px] font-bold text-[#8b90a7] uppercase tracking-widest mb-5">Hostel Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#8b90a7] block mb-2">Hostel / Block</label>
              <input type="text" name="hostel" value={profile.hostel || ''} onChange={handleChange}
                placeholder="e.g. Block A" className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#8b90a7] block mb-2">Room Number</label>
              <input type="text" name="room" value={profile.room || ''} onChange={handleChange}
                placeholder="e.g. 204" className="input-field" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full py-3.5 text-sm mt-2">
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
