import React, { FunctionComponent } from 'react';

enum HeadingSizeEnum {
  xs = 5,
  s = 4,
  m = 3,
  l = 2,
  xl = 1
};

export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
 
interface HeadingProps {
  size?: Size;
  children: React.ReactNode;
}

const Heading : FunctionComponent<HeadingProps> = (props: HeadingProps) => {

  const { size = "m", children } = props;

  const headerTag = `h${HeadingSizeEnum[size]}`;
    
  return React.createElement(
    headerTag,
    {
      className: `nhsuk-heading-${size}`,
    },
    children
  );
};


export default Heading;