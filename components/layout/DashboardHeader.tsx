'use client';

import { Bell, User, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  isCollapsed: boolean;
}

export default function DashboardHeader({ isCollapsed }: DashboardHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className={cn(
      'fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-40 transition-all duration-300',
      isCollapsed ? 'left-20' : 'left-64'
    )}>
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-feli-yellow rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-feli-green rounded-full flex items-center justify-center text-white">
                {user?.firstName?.[0] || user?.email?.[0] || 'A'}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <User size={16} />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}