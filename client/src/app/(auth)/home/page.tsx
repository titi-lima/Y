"use client"

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import { UpperBar } from '@/components/ui/UpperBar/UpperBar'
import { GenericPost } from '@/components/ui/GenericPost/GenericPost'
import { MiddleBar } from '@/components/ui/MiddleBar/MiddleBar'
import { UserProfile } from '@/components/ui/UserProfile/userprofile'
import { PostType, UserType } from '@/lib/custom_types'
import {useSession } from 'next-auth/react';
import { api } from '@/lib/api';


const inter = Inter({ subsets: ['latin'] });


export default function MyProfile(){

  const user = useSession().data?.user;
  const [received_posts, setPosts] = useState<PostType[]>();
  const [date, setDate] = useState<string>('');

  useEffect(()=> {
    if(user){
      api.get("users/"+ user.id + "/posts/" + date)
      .then(response => {
        if(response.status == 204){
          setPosts([]);
        }
        else{
          setPosts(response.data.data);
        }
      })
      .catch(error => console.log(error));
    }
  }, [user, date]);

  if(!user || !received_posts) return null
  
  const set_posts_date = received_posts.map(post => {
    post.date = new Date(post.date);
    return post;
  });

  set_posts_date.sort((post1, post2) => post2.date.getTime() - post1.date.getTime());
  console.log(set_posts_date);

  const post_list = set_posts_date.map(post =>
    <GenericPost key={post.id} post={post}/>
  );
  
  return (

    // <html lang="pt-br" style={{height: '100%'}}>

    <body   className={inter.className}
           style = {{backgroundColor: 'var(--background-color)', height: '100%'}}>
          
        
        <UpperBar text="Meu perfil" />
        
        <section style={{marginTop: '90px'}}>
          <UserProfile userName={user.name} nickName={user.nickName} numFollow={10} numFollowers={10} numPosts={post_list.length}/>
        </section>
        
        <section >
          <MiddleBar setDate={setDate}/>
          {post_list}
        </section>
   
   </body>

    //</html>

  )
}