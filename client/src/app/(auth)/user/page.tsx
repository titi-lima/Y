"use client"

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UpperBar } from '../../../components/ui/UpperBar/UpperBar'
import '../../globals.css'
import { ProfilePicture } from '@/components/ui/ProfilePicFrame/ProfilePicture'
import { GenericPost } from '@/components/ui/GenericPost/GenericPost'
import classes from './MyProfile.module.css'
import { MiddleBar } from '@/components/ui/MiddleBar/MiddleBar'
import { UserProfile } from '@/components/ui/UserProfile/userprofile'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import FollowsButton from '@/components/ui/FollowsButton/FollowsButton';
import { PostType, UserType } from '@/lib/custom_types'
import axios from 'axios'
import { api } from '@/lib/api'

const inter = Inter({ subsets: ['latin'] })
const user_id = 'cltja5xsc000010ofm3k2pwix';

interface UserData {
  id: string;
  nickName: string;
  name: string;
  url: string;
}

export default function DraftPage({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserType>();
  const [received_posts, setPosts] = useState<PostType[]>();
  const [date, setDate] = useState<string>('');
  const [numFollows, setNumFollows] = useState<number>(0);
  const [numFollowers, setNumFollowers] = useState<number>(0);
  const [txtNavBar, setTxtNavBar] = useState<string>("");
  const [seguindo, setSeguindo] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const session = useSession();

  const getUser = async(userId?: string | null) => {
    try {
      let url, response, urlFollows
  
      url = "/users/" + userId
      response = await api.get(url)
      setUser(response.data.data)
      let txt = "Perfil de " + response.data.data.name
      setTxtNavBar(txt)

      urlFollows = url + "/follows"
      response = await api.get(urlFollows)
      setNumFollows(response.data.data.length)

      urlFollows = url + "/followers"
      response = await api.get(urlFollows)
      setNumFollowers(response.data.data.length)
      if (response.data.data.some((usuario: { id: string | null; }) => usuario.id == session.data?.user.id)) {
        setSeguindo(true)
      }
      else {
        setSeguindo(false)
      }  
        
    } catch (error) {
        console.error("Erro ao pegar dados do usuário: ", error)
    }
  }
  
  useEffect(() => {
      const fetchData = async () => {
          if (session.data?.user.id) {
              await getUser(id);
          }
      };
      fetchData();
  }, [session]);

  useEffect(()=> {

    axios.get("http://localhost:3001/users/" + id)
    .then(response => setUser(response.data.data))
    .catch(error => console.log(error))

  }, []);

  useEffect(()=> {

    axios.get("http://localhost:3001/users/"+ id + "/posts/" + date)
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
  console.log(seguindo)
  // let post_list = []
  const post_list = set_posts_date.map(post => <GenericPost post={post}/>);
  // if (seguindo) {
  // }

  return (

    <html lang="pt-br" style={{height: '100%'}}>

    <body   className={inter.className}
            style = {{backgroundColor: 'var(--background-color)', height: '100%'}}>
        {children}
        
        <UpperBar text={txtNavBar} />
        <section style={{marginTop: '90px'}}>
          <UserProfile userName={user.name} nickName={user.nickName} numFollow={numFollows} numFollowers={numFollowers} numPosts={post_list.length} userId={id}/>
          <FollowsButton id={id}></FollowsButton>
          <MiddleBar setDate={setDate}/>
        </section>

        <section >
          { seguindo == true ? post_list : null }
        </section>
   
    </body>

    </html>
  )
}

// const Bla = () => {
//   return(
//     <section>
//       <button onClick={()=> console.log("Clicou")}>

//       </button>
//     </section>
//   )
// }
// export default Bla;