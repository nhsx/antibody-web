import React, { FunctionComponent } from 'react';

type CaptionSize = "m" | "l" | "xl";
 
interface CaptionProps {
  size?: CaptionSize;
  children: React.ReactNode;
}

const Caption : FunctionComponent<CaptionProps> = (props: CaptionProps) => {

  const { size = "m", children } = props;

  return <span className={`nhsuk-caption-${size}`}>{children}</span>;
};


export default Caption;