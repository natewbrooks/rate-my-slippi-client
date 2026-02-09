import React from 'react'
import logo from "../../../public/brand/logo.svg"
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';
import { Icon } from '@iconify/react';


export const HomeFooter = ({}) => {
  return (
    <div className='flex justify-between items-center py-3 px-6 bg-red w-full absolute bottom-0'>
      <div className='text-white'>
        <h2 className='font-sans text-3xl'>Created by n8ful</h2>
        <h3 className='font-serif leading-4'>Not affiliated with Slippi</h3>
      </div>
    </div>
  )
}
