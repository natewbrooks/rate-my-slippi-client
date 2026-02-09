import React from 'react'
import logo from "@/assets/images/brand/logo.svg"
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';
import { Icon } from '@iconify/react';

interface UserHeaderProps { 
  user: SlippiUser | undefined;
  region?: string
}

export const UserHeader = ({ user, region }: UserHeaderProps) => {
  return (
    <div>
      <div className='flex w-full justify-between p-4 items-center'>
        <Link to='/' href='/'><img src={logo} width={64}/></Link>
        <div className='text-white flex gap-3'>
          {/* <Icon icon="line-md:loading-twotone-loop"></Icon> */}
          <Icon icon="stash:sun-solid" className='w-8 h-8'></Icon>
          <Icon icon="mingcute:user-4-fill" className='w-8 h-8'></Icon>
        </div>
      </div>
      <div className='bg-red py-2 px-6 flex flex-col justify-between text-white'>
        <div className='flex gap-2 items-center text-3xl font-sans'>
          <h2>{region} • {user?.displayName}</h2>
        </div>
      </div>
    </div>
  )
}
