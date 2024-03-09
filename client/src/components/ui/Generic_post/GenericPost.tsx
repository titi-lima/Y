'use client'

import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';
import classes from './GenericPost.module.css';
import { ProfilePicture } from '../ProfilePicFrame/ProfilePicture';
import CommentButton from './CommentButton/CommentButton';
import {CommentBox} from './CommentBox/CommentBox';
import { CommentType, PostType, UserType } from '@/lib/custom_types';
import axios from 'axios';

interface Props {
  post: PostType
};


export const GenericPost: FC<Props> = memo(function GenericPost(props) {
  
  const example_comments: CommentType[] = [
    {
      id: "cltjdajyo000210ofdvten0tr",
      postId: "cltja6hii000110ofbogu1krn",
      authorId: "cltja5xsc000010ofm3k2pwix",
      date: new Date("2024-02-02T00:00:00.000Z"),
      text: "Que legal!"
    }
  ];

  const [user, setUser] = useState<UserType>();
  const [received_comments, setComments] = useState<CommentType[]>();

  useEffect(()=> {

    axios.get("http://localhost:3001/users/" + props.post.authorId)
    .then(response => setUser(response.data.data))
    .catch(error => console.log(error))

    axios.get("http://localhost:3001/posts/" + props.post.id + "/comments")
    .then(response => {
      if(response.status == 204){
        setComments([]);
      }
      else{
        setComments(response.data.data);
      }
    })
    .catch(error => console.log(error))

  }, []);

  if(!user || !received_comments) return null

  const set_comments_date = received_comments.map(comment => {
    comment.date = new Date(comment.date);
    return comment;
  });

  set_comments_date.sort((comment1, comment2) => comment2.date.getTime() - comment1.date.getTime());
  // console.log(set_posts_date);

  const comment_list = set_comments_date.map(comment => <CommentBox comment={comment}/>);
  
  return (
    <div className={classes.root}>
    
      <section style={{position: 'relative', display: 'flex', minHeight: '80px', marginBottom: '2%'}}>

        <ProfilePicture scale='10%'/>
        <section style={{position: 'relative', left:'1%'}}>
          <div className={classes.author_nick}>{user.nickName}</div>
          <div className={classes.post_date}>{props.post.date.toLocaleString()}</div>
        </section>

      </section>

      <div className={classes.post_text}>{props.post.text}</div>

      <div className={classes.post_likes_comments}>{props.post.likes} Likes</div>
      
      <hr style={{margin: '0 -6.5%', width: 'auto', height: '5px', background: 'var(--main-color)', border:'none'}}/>
      
      <div className={classes.post_likes_comments}>
        {comment_list.length}
        {comment_list.length == 1 ? ' Comentário' : ' Comentários'}
      
      </div>

      <div>{comment_list}</div>

      <CommentButton/>
    
    </div>
  );
});