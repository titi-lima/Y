import { memo } from 'react';
import type { FC } from 'react';
import classes from './GenericPost.module.css';
import { ProfilePicture } from '../ProfilePicFrame/ProfilePicture';


interface Props {
  className?: string;
  text?: string;
}
/* @figmaId 19:2125 */
export const GenericPost: FC<Props> = memo(function GenericPost(props = {}) {
  return (
    <div className={classes.root}>
        <ProfilePicture
        marginTop='5%' left='4%' scale='10%'>
        </ProfilePicture>
        <div className={classes.author_nick}>Nick</div>
        <div className={classes.post_date}>Date</div>
    </div>
  );
});