import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';

export const MLink: React.FC<ButtonProps> = (props) => {
  const MLinkProps = { ...props, component: props.href ? Link : undefined };
  return <Button {...MLinkProps}>{props.children}</Button>;
};

export default MLink;
