import { NavLinkProps } from '@/types';
import Link from 'next/link';
import React from 'react'

export const NavLinksBg = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <li className="flex h-10 w-20 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-[#001344]">
      {href ? (
        <Link
          href={href}
          className="text-center text-sm font-normal text-white"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="text-center text-sm font-normal text-white"
        >
          {children}
        </button>
      )}
    </li>
  );
};
