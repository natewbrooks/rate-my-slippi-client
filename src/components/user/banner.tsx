import React from 'react'
import logo from "../../../public/brand/logo.svg"
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';

interface UserBannerProps { 
  user: SlippiUser | undefined;

}

export const UserBanner = ({ user }: UserBannerProps) => {
  return (
    <div className='flex flex-col gap-3 px-6 text-white'>
      <h3 className='font-serif text-2xl'>{user?.displayName}</h3>
      <div className='flex flex-col gap-5 '>
        <h3 className='font-sans text-[64px]'>NFUL-933</h3>
        <h3 className='font-sans text-[48px] text-gold'>GOLD 3</h3>
      </div>
      {user?.characters?.map((char, i) => (
        <div>
          <img src={char.imageUrl}></img>
        </div>
      ))}
    </div>
  )
}
