import React from 'react'
import { InboxIcon } from '@primer/octicons-react';

const Header = () => {
  return (
    <header>
      <span>Fortun</span>
      <button><InboxIcon size={24} /></button>
    </header>
  )
}

export default Header