import { memo } from 'react';
import type { FC } from 'react';
import classes from './MenuButton.module.css';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}

export const MenuButton: FC<Props> = memo(function MenuButton(props) {
  const router = useRouter();

  const MyProfileButton= () => {
    const url = `/home`;
    router.push(url);
  };
  
  return (
    <button className={classes.root}
            onClick={MyProfileButton}>
      <hr className={classes.line1}/>
      <hr className={classes.line1}/>
      <hr className={classes.line1}/>
    </button>
  );
});
