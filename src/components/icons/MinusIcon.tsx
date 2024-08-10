import React from 'react';

interface MinusIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const MinusIcon: React.FC<MinusIconProps> = ({
  width = 18,
  height = 4,
  fill = 'rgba(255, 255, 255, 1)',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 4"
      fill="none"
      className={className}
    >
      <path
        d="M16.5 3.5L1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5L16.5 0.5C17.3284 0.5 18 1.17157 18 2C18 2.82843 17.3284 3.5 16.5 3.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default MinusIcon;
