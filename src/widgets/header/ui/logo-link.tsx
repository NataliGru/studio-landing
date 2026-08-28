import Link from 'next/link';
import { NAVIGATION_LINKS } from '../models/constants';
import clsx from 'clsx';

interface LogoLinkProps {
  onClick?: () => void;
}

export const LogoLink = ({ onClick }: LogoLinkProps) => {
  return (
    <Link
      href={NAVIGATION_LINKS.logo.link}
      onClick={onClick}
      className={clsx(
        'flex items-center px-5',
        'md:px-3 md:py-5 lg:px-5 2xl:p-8',
      )}
    >
      <h2 aria-label='logo' className='text-3xl font-bold 2xl:text-5xl'>
        {NAVIGATION_LINKS.logo.textKey}
      </h2>
    </Link>
  );
};
