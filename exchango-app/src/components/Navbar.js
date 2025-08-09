'use client'
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'; // Headless UI import කරගන්න
import { UserCircleIcon } from '@heroicons/react/24/outline'; // Icon එක import කරගන්න
import { Fragment } from 'react';

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Exchango
          </Link>
          <div className="flex items-center gap-6">
            {loading ? (
              <div className="text-sm text-slate-500 animate-pulse">Loading...</div>
            ) : user ? (
              // --- USER LOGIN වෙලා නම්, මෙන්න අලුත් Dropdown Menu එක ---
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-8 w-8 text-slate-600 hover:text-blue-600" />
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
                  <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {/* User Name & Email */}
                      <div className="px-4 py-3 border-b border-slate-200">
                        <p className="text-sm font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                      {/* History Link */}
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700'} block px-4 py-2 text-sm`}
                          >
                            Transfer History
                          </Link>
                        )}
                      </MenuItem>
                      {/* Logout Button */}
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${active ? 'bg-red-50 text-red-800' : 'text-slate-700'} block w-full px-4 py-2 text-left text-sm`}
                          >
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              // --- USER LOGIN වෙලා නැත්නම්, පරණ විදියමයි ---
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
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