import { useState, useEffect, useRef } from 'react';
import { Send, Trash2, Paperclip, Hash, Image } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';

// Media files are served by Django at http://localhost:8000
// The API returns relative paths like /media/... so we prefix them.
const MEDIA_BASE = import.meta.env.VITE_MEDIA_URL || 'http://localhost:8000';
const mediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${MEDIA_BASE}${url}`;
};

export default function CommunityChat() {
  const [messages,  setMessages]  = useState([]);
  const [newMsg,    setNewMsg]    = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const { user } = useAuth();
  const endRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('community/');
      setMessages([...res.data].reverse());
    } catch (e) {
      console.error('Chat load error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const iv = setInterval(fetchMessages, 10000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() && !mediaFile) return;
    try {
      const res = await api.post('community/', {
        post_type: 'DISCUSSION',
        content:   newMsg.trim() || 'Shared a file',
      });
      if (mediaFile && res.data.id) {
        const fd = new FormData();
        fd.append('media_type', mediaFile.type.startsWith('video/') ? 'VIDEO'
                               : mediaFile.type.startsWith('audio/') ? 'AUDIO' : 'IMAGE');
        fd.append('file', mediaFile);
        await api.post(`community/${res.data.id}/media/`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setNewMsg(''); setMediaFile(null);
      fetchMessages();
    } catch (e) { console.error('Send failed', e); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`community/${id}/`);
      setMessages(m => m.filter(x => x.id !== id));
    } catch (e) { console.error('Delete failed', e); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-secondary text-sm animate-pulse2">Loading community…</div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]">
      <SEO 
        title="Community Discussion - Student Dining" 
        description="Engage in community meal discussions, feedback sharing, and student dining polls." 
      />
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-border">
        <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">Group Chat</p>
        <h1 className="text-xl sm:text-2xl font-display font-bold text-primary">Student Community</h1>
        <p className="text-sm text-secondary">Chat, share, connect.</p>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-secondary gap-3">
            <Hash className="w-10 h-10 opacity-20" />
            <p className="text-sm">No messages yet — be the first!</p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isMe      = msg.author_email === user?.email;
          const authorName = msg.author_name || msg.author_email?.split('@')[0] || 'Student';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 animate-fade-in ${isMe ? 'flex-row-reverse' : ''}`}
              style={{ animationDelay: `${Math.min(i * 20, 200)}ms` }}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1 transition-transform hover:scale-105 ${
                isMe ? 'bg-accent text-[#0d1117]' : 'bg-surface-2 text-secondary border border-border'
              }`}>
                {authorName[0]?.toUpperCase()}
              </div>

              <div className={`flex flex-col max-w-[72%] ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[11px] text-muted mb-1 px-1">{isMe ? 'You' : authorName}</span>

                <div className={`group relative rounded-2xl px-4 py-3 text-sm shadow-md transition-all duration-200 hover:shadow-lg ${
                  isMe
                    ? 'bg-accent text-[#0d1117] rounded-tr-none'
                    : 'bg-surface border border-border text-primary rounded-tl-none hover:border-accent/20'
                }`}>
                  {msg.content && (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  )}

                  {/* ── Media Attachments ── */}
                  {msg.media && msg.media.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.media.map(m => {
                        const src = mediaUrl(m.file);
                        if (m.media_type === 'IMAGE') return (
                          <a key={m.id} href={src} target="_blank" rel="noopener noreferrer">
                            <img
                              src={src}
                              alt={`Photo shared by ${authorName}`}
                              className="rounded-xl max-h-64 w-full object-cover border border-white/10 hover:opacity-90 transition-opacity cursor-zoom-in"
                              onError={ev => {
                                ev.target.style.display = 'none';
                                ev.target.nextSibling && (ev.target.nextSibling.style.display = 'flex');
                              }}
                            />
                            <div className="hidden items-center gap-2 p-3 bg-black/20 rounded-xl text-xs">
                              <Image className="w-4 h-4" /> Image failed to load. <a href={src} className="underline">Open</a>
                            </div>
                          </a>
                        );
                        if (m.media_type === 'VIDEO') return (
                          <video key={m.id} src={src} controls
                            className="rounded-xl max-h-56 w-full border border-white/10"
                          />
                        );
                        return (
                          <audio key={m.id} src={src} controls
                            className="w-full rounded-xl" />
                        );
                      })}
                    </div>
                  )}

                  <span className={`text-[10px] block mt-2 ${isMe ? 'text-[#0d1117]/60' : 'text-muted'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {isMe && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="absolute -left-9 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted opacity-0 group-hover:opacity-100 hover:bg-danger/10 hover:text-danger transition-all duration-150"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input bar */}
      <div className="mt-4 pt-4 border-t border-border">
        {mediaFile && (
          <div className="mb-3 flex items-center gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20 text-sm text-accent animate-slide-down">
            <Paperclip className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate font-medium">{mediaFile.name}</span>
            <button onClick={() => setMediaFile(null)} className="text-danger hover:underline text-xs font-semibold flex-shrink-0">
              Remove
            </button>
          </div>
        )}
        <form onSubmit={handleSend} className="flex items-end gap-3">
          <label className="cursor-pointer flex-shrink-0 p-3 rounded-xl bg-surface border border-border text-secondary hover:border-accent/50 hover:text-accent transition-all duration-150">
            <input type="file" accept="image/*,video/*,audio/*" className="hidden"
              onChange={e => setMediaFile(e.target.files[0] || null)} />
            <Paperclip className="w-5 h-5" />
          </label>
          <textarea
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="Write a message…"
            className="flex-1 input-field resize-none py-3"
            rows={1}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
          />
          <button type="submit" disabled={!newMsg.trim() && !mediaFile} className="btn-primary px-4 py-3 flex-shrink-0">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
