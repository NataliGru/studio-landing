import Link from 'next/link';
import { NAVIGATION_LINKS } from '../models/constants';
import { CircleUser } from 'lucide-react';
import clsx from 'clsx';

interface AccountLinkProps {
  label: string;
  showLabel?: boolean;
  onClick?: () => void;
}

export const AccountLink = ({
  label,
  showLabel = false,
  onClick,
}: AccountLinkProps) => {
  return (
    <Link
      href={NAVIGATION_LINKS.account.link}
      aria-label={label}
      onClick={onClick}
      className={clsx('flex items-center gap-3', 'md:px-3 md:py-5 lg:px-5')}
    >
      <CircleUser className='size-7 stroke-[1.7] md:size-6.5 md:stroke-2 lg:size-7.5 2xl:size-10' />

      {showLabel && <span>{label}</span>}
    </Link>
  );
};
