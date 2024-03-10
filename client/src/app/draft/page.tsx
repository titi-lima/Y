"use client"

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UpperBar } from '../../components/ui/UpperBar/UpperBar'
import { ProfilePicture } from '@/components/ui/ProfilePicFrame/ProfilePicture'
import { GenericPost } from '@/components/ui/GenericPost/GenericPost'
import classes from './MyProfile.module.css'
import { MiddleBar } from '@/components/ui/MiddleBar/MiddleBar'
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/components/ui/UserProfile/userprofile'
import { PostType, UserType } from '@/lib/custom_types'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

export default function DraftPage({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const nickName = "Joao";

  const testeButton = () => {
    const url = `/FollowsList?nickName=${nickName}`;
    router.push(url);
  };



  const [user, setUser] = useState<UserType>();
  const [received_posts, setPosts] = useState<PostType[]>();
  const [date, setDate] = useState<string>('');

  useEffect(()=> {

    axios.get("http://localhost:3001/users/cltja5xsc000010ofm3k2pwix")
    .then(response => setUser(response.data.data))
    .catch(error => console.log(error))

  }, []);

  useEffect(()=> {

    axios.get("http://localhost:3001/users/cltja5xsc000010ofm3k2pwix/posts/" + date)
    .then(response => {
      if(response.status == 204){
        setPosts([]);
      }
      else{
        setPosts(response.data.data);
      }
    })
    .catch(error => console.log(error))

  }, [date]);

  if(!user || !received_posts) return null
  
  const set_posts_date = received_posts.map(post => {
    post.date = new Date(post.date);
    return post;
  });

  set_posts_date.sort((post1, post2) => post2.date.getTime() - post1.date.getTime());
  console.log(set_posts_date);

  const post_list = set_posts_date.map(post => <GenericPost post={post}/>);
  
  return (

    <html lang="pt-br" style={{height: '100%'}}>

    <body   className={inter.className}
            style = {{backgroundColor: 'var(--background-color)', height: '100%'}}>
        {children}
        
        <UpperBar text="Meu perfil" />
        <section style={{position: 'relative', height :  '40%', top : '15%'}}>
          <UserProfile userName='lucas' nickName='luke' numFollow={10} numFollowers={10} numPosts={1}/>
          <MiddleBar setDate={setDate}/>
        </section>

        {/* <section style={{position: 'relative', height: '50%'}}>
          <ProfilePicture top = "30%" left = "5%" scale = "20%"/>
          <div className={classes.name}>{user.name}</div>
          <div className={classes.nick}>{user.nickName}</div>
        </section> */}

        {/* <MiddleBar setDate={setDate}/> */}
        
        <section style = {{position: 'relative', height: '100%'}} >
          {post_list}
        </section>
   
    </body>

    </html>

  )
}