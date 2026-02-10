import React from 'react'
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';
import { BugIcon, DonateIcon, MailIcon } from '@/assets/icons';
import { QuoteMarquee } from './quote-marquee';

export const HomeFooter = ({}) => {
  const links = [
    {
      name: "Donate",
      href: "/donate",
      Icon: DonateIcon
    },
    {
      name: "Contact Me",
      href: "/contact",
      Icon: MailIcon
    },
    {
      name: "Bug Report",
      href: "/bugs",
      Icon: BugIcon
    }
  ];

  return (
    <div className='flex flex-col'>
      <QuoteMarquee />
      <div className='flex justify-between items-center bg-red w-full'>
      <div className='text-white py-2 pl-6'> 
        <h2 className='font-sans text-3xl'>Created by n8ful</h2>
        <h3 className='font-serif text-sm leading-4'>Not affiliated with Slippi</h3>
      </div>
      <div className="flex h-full">
        {links.map(({ name, href, Icon }) => (
          <Link
            key={name}
            to={href}
            className="flex items-center hover:bg-white hover:text-red text-white transition-colors border-l-4 border-darkest px-4"
          >
            <Icon className="w-7 h-7" />
          </Link>
        ))}
      </div>
    </div>
</div>
  )
}
