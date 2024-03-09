import { CommentType, UserType } from "@/lib/custom_types";
import { ProfilePicture } from "../../ProfilePicFrame/ProfilePicture";
import classes from './CommentBox.module.css'
import { FC, memo, useEffect, useState } from "react";
import axios from "axios";

interface Props {
    comment: CommentType;
}

export const CommentBox: FC<Props> = memo(function CommentBox(props){
    
    const [user, setUser] = useState<UserType>();
  
    useEffect(()=> {
  
      axios.get("http://localhost:3001/users/" + props.comment.authorId)
      .then(response => setUser(response.data.data))
      .catch(error => console.log(error))
  
    }, []);
  
    if(!user) return null
    
    return(
        <section style={{display: 'flex', marginBottom: '5%'}}>

            <ProfilePicture scale='8%'/>
            <section style={{position: 'relative', left:'1%'}}>
                <span className={classes.author_nick}>{user.nickName}</span>
                <span className={classes.post_date}>{props.comment.date.toLocaleString()}</span>
                <div style={{marginTop:'10%'}}>{props.comment.text}</div>
            </section>

        </section>
    );
});

// export default CommentBox;