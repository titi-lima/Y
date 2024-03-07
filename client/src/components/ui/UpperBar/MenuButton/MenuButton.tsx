import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './MenuButton.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 5:117 */
export const MenuButton: FC<Props> = memo(function MenuButton(props = {}) {
  return (
    <button
      className={classes.root}
    >
      <hr className={classes.line1}></hr>
      <hr className={classes.line1}></hr>
      <hr className={classes.line1}></hr>
    </button>
  );
});
