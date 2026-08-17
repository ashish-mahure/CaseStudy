'use client';
import { useState } from 'react';
import { MenuIcon, XIcon } from './Icon';

const links = ['Platform', 'Solutions', 'Resources', 'Pricing', 'Company'];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="container nav-wrap">
      <a className="brand" href="#top" aria-label="NexaFlow home">NEXAFLOW</a>
      <nav className={open ? 'desktop-nav open' : 'desktop-nav'} aria-label="Primary navigation">
        {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
      </nav>
      <a className="nav-cta" href="#demo">Book a Demo</a>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>
        {open ? <XIcon /> : <MenuIcon />}
      </button>
    </div>
  </header>;
}
