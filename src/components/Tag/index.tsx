interface TagProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Tag({ children, className, onClick }: Readonly<TagProps>) {
  return (
    <button
      className={`justify-center px-5 py-2 text-xs font-semibold text-center rounded-[100px] text-cyan-950 cursor-pointer ${className}`}
      onClick={onClick}
      type="button"
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === 'Space')) {
          onClick();
        }
      }}>
      {children}
    </button>
  );
}

Tag.defaultProps = {
  className: '',
  onClick: null
};

export default Tag;
