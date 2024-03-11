import { CommentType, UserType } from "@/lib/custom_types";
import { ProfilePicture } from "../../ProfilePicFrame/ProfilePicture";
import classes from './CommentBox.module.css'
import { FC, memo, useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Props {
    comment: CommentType;
}

export const CommentBox: FC<Props> = memo(function CommentBox(props){
    
    const [user, setUser] = useState<UserType>();
  
    useEffect(()=> {
  
      api.get("users/" + props.comment.authorId)
      .then(response => setUser(response.data.data))
      .catch(error => console.log(error))
  
    }, []);
  
    if(!user) return null
    
    return(
        <section style={{display: 'flex', marginBottom: '5%'}}>

            <ProfilePicture scale='8%'/>
            <section style={{marginLeft:'1%'}}>
                <div style={{position: 'relative', height: '50%'}}>
                    <span className={classes.author_nick}>{user.nickName}</span>
                    <span className={classes.post_date}>{props.comment.date.toLocaleString()}</span>
                </div>
                <div style={{position: 'relative'}}>
                    {props.comment.text}
                </div>
            </section>
        
        </section>
    );
});