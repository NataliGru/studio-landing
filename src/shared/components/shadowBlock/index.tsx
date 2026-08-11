import clsx from 'clsx';

interface ShadowBlockProps {
  className?: string;
}

export const ShadowBlock = ({ className }: ShadowBlockProps) => {
  return (
    <div
      aria-hidden
      className={clsx(
        'from-background/0 to-background bg-linear-to-b',
        'pointer-events-none',
        className,
      )}
    />
  );
};
