import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  UserIcon,
  FolderIcon,
  HomeIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import { useAuth } from '@/lib/auth'
// import { useAuthorization, ROLES } from '@/lib/authorization';

type UserNavigationItem = {
  name: string
  to: string
  onClick?: () => void
}

const UserNavigation = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const userNavigation = [
    { name: '个人资料', to: './profile' },
    { name: '测试', to: 'test' },
    {
      name: '登出',
      to: '',
      onClick: () => {
        logout()
      },
    },
  ] as UserNavigationItem[]

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="max-w-xs bg-gray-200 p-2 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">打开用户菜单</span>
              <UserIcon className="h-8 w-8 rounded-full" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black  ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <UserNavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
