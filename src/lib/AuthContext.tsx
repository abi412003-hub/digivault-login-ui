import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: DPProfile | null;
  loading: boolean;
  sendOtp: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; isNew: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface DPProfile {
  id: string;
  role: string;
  type: string;
  status: string;
  full_name: string;
  mobile: string;
  email: string | null;
  profile_photo_url: string | null;
  registration_id?: string;
  verification_status?: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DPProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('id, role, type, status, full_name, mobile, email, profile_photo_url')
      .eq('id', userId)
      .maybeSingle();

    if (data) {
      // Also fetch DP-specific data
      const { data: dpData } = await supabase
        .from('delivery_partners')
        .select('registration_id, verification_status')
        .eq('user_id', userId)
        .maybeSingle();

      setProfile({ ...data, ...dpData } as DPProfile);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchProfile(s.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchProfile(s.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOtp = async (phone: string) => {
    try {
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      });
      if (error) return { success: false, isNew: false, error: error.message };

      // Check if user exists in our users table
      const { data: existing } = await supabase
        .from('users')
        .select('id, status')
        .eq('mobile', phone.replace(/^\+91/, ''))
        .maybeSingle();

      const isNew = !existing;
      if (existing) await fetchProfile(existing.id);

      return { success: true, isNew };
    } catch (e: any) {
      return { success: false, isNew: false, error: e.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    window.location.href = '/login';
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, sendOtp, verifyOtp, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
