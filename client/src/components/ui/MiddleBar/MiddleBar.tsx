import { memo } from 'react';
import type { FC } from 'react';
import classes from './MiddleBar.module.css';


interface Props {
  className?: string;
  text?: string;
}

export const MiddleBar: FC<Props> = memo(function MiddleBar(props) {
  return (
    <div style={{height: '20%'}}>
      <div className= {classes.rowBox}>
        <button className={classes.option}>Histórico de Postagens</button>
        <button className={classes.option}>Sobre</button>
      </div>
      <hr className={classes.centre}/>
    </div>
  );
});
