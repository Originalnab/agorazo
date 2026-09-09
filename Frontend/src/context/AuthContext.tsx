import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const PRESET_USERS: Record<UserRole, UserProfile | null> = {
  visitor: null,
  customer: {
    id: 'user-001',
    name: 'Emmanuel Mensah',
    email: 'emmanuel.mensah@gmail.com',
    phone: '+233 24 456 7890',
    role: 'customer',
    companyName: 'Individual Buyer',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  dealer: {
    id: 'dealer-001',
    name: 'Kofi Asante',
    email: 'sales@apexmotors.com.gh',
    phone: '+233 20 111 8899',
    role: 'dealer',
    companyName: 'Apex Motors Ghana',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  clearing: {
    id: 'clearing-001',
    name: 'David Quaye',
    email: 'operations@tema-clearing.com',
    phone: '+233 24 888 3322',
    role: 'clearing',
    companyName: 'West Coast Clearing & Logistics',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  admin: {
    id: 'admin-001',
    name: 'Agorazo Admin Console',
    email: 'admin@agorazo.com.gh',
    phone: '+233 24 000 1234',
    role: 'admin',
    companyName: 'Agorazo HQ Accra',
    verified: true,
    avatarUrl: '/logo.png',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('agorazo_role');
    return (saved as UserRole) || 'customer';
  });

  const [user, setUser] = useState<UserProfile | null>(PRESET_USERS[role]);

  useEffect(() => {
    localStorage.setItem('agorazo_role', role);
    setUser(PRESET_USERS[role]);
  }, [role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const loginAs = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const logout = () => {
    setRoleState('visitor');
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, loginAs, logout }}>
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
