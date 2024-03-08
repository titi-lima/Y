import { memo } from 'react';
import type { FC } from 'react';
import classes from './MenuButton.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}

export const MenuButton: FC<Props> = memo(function MenuButton(props) {
  return (
    <button className={classes.root}>
      <hr className={classes.line1}/>
      <hr className={classes.line1}/>
      <hr className={classes.line1}/>
    </button>
  );
});
