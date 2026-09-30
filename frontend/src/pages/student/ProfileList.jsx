import { useState, useEffect } from 'react';
import { Search, Globe, Link, MapPin, Hash, User } from 'lucide-react';
import api from '../../lib/api';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get('auth/profiles/');
        setProfiles(res.data);
      } catch (err) {
        console.error('Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(p => {
    const searchTerm = search.toLowerCase();
    const nameMatch = p.name?.toLowerCase().includes(searchTerm);
    const idMatch = p.student_id?.toLowerCase().includes(searchTerm);
    const emailMatch = p.email?.toLowerCase().includes(searchTerm);
    return nameMatch || idMatch || emailMatch;
  });

  return (
    <div className="max-w-5xl mx-auto pb-8">
      <div className="mb-10 mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-6 bg-accent"></div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tight">Community.</h1>
          </div>
          <p className="text-sm text-secondary font-medium tracking-wide">CONNECT WITH OTHER STUDENTS.</p>
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-secondary" />
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-[#151515]"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted">Loading profiles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((p, idx) => (
              <div key={idx} className="card group hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-accent overflow-hidden">
                    {p.profile_image ? (
                      <img src={p.profile_image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {p.email && (
                      <a href={`mailto:${p.email}`} className="p-2 bg-[#1a1a1a] rounded-lg text-secondary hover:text-accent hover:bg-accent/10 transition-colors" title={`Message ${p.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </a>
                    )}
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1a1a1a] rounded-lg text-secondary hover:text-accent hover:bg-accent/10 transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {p.linkedin_url && (
                      <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1a1a1a] rounded-lg text-secondary hover:text-accent hover:bg-accent/10 transition-colors">
                        <Link className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{p.name || 'Anonymous Student'}</h3>
                <div className="text-sm text-accent font-medium mb-4 flex flex-col">
                  <span className="flex items-center"><Hash className="w-3 h-3 mr-1" /> {p.student_id}</span>
                  {p.email && <span className="text-xs text-secondary mt-1">{p.email}</span>}
                </div>

                <p className="text-sm text-secondary line-clamp-3 mb-6 min-h-[60px]">
                  {p.description || 'No bio provided.'}
                </p>

                <div className="flex items-center text-xs text-muted font-medium bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
                  <MapPin className="w-4 h-4 mr-2" />
                  {p.hostel ? `${p.hostel}, Room ${p.room || 'N/A'}` : 'Hostel not specified'}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-muted card bg-[#151515]">
              No students found matching "{search}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileList;
