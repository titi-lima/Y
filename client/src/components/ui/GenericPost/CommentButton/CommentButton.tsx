'use client'

import React, { useState } from 'react';
import type { Dispatch, FC, SetStateAction } from 'react';
import classes from './CommentButton.module.css'
import { api } from '@/lib/api';

interface Props {
  authorId: string;
  postId: string;
  setReload: Dispatch<SetStateAction<boolean>>
};

export const CommentButton: FC<Props> = (props) => {

  const [isClicked, setIsClicked] = useState(false);
  const [comm_txt, setComment] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    
    event.preventDefault();

    api.post("comments/", {
      postId: props.postId,
      authorId: props.authorId,
      date: new Date(),
      text: comm_txt
    }).then(() => props.setReload(true));

    setIsClicked(false);
  }

  return isClicked ? (
    <form onSubmit={handleSubmit}>

      <textarea contentEditable={true}
              className={classes.text_area}
              onChange={(event) => setComment(event.target.value)}/>

      <section style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={()=>setIsClicked(false)} 
                className={classes.button}>
                  Cancelar
        </button>

        <button type='submit'
                className={classes.button}
                style={{fontWeight: '800', fontSize:'1.3em'}}>
                  Enviar
        </button>
      </section>


    </form>
  ) : (
    <button onClick={()=>setIsClicked(true)} 
            className={classes.button} 
            style ={{margin: 'auto'}}>Adicionar comentário</button>
  );
};
