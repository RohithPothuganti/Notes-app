import { NotebookIcon } from 'lucide-react'
import React from 'react'
import {Link} from 'react-router-dom'

export default function NoNotes() {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center' >
      <div className='bg-primary/10 rounded-full p-8' >
        <NotebookIcon className='size-10 text-primary'  />
      </div>
      <h3>No Notes yet</h3>
      <Link to={'/add'} className='btn btn-secondary'>Create Your First Note</Link>
    </div>
  )
}
