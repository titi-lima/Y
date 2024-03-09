'use client'

import React, { useState } from 'react';
import classes from './CommentButton.module.css'

const CommentButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);


  return isClicked ? (
    <form>
      <div contentEditable className={classes.text_area}/>
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

export default CommentButton;
