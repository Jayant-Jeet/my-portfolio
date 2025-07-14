'use client';

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = navbar.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      navbar.style.setProperty('--mouse-x', `${x}%`);
      navbar.style.setProperty('--mouse-y', `${y}%`);
    };

    navbar.addEventListener('mousemove', handleMouseMove);

    return () => {
      navbar.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <nav ref={navbarRef} className="navbar">
      <Link href="/">
        <Image 
          src="/Logo_Color5.svg" 
          alt="Logo" 
          className="navbar-logo" 
          width={250} 
          height={250} 
        />
      </Link>
    </nav>
  );
}
