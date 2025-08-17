import React from 'react'
import {Link} from 'react-router-dom'
import {PlusIcon, HomeIcon} from 'lucide-react'
import ThemeControl from "./ThemeControl"

export default function Navbar() {
  return (
    <div className='bg-base-300 border-b border-base-content/10' >
      <div className='mx-auto max-w-6xl p-4' >
        <div className='flex flex-row items-center justify-between' >
            < h1 className='text-3xl font-bold text-primary font-mono tracking-tighter' >NoteApp</h1>
            <div className='flex items-center gap-4' >
                <ThemeControl />
                <Link to={'/'} className='btn text-primary-content bg-primary/80 hover:bg-primary' ><HomeIcon/> Home</Link>
                <Link to={'/add'} className='btn btn-secondary' ><PlusIcon/>New Note</Link>
            </div>
        </div>
      </div>
    </div>
  )
}
