"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { UpperBar } from "@/components/ui/UpperBar/UpperBar";
import { GenericPost } from "@/components/ui/GenericPost/GenericPost";
import { MiddleBar } from "@/components/ui/MiddleBar/MiddleBar";
import { UserProfile } from "@/components/ui/UserProfile/userprofile";
import { PostType, UserType } from "@/lib/custom_types";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import { PostModal } from "@/components/ui/PostModal";
import { Plus, PlusCircle, PlusCircleIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function MyProfile(){

  const user = useSession().data?.user;
  const [received_posts, setPosts] = useState<PostType[]>();
  const [date, setDate] = useState<string>("");
  const [numFollows, setNumFollows] = useState<number>(0);
  const [numFollowers, setNumFollowers] = useState<number>(0);
  const session = useSession();

  const getNumberFollows = async (userId?: string | null) => {
    try {
      let url, response, urlFollows;

      url = "/users/" + userId;

      urlFollows = url + "/follows";
      response = await api.get(urlFollows);
      setNumFollows(response.data.data.length);

      urlFollows = url + "/followers";
      response = await api.get(urlFollows);
      setNumFollowers(response.data.data.length);
    } catch (error) {
      console.error("Erro ao pegar dados do usuário: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session.data?.user.id) {
        await getNumberFollows(session.data?.user.id);
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    if (user) {
      api
        .get("users/" + user.id + "/posts/" + date)
        .then((response) => {
          if (response.status == 204) {
            setPosts([]);
          } else {
            setPosts(response.data.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user, date]);
  const [open, setOpen] = useState(false);

  if (!user || !received_posts) return null;

  const set_posts_date = received_posts.map((post) => {
    post.date = new Date(post.date);
    return post;
  });

  set_posts_date.sort(
    (post1, post2) => post2.date.getTime() - post1.date.getTime()
  );
  console.log(set_posts_date);

  const post_list = set_posts_date.map((post) => (
    <GenericPost key={post.id} post={post} />
  ));

  return (
    <div
      className={inter.className}
      style={{ backgroundColor: "var(--background-color)", height: "100%" }}
    >
      <UpperBar text="Meu perfil" />

      <section style={{ paddingTop: "90px" }}>
        <UserProfile
          userName={user.name}
          nickName={user.nickName}
          numFollow={numFollows}
          numFollowers={numFollowers}
          numPosts={post_list.length}
          userId={session.data?.user.id}
        />
      </section>

      <section>
        <MiddleBar setDate={setDate} />
        {post_list}
      </section>
      <div className="fixed bottom-8 right-8 bg-blue-500 border-2 border-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out">
        <Plus onClick={() => setOpen(true)} size={100} color="#fff" />
      </div>
      <PostModal open={open} setOpen={setOpen} />
    </div>
  );
}
