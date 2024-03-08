import { memo } from 'react';
import type { FC } from 'react';
import { Ellipse1Icon } from './Ellipse1Icon';
import classes from './ProfilePicture.module.css';

interface Props {
  className?: string;
  top?: string;
  left?: string;
  scale?: string;

}

export const ProfilePicture: FC<Props> = memo(function ProfilePicture(props) {
  return (
    <div className={classes.root}
          style = {{top: props.top, left: props.left, width: props.scale}}>

      <div className={classes.ellipse1}>
        <Ellipse1Icon className={classes.icon} />
      </div>
      
    </div>
  );
});
