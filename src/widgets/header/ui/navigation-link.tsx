import { Link } from '@/shared';

interface NavigationLinkProps {
  link: string;
  label: string;
  onClick?: () => void;
}

export const NavigationLink = ({
  link,
  label,
  onClick,
}: NavigationLinkProps) => {
  return (
    <Link
      href={link}
      onClick={onClick}
      aria-label={label}
      className='block py-3 md:px-3 md:py-5 lg:px-5'
    >
      {label}
    </Link>
  );
};
