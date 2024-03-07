import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Ellipse1Icon } from './Ellipse1Icon';
import classes from './ProfilePicture.module.css';

interface Props {
  className?: string;
  marginTop?: string;
  left?: string;
  scale?: string;

}
/* @figmaId 3:95 */
export const ProfilePicture: FC<Props> = memo(function ProfilePicture(props = {}) {
  return (
    <div className={classes.root}
    style = {{top: props.marginTop, left: props.left, width: props.scale, height: props.scale}}>

      <div className={classes.ellipse1}>
        <Ellipse1Icon className={classes.icon} />
      </div>
    </div>
  );
});
