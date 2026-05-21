import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArcioLogo } from '../../../src/components/ArcioLogo';

export default function PatientLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const accent = '#006591';
  const accentDark = '#004a6b';

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/patient'), 1200);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      background: '#ffffff',
      position: 'relative', overflow: 'hidden'
    }}>
      <style>{`
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes cardAppear {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-white to-[#f0f9ff]">
        <div className="absolute right-0 top-0 w-[80%] h-full opacity-50">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <g className="animate-[spin_40s_linear_infinite]" transform-origin="400 400">
              <circle cx="600" cy="200" r="150" fill="#bae6fd" className="animate-[pulse_4s_ease-in-out_infinite]" />
              <circle cx="200" cy="600" r="200" fill="#e0f2fe" className="animate-[pulse_5s_ease-in-out_infinite_0.5s]" />
              <circle cx="700" cy="600" r="100" fill="#bfdbfe" className="animate-[pulse_3s_ease-in-out_infinite_1s]" />
            </g>
            <g className="animate-[bounce_8s_ease-in-out_infinite]" transform-origin="400 400">
              <path d="M400,100 Q450,50 500,100 T600,100" stroke="#38bdf8" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M200,300 Q250,250 300,300 T400,300" stroke="#38bdf8" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.3" />
            </g>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>
      </div>

      {/* Central Glass Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-[32px] p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontSize: 13, cursor: 'pointer', marginBottom: 32, width: 'fit-content', transition: 'color 0.2s', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
          ← Back to portal selection
        </button>

        <div style={{ marginBottom: 24 }}>
          <ArcioLogo size="lg" subtitle="Patient Portal" />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8, color: '#0f172a' }}>Welcome back</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 32 }}>Sign in to access your health records.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" accent={accent} required />
          <PasswordField label="Password" value={password} onChange={setPassword} show={showPass} onToggle={() => setShowPass(!showPass)} accent={accent} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer', fontWeight: 500 }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: accent }} />
              Remember me
            </label>
            <button type="button" style={{ background: 'none', border: 'none', color: accent, fontSize: 13, cursor: 'pointer', fontWeight: 600, padding: 0 }}>
              Forgot password?
            </button>
          </div>

          <SubmitButton loading={loading} accent={accent} accentDark={accentDark} label="Sign In" />
        </form>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */
function Field({ label, type, value, onChange, placeholder, accent }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '14px 16px', borderRadius: 14, fontSize: 14,
          background: 'rgba(255,255,255,0.7)', color: '#0f172a',
          border: `1px solid ${focused ? accent : 'rgba(226,232,240,0.8)'}`,
          outline: 'none', transition: 'all 0.2s',
          boxShadow: focused ? `0 0 0 4px ${accent}20` : 'inset 0 2px 4px rgba(0,0,0,0.02)',
        }}
      />
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggle, accent }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
          placeholder="••••••••" required
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '14px 44px 14px 16px', borderRadius: 14, fontSize: 14,
            background: 'rgba(255,255,255,0.7)', color: '#0f172a',
            border: `1px solid ${focused ? accent : 'rgba(226,232,240,0.8)'}`,
            outline: 'none', transition: 'all 0.2s',
            boxShadow: focused ? `0 0 0 4px ${accent}20` : 'inset 0 2px 4px rgba(0,0,0,0.02)',
          }}
        />
        <button type="button" onClick={onToggle} style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, padding: 0
        }}>{show ? '🙈' : '👁'}</button>
      </div>
    </div>
  );
}

function SubmitButton({ loading, accent, accentDark, label }) {
  return (
    <button type="submit" disabled={loading} style={{
      padding: '16px', borderRadius: 14, border: 'none', fontSize: 15, fontWeight: 700, cursor: loading ? 'wait' : 'pointer',
      background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
      color: '#fff', marginTop: 16, transition: 'all 0.2s',
      boxShadow: `0 8px 24px ${accent}40`,
      opacity: loading ? 0.8 : 1,
    }}
    onMouseEnter={e => {
      if (!loading) {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 12px 28px ${accent}50`;
      }
    }}
    onMouseLeave={e => {
      if (!loading) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${accent}40`;
      }
    }}
    >
      {loading ? '⏳ Signing in…' : label}
    </button>
  );
}
