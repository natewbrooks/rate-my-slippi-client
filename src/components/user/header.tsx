import React from 'react'
import logo from "../../../public/brand/logo.svg"
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';

interface UserHeaderProps { 
  user: SlippiUser | undefined;
  region?: string
}

export const UserHeader = ({ user, region }: UserHeaderProps) => {
  return (
    <div>
      <div className='flex w-full justify-between p-4'>
        <Link to='/' href='/'><img src={logo} width={80}/></Link>
      </div>
      <div className='bg-red p-3 flex flex-col justify-between text-white'>
        <div className='flex gap-2 items-center text-3xl font-sans -mb-[0.2em] leading-3'>
          <h3>{region}</h3>
          <h3>|</h3>
          <span className=''>{user?.displayName}</span>
        </div>
      </div>
    </div>
  )
}
