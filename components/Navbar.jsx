import React,{ Fragment }  from 'react'
import Logo from './Logo'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { classNames } from '../utils/classNames'

const styles = {
    app__navbar_wrapper: 'flex items-center space-x-10 relative',
    app__navbar_container: 'flex flex-1 justify-between',
    app__navbar_header: 'flex items-center space-x-6 cursor-pointer',
    app__navbar_navItem: 'cursor-pointer',
    app__navbar_menuBox: 'relative inline-block text-left',
    app__navbar_menuButton: 'flex items-center rounded-full  text-white hover:text-gray-200 focus:outline-none',
    app__navbar_menuIcon: 'h-5 w-5',
    app__navbar_menuItems: 'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
    app__navbar_menuItemsContainer: 'py-1',
    app__navbar_menuItem: 'block w-full px-4 py-2 text-left text-sm',
    app__navbar_buttonActive: 'bg-gray-100 text-gray-900',
    app__navbar_buttonInactive: 'text-gray-700',
}

const transitions = {
    menuEnter: 'transition ease-out duration-100',
    menuEnterFrom: 'transform opacity-0 scale-95',
    menuEnterTo: 'transform opacity-100 scale-100',
    menuLeave: 'transition ease-in duration-75',
    menuLeaveFrom: 'transform opacity-100 scale-100',
    menuLeaveTo: 'transform opacity-0 scale-95',
}

const Navbar = ({logout,joinAllowList, inAllowlist, isAdmin, downloadAllowlist}) => {
  return (
    <header className={styles.app__navbar_wrapper}>
          <Logo/>

          <div className={styles.app__navbar_container}>
            <ul className={styles.app__navbar_header}>
                <li className={styles.app__navbar_navItem}>Products</li>
                <li className={styles.app__navbar_navItem}>MarketPlace</li>
                <li className={styles.app__navbar_navItem}>Gallery</li>
                <li className={styles.app__navbar_navItem}>Attributes</li>
            </ul>

            <Menu as="div" className={styles.app__navbar_menuBox}>
                  <div>
                 <Menu.Button className={styles.app__navbar_menuButton}>
                           <MenuIcon className={styles.app__navbar_menuIcon}/>
                 </Menu.Button>
                  </div>
                  <Transition as={Fragment} enter={transitions.menuEnter} enterFrom={transitions.menuEnterFrom} enterTo={transitions.menuEnterTo} leave={transitions.menuLeave} leaveFrom={transitions.leaveFrom} leaveTo={transitions.menuLeaveTo}>
                     <Menu.Items className={styles.app__navbar_menuItems}>
                         <div className={styles.app__navbar_menuItemsContainer}>
                         {!inAllowlist && (
                         <Menu.Item>              
                            {({ active }) => (
                                            <button onClick={joinAllowList} className={classNames(active ? styles.app__navbar_buttonActive : styles.app__navbar_buttonInactive, styles.app__navbar_menuItem)}>
                                                Join AllowList
                                            </button>
                                        )}                                       
                            </Menu.Item>
                            )}
                             {isAdmin && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={downloadAllowlist} className={classNames(active ? styles.app__navbar_buttonActive :  styles.app__navbar_buttonInactive, styles.app__navbar_menuItem)}>
                                                Download Allowlist
                                            </button>
                                        )}
                                    </Menu.Item>
                                )}
                            <Menu.Item>
                            {({ active }) => (
                                            <button onClick={logout} className={classNames(active ? styles.app__navbar_buttonActive : styles.app__navbar_buttonInactive, styles.app__navbar_menuItem)}>
                                                Disconnect
                                            </button>
                                        )}
                            </Menu.Item>
                         </div>
                     </Menu.Items>
                  </Transition>
            </Menu>
          </div>
    </header>
  )
}

export default Navbar