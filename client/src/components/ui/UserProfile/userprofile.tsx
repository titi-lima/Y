import { memo } from 'react';
import type { FC } from 'react';
import classes from './userprofile.module.css'
import { useRouter } from 'next/navigation';
import { ProfilePicture } from '../ProfilePicFrame/ProfilePicture';
// import CommentButton from './CommentButton/CommentButton';


interface Props {
  image?: string;
  userName: string;
  nickName: string;
  numFollow: number;
  numFollowers: number;
  numPosts: number;
}


export const UserProfile: FC<Props> = memo(function UserProfile(props) {
  const router = useRouter();
  const nickName = props.userName;

  const listFollowsButton = () => {
    const url = `/FollowsList?nickName=${nickName}`;
    router.push(url);
  };

  return (
    <div className = {classes.mainBox} style={{height: '70%'}}>
        <ProfilePicture scale = "20%"/>
        <div style={{padding: '10px',height: '100%'}}>
            <div className={classes.name}>{props.userName}</div>
            <div className={classes.nick}>{props.nickName}</div>
        </div>
        <button className = {classes.infoBox} onClick={listFollowsButton}>
            <div><a href='' style={{textDecoration: 'underline'}}>{props.numFollow}</a> Seguidos</div>
            <div><a href='' style={{textDecoration: 'underline'}}>{props.numFollowers}</a> Seguidores</div>
            <div><a href='' style={{textDecoration: 'underline'}}>{props.numPosts}</a> Publicações</div>
        </button>
    </div>
  );
});