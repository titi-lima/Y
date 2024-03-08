import { memo } from 'react';
import type { FC } from 'react';

import classes from './LogoSVG.module.css';
import { VectorIcon2 } from './VectorIcon2';
import { VectorIcon3 } from './VectorIcon3';
import { VectorIcon } from './VectorIcon';

interface Props {
  className?: string;
}

export const LogoSVG: FC<Props> = memo(function LogoSVG(props) {
  return (
    <button className={classes.root}>
      <div className={classes.vector}>{<VectorIcon3 className={classes.icon} />}</div>
      <div className={classes.vector2}>{<VectorIcon className={classes.icon} />}</div>
      <div className={classes.vector3}>{<VectorIcon2 className={classes.icon} />}</div>
    </button>
  );
});
