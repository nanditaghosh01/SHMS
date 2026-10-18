import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  guest: {
    id: 'usr-guest-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    role: 'guest',
    phone: '+1 (555) 234-8901',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Alexander Sterling',
    email: 'alexander.s@lumorahotels.com',
    role: 'admin',
    department: 'Executive Operations',
    phone: '+1 (555) 901-2001',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  receptionist: {
    id: 'usr-rec-1',
    name: 'Mia Chen',
    email: 'mia.chen@lumorahotels.com',
    role: 'receptionist',
    department: 'Front Desk & Concierge',
    phone: '+1 (555) 901-2002',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  housekeeping: {
    id: 'usr-hk-1',
    name: 'Elena Rostova',
    email: 'elena.r@lumorahotels.com',
    role: 'housekeeping',
    department: 'Guest Accommodations & Housekeeping',
    phone: '+1 (555) 901-2004',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  },
  manager: {
    id: 'usr-mgr-1',
    name: 'Victoria Kensington',
    role: 'manager',
    email: 'v.kensington@lumorahotels.com',
    roleLabel: 'General Manager',
    department: 'Hotel Management & Revenue',
    phone: '+1 (555) 901-2006',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  } as unknown as User
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('lumora_user_role') as UserRole;
      return (saved && DEFAULT_USERS[saved]) ? saved : 'guest';
    } catch {
      return 'guest';
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('lumora_user_role') as UserRole;
      return (saved && DEFAULT_USERS[saved]) ? DEFAULT_USERS[saved] : DEFAULT_USERS['guest'];
    } catch {
      return DEFAULT_USERS['guest'];
    }
  });

  useEffect(() => {
    localStorage.setItem('lumora_user_role', role);
    setUser(DEFAULT_USERS[role]);
  }, [role]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEFAULT_USERS[newRole]);
  };

  const login = (email: string, forcedRole?: UserRole): boolean => {
    const assignedRole = forcedRole || (email.includes('admin') ? 'admin' :
      email.includes('reception') ? 'receptionist' :
      email.includes('housekeeping') ? 'housekeeping' :
      email.includes('manager') ? 'manager' : 'guest');

    setRole(assignedRole);
    const baseUser = DEFAULT_USERS[assignedRole];
    setUser({ ...baseUser, email: email || baseUser.email });
    return true;
  };

  const register = (name: string, email: string): boolean => {
    setRole('guest');
    setUser({
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'guest',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
    return true;
  };

  const logout = () => {
    // Revert to demo guest state
    setRole('guest');
    setUser(DEFAULT_USERS.guest);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        switchRole,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
