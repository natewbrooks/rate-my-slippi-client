import React from 'react'
import logo from "../../../public/brand/logo.svg"
import { Link } from '@tanstack/react-router';
import type { SlippiUser } from '../../api/types';
import { Icon } from '@iconify/react';


export const HomeFooter = ({}) => {
  return (
    <div className='flex justify-between items-center p-4 bg-red w-full'>
      <div className='text-white'>
        <h3>Created by n8ful</h3>
        <h3>Not affiliated with Slippi</h3>
      </div>
    </div>
  )
}
