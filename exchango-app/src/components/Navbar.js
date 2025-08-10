'use client'
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { 
  UserCircleIcon, 
  ArrowLeftStartOnRectangleIcon, // Logout Icon
  ClockIcon // History Icon
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    // Added a subtle shadow and refined background/border colors
    <header className="sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:opacity-80 transition-opacity">
            Exchango
          </Link>
          <div className="flex items-center gap-6">
            {loading ? (
              <div className="text-sm text-slate-500 animate-pulse">Loading...</div>
            ) : user ? (
              // --- USER LOGGED IN: THE NEW PROFILE DROPDOWN ---
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group flex items-center gap-2 rounded-full p-2 text-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
  <span className="sr-only">Open user menu</span>
  {/* The Icon */}
  <UserCircleIcon className="h-7 w-7 text-slate-500 group-hover:text-indigo-600" />
  {/* The Name (always visible now) */}
  <span className="font-medium text-slate-700 group-hover:text-slate-900">
    {user?.name ?? 'Profile'}
  </span>
</MenuButton>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* Section 1: User Info */}
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">Signed in as</p>
                      <p className="truncate text-sm text-slate-600">{user.email}</p>
                    </div>
                    {/* Section 2: Actions */}
                    <div className="py-1">
                      <MenuItem>
  {({ active }) => (
    <Link
      href="/dashboard"
      className={`${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700'} group flex items-center w-full px-4 py-2 text-sm`}
    >
      <ClockIcon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500" />
      Transfer History
    </Link>
  )}
</MenuItem>
                    </div>
                    {/* Section 3: Logout */}
                    <div className="py-1">
                       <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700'} group flex items-center w-full px-4 py-2 text-sm`}
                          >
                            <ArrowLeftStartOnRectangleIcon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500" />
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              // --- USER LOGGED OUT: Polished Buttons ---
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Join for Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}