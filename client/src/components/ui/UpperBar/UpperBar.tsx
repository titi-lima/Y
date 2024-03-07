import { memo } from 'react';
import type { FC } from 'react';

import { LogoSVG } from '../LogoSVG/LogoSVG';
import { MenuButton } from './MenuButton/MenuButton';
import classes from './UpperBar.module.css';


interface Props {
  className?: string;
  text?: string;
}
/* @figmaId 19:2125 */
export const UpperBar: FC<Props> = memo(function UpperBar(props = {}) {
  return (
    <div className={classes.root}>
      <div className={classes.header}>{props.text}</div>
      <LogoSVG></LogoSVG>
      <MenuButton></MenuButton>
    </div>
  );
});
