import { memo } from 'react';
import type { FC } from 'react';
import classes from './MiddleBar.module.css';


interface Props {
  className?: string;
  text?: string;
}

export const MiddleBar: FC<Props> = memo(function MiddleBar(props) {
  return (
    <div style={{height: '8%'}}>
      <button className={classes.option}>Postagens</button>
      <hr className={classes.centre}/>
    </div>
  );
});
