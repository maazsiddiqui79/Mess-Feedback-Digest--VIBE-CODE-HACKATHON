import { useState, useEffect } from 'react';
import { Users, Trash2, PlusCircle, ShieldAlert, X, AlertCircle } from 'lucide-react';
import api from '../../lib/api';
import SEO from '../../components/common/SEO';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import BackToTop from '../../components/common/BackToTop';
import { TableRowSkeleton } from '../../components/common/LoadingSkeleton';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  
  // Create/Edit User Form State
  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'MANAGER', is_active: true });
  const [saving, setSaving] = useState(false);
  const [formMsg, setFormMsg] = useState({ type:'', text:'' });

  // Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get('auth/admin/users/');
      setUsers(res.data);
    } catch (e) {
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`auth/admin/users/${deleteTarget.id}/`);
      setUsers(users.filter(u => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      setError('Failed to delete user.');
    } finally {
      setDeleting(false);
    }
  };

  const openCreate = () => {
    setEditUser(null);
    setFormData({ email: '', password: '', role: 'MANAGER', is_active: true });
    setFormMsg({ type:'', text:'' });
    setShowCreate(true);
  };

  const openEdit = (u) => {
    setEditUser(u);
    setFormData({ email: u.email, password: '', role: u.role, is_active: u.is_active });
    setFormMsg({ type:'', text:'' });
    setShowCreate(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormMsg({ type:'', text:'' });
    try {
      if (editUser) {
        const payload = { email: formData.email, role: formData.role, is_active: formData.is_active };
        if (formData.password) payload.password = formData.password;
        await api.patch(`auth/admin/users/${editUser.id}/`, payload);
        setFormMsg({ type:'success', text:'User updated successfully.' });
      } else {
        await api.post('auth/admin/create-manager/', {
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        setFormMsg({ type:'success', text:'User created successfully.' });
      }
      fetchUsers();
      setTimeout(() => setShowCreate(false), 1500);
    } catch (err) {
      const detail = err?.response?.data ? JSON.stringify(err.response.data) : 'Unknown error';
      setFormMsg({ type:'error', text:`Failed: ${detail}` });
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = filterRole === 'ALL' ? users : users.filter(u => u.role === filterRole);

  return (
    <div className="space-y-6 animate-fade-in relative pb-12">
      <SEO 
        title="User Management - Admin Control" 
        description="MessMind administrative dashboard to manage user access, managers, students, and system accounts." 
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-danger uppercase mb-1">Administration</p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary">User Management</h1>
        </div>
        <button onClick={openCreate} className="btn-primary bg-danger hover:bg-danger/80 hover:shadow-[0_0_16px_rgba(248,81,73,0.25)] border-none self-start sm:self-auto flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
        {['ALL', 'STUDENT', 'MANAGER', 'ADMIN'].map(role => (
          <button key={role} onClick={() => setFilterRole(role)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filterRole === role ? 'bg-danger/15 text-danger border-danger/40 shadow-sm' : 'bg-surface text-secondary border-border hover:bg-surface-2 hover:text-primary'
            }`}>
            {role}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/25 text-danger text-sm flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* User List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg animate-slide-up">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary" />
            <h2 className="font-display font-semibold text-primary">All Users ({users.length})</h2>
          </div>
          {loading && <span className="text-xs text-muted animate-pulse2">Syncing…</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/60">
                {['Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-secondary uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <TableRowSkeleton cols={5} />
                  <TableRowSkeleton cols={5} />
                  <TableRowSkeleton cols={5} />
                  <TableRowSkeleton cols={5} />
                </>
              ) : (
                filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-border hover:bg-surface-2/60 transition-colors duration-150">
                    <td className="px-5 py-4 text-primary font-medium">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${
                        u.role === 'ADMIN' || u.role === 'SUPER_ADMIN' ? 'badge-red' : u.role === 'MANAGER' ? 'badge-yellow' : 'badge-blue'
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-5 py-4">
                      {u.is_active ? <span className="text-success text-xs font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Active</span> : <span className="text-muted text-xs font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted"></span>Inactive</span>}
                    </td>
                    <td className="px-5 py-4 text-muted text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-4 flex gap-2">
                      <button onClick={() => openEdit(u)} className="p-2 bg-surface-2 text-secondary rounded-lg hover:bg-accent/10 hover:text-accent transition-colors" title="Edit User">
                        <span className="w-4 h-4 text-[10px] flex items-center justify-center font-bold">✎</span>
                      </button>
                      <button onClick={() => setDeleteTarget({ id: u.id, email: u.email })} className="p-2 bg-danger/10 text-danger rounded-lg hover:bg-danger hover:text-white transition-colors" title="Delete User">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {!loading && filteredUsers.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-secondary">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete User Account"
        message={`Are you sure you want to permanently delete ${deleteTarget?.email}? This action cannot be reversed.`}
        confirmText="Delete Account"
        type="danger"
        isLoading={deleting}
        onConfirm={confirmDelete}
        onClose={() => !deleting && setDeleteTarget(null)}
      />

      <BackToTop />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-display font-bold text-primary flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-danger" /> {editUser ? 'Edit User' : 'Create User'}
              </h2>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg hover:bg-surface-2 text-secondary hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {formMsg.text && (
                <div className={`p-3 rounded-lg text-sm ${formMsg.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                  {formMsg.text}
                </div>
              )}
              
              <div>
                <label className="text-xs font-semibold text-secondary block mb-2">Email Address</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="input-field" placeholder="user@messmind.edu" />
              </div>

              <div>
                <label className="text-xs font-semibold text-secondary block mb-2">Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="input-field cursor-pointer">
                  <option value="MANAGER" className="bg-[#0d1117] text-white">Manager</option>
                  <option value="ADMIN" className="bg-[#0d1117] text-white">Admin</option>
                  {editUser && <option value="STUDENT" className="bg-[#0d1117] text-white">Student</option>}
                </select>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-secondary block mb-2">
                  {editUser ? 'New Password (leave blank to keep current)' : 'Initial Password'}
                </label>
                <input type="password" required={!editUser} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                  className="input-field" placeholder="••••••••" minLength={8} />
              </div>

              {editUser && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isActive" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded bg-surface border-border text-accent focus:ring-accent" />
                  <label htmlFor="isActive" className="text-sm font-semibold text-primary cursor-pointer">Active Account</label>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1 py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 py-2.5 bg-danger hover:bg-danger/80 border-none shadow-[0_0_12px_rgba(248,81,73,0.2)]">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
