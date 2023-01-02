import React from 'react'
import { PackageIcon, RepoIcon } from '@primer/octicons-react';

const Header = () => {
  return (
    <header>
      <span>Fortun</span>
      <button><PackageIcon size={24} /></button>
      <button><RepoIcon size={24} /></button>
    </header>
  )
}

export default Header