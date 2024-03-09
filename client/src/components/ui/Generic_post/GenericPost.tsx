import { memo } from 'react';
import type { FC } from 'react';
import classes from './GenericPost.module.css';
import { ProfilePicture } from '../ProfilePicFrame/ProfilePicture';
// import CommentButton from './CommentButton/CommentButton';


interface Props {
  className?: string;
  text?: string;
  n_likes: number;
  n_comm: number;
}


export const GenericPost: FC<Props> = memo(function GenericPost(props) {
  return (
    <div className={classes.root}>
    
      <section style={{marginTop: '5%', position: 'relative', minHeight: '80px'}}>

        <ProfilePicture top='1vh' left='4%' scale='10%'/>
        <div className={classes.author_nick}>Nick</div>
        <div className={classes.post_date}>Date</div>
      
      </section>

      <div className={classes.post_text}>{props.text}</div>

      <div className={classes.post_likes_comments}>{props.n_likes} Likes</div>
      
      <hr style={{height: '1vh', background: 'var(--main-color)'}}/>
      
      <div className={classes.post_likes_comments}>{props.n_comm} Comentários</div>

      <button className={classes.add_comm}>Adicionar comentário</button>
      
      {/* <button onClick={()=>console.log("Clicou")}>
        Adicionar comentário
      </button> */}
      {/* <CommentButton></CommentButton> */}
    
    </div>
  );
});