interface PlusIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = 18,
  height = 18,
  fill = 'rgba(255, 255, 255, 1)',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M17 10L1 10C0.447715 10 0 9.55228 0 9C0 8.44772 0.447716 8 1 8L17 8C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10Z"
        fill={fill}
      />
      <path
        d="M8 17L8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447716 10 1L10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
