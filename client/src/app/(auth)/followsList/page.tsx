"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { UpperBar } from "../../../components/ui/UpperBar/UpperBar";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ListaUsuario from "@/components/ui/Lista/ListaUsuario";
import classes from "./MyProfile.module.css";
import { api } from "@/lib/api";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

interface UserData {
  id: string;
  nickName: string;
  name: string;
  url: string;
}

const FollowsList = () => {
  const getFollows = async (id?: string | null | undefined) => {
    try {
      let url, response;
      let seguindo = [];

      url = "/users/" + id + "/follows";
      response = await api.get(url);
      seguindo = response.data.data;

      setArraySeguindoBruto(seguindo);
      setArraySeguindo(seguindo);
    } catch (error) {
      console.error("Erro ao buscar seguindo: ", error);
    }
  };

  const getFollowers = async (id?: string | null | undefined) => {
    try {
      let url, response;
      let seguidores = [];

      url = "/users/" + id + "/followers";
      response = await api.get(url);
      seguidores = response.data.data;

      setArraySeguidoresBruto(seguidores);
      setArraySeguidores(seguidores);
    } catch (error) {
      console.error("Erro ao buscar seguidores: ", error);
    }
  };

  const getNavBar = async (userId?: string | null) => {
    try {
      let url, response, urlFollows;

      url = "/users/" + userId;
      response = await api.get(url);
      let txt = "Lista de " + response.data.data.name;
      setTxtNavBar(txt);
    } catch (error) {
      console.error("Erro ao pegar dados do usuário: ", error);
    }
  };

  const session = useSession();
  const searchParams = useSearchParams();
  const nick = searchParams.get("nickName");
  const userId = searchParams.get("id");

  console.log(userId);

  const [arraySeguidoresBruto, setArraySeguidoresBruto] = useState<UserData[]>(
    []
  );
  const [arraySeguindoBruto, setArraySeguindoBruto] = useState<UserData[]>([]);
  const [arraySeguidores, setArraySeguidores] = useState<UserData[]>([]);
  const [arraySeguindo, setArraySeguindo] = useState<UserData[]>([]);
  const [txtNavBar, setTxtNavBar] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (session.data?.user.id) {
        await getFollows(userId);
        await getFollowers(userId);
        await getNavBar(userId);
      }
    };
    fetchData();
  }, [session]);

  const filterUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(arraySeguidoresBruto);
    console.log(arraySeguindoBruto);
    const value = event.target.value.toLowerCase();
    const arraySeguidoresTemp = arraySeguidoresBruto.filter((user) =>
      user.nickName.toLowerCase().includes(value)
    );
    const arraySeguindoTemp = arraySeguindoBruto.filter((user) =>
      user.nickName.toLowerCase().includes(value)
    );
    setArraySeguidores(arraySeguidoresTemp);
    setArraySeguindo(arraySeguindoTemp);
  };

  const [selectedOption, setSelectedOption] = useState("seguindo");

  const handleOptionClick = (option: string) => {
    console.log(arraySeguindo);
    console.log(arraySeguidores);
    setSelectedOption(option);
  };

  return (
    <div
      className={inter.className}
      style={{ backgroundColor: "var(--background-color)", height: "100%"}}
    >
      <div className={classes.mainBackgroud}>
        <UpperBar text={txtNavBar} />
        <div className={classes.name}>{nick}</div>
        <div className={classes.search_box}>
          <input
            type="text"
            className={classes.search_text}
            placeholder="Search"
            onChange={filterUser}
          ></input>
        </div>
        <div className={classes.selection}>
          <button
            className={
              selectedOption === "seguindo" ? classes.box_selected : classes.box
            }
            onClick={() => handleOptionClick("seguindo")}
          >
            Seguindo
          </button>
          <button
            className={
              selectedOption === "seguidores"
                ? classes.box_selected
                : classes.box
            }
            onClick={() => handleOptionClick("seguidores")}
          >
            Seguidores
          </button>
        </div>
        <div className={classes.whiteBox}></div>
        <div>
          {selectedOption == "seguindo"
            ? arraySeguindo.map((usuario) => {
                return (
                  <ListaUsuario
                    name={usuario.name}
                    nickName={usuario.nickName}
                    id={usuario.id}
                    url={usuario.url}
                    key={usuario.id}
                  ></ListaUsuario>
                );
              })
            : arraySeguidores.map((usuario) => {
                return (
                  <ListaUsuario
                    name={usuario.name}
                    nickName={usuario.nickName}
                    id={usuario.id}
                    url={usuario.url}
                    key={usuario.id}
                  ></ListaUsuario>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default FollowsList;
