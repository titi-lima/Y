'use client'
import { memo, useState } from 'react';
import type { Dispatch, FC, SetStateAction } from 'react';
import classes from './MiddleBar.module.css';


interface Props {
  text?: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export const MiddleBar: FC<Props> = memo(function MiddleBar(props) {
  
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    
    event.preventDefault();
    
    if((year+month+day)===''){
      props.setDate('');
    }
    else{
      const chosen_date = new Date(year+'-'+month+'-'+day+'-00:00:00');
      props.setDate(chosen_date.toUTCString());
    }
  }
  
  return (
    <div style={{height: '20%'}}>
      <div className= {classes.rowBox}>
  
      <button className={classes.option}>Histórico de Postagens</button>
        <button className={classes.option}>Sobre</button>
      </div>
      
      <div className={classes.centre}>
        <form className={classes.date_blocks}
              onSubmit={handleSubmit}>
          
          <button className={classes.button}
                  type='submit'>
            Buscar postagens:
          </button>
          
          <section className={classes.date_blocks}>
            <label htmlFor='day'>Dia</label>
            <input id='day' className={classes.num_box}
                      type='number'
                      onChange={(event) => setDay(event.target.value)}/>
          </section>

          <section className={classes.date_blocks}>
            <label htmlFor='month'>Mês</label>
            <input id='month' className={classes.num_box}
                      type='number'
                      onChange={(event) => setMonth(event.target.value)}/>
          </section>

          <section className={classes.date_blocks}>
            <label htmlFor='year'>Ano</label>
            <input id='year' className={classes.num_box}
                      type='number'
                      onChange={(event) => setYear(event.target.value)}/>
          </section>
        
        </form>
      </div>

    </div>
  );
});
