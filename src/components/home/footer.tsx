import React from 'react'
import logo from "../../../public/brand/logo.svg"
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';
import { Icon } from '@iconify/react';


export const HomeFooter = ({}) => {
  const links = [
    {
      name: "Donate",
      href: "/donate",
      icon: "bxs:donate-heart"
    },
    {
      name: "Contact Me",
      href: "/contact",
      icon: "mingcute:mail-fill"
    },
    {
      name: "Bug Report",
      href: "/bugs",
      icon: "solar:bug-bold"
    }
  ];

  return (
    <div className='flex justify-between items-center bg-red w-full'>
      <div className='text-white py-2 px-4'> 
        <h2 className='font-sans text-3xl'>Created by n8ful</h2>
        <h3 className='font-serif text-sm leading-4'>Not affiliated with Slippi</h3>
      </div>
      <div className="flex h-full">
        {links.map(({ name, href, icon }) => (
          <Link
            key={name}
            to={href}
            className="flex items-center hover:bg-white hover:text-red text-white transition-colors border-l-4 border-darkest px-4"
          >
            <Icon icon={icon} className="w-7 h-7" />
          </Link>
        ))}
      </div>

    </div>
  )
}
