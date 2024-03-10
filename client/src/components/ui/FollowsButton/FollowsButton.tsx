"use client"

import { ReactNode } from 'react';
import React, { useState } from 'react';
import classes from "./FollowsButton.module.css"
import { UserProfile } from '../UserProfile/userprofile';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import { SrvRecord } from 'dns';
import { api } from '@/lib/api'
import { useEffect } from "react";
import { useSession } from 'next-auth/react';

interface UserData {
    id: string;
    nickName: string;
    name: string;
    url: string;
}

interface FollowsButtonProps {
    id: string | null  | undefined
}

export default function FollowsButton( {id}: FollowsButtonProps ) {

    const buttonClick = async () => {
        // const session = useSession(); 
        let sessionId = session.data?.user.id
        if (buttonString == "Seguir usuário") {
            try {
                let url, response
                url = "/users/" + sessionId + "/follows"
                response = await api.post(url, {
                    // data: {
                        followsId: id
                    // }
                });
                setButtonString("Deixa de seguir")
            } catch (error) {
                console.error("Erro ao tentar parar de seguir usuário: ", error)
            }
        }
        else if (buttonString == "Deixa de seguir") {
            try {
                let url, response
                url = "/users/" + sessionId + "/follows"
                response = await api.delete(url, {
                    data: {
                        removeFollowsId: id
                    }
                });
                setButtonString("Seguir usuário")
            } catch (error) {
                console.error("Erro ao tentar começar a seguir usuário: ", error)
            }
        }
    };

    const getUser = async(userId?: string | null) => {
        try {
            let url, response
        
            url = "/users/" + userId
            response = await api.get(url)
            setUser(response.data.data)
            
        } catch (error) {
            console.error("Erro ao pegar dados do usuário: ", error)
        }
    }

    const setStringButton = async(sessionId: string, userId: string | null | undefined) => {
        try {
            let url, response
            let seguindo = []

            url = "/users/" + sessionId + "/follows"
            response = await api.get(url)
            seguindo = response.data.data

            if (seguindo.some((usuario: { id: string | null; }) => usuario.id == userId)) {
                setButtonString("Deixa de seguir")
            }
            else {
                setButtonString("Seguir usuário")
            }            
        } catch (error) {
            console.error("Erro ao pegar dados do usuário: ", error)
        }
    }
        
    const [user, setUser] = useState<UserData>();
    const [buttonString, setButtonString] = useState("")
    const session = useSession();   
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            if (session.data?.user.id) {
                await getUser(id);
                await setStringButton(session.data.user.id, id)
            }
        };
        fetchData();
    }, [session]);

    return (
        <button className={classes.box} onClick={buttonClick}>
            {buttonString}
        </button>
    )
}