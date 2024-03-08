"use client"
import React, { useState } from 'react';
import ListaUsuario from '@/components/ui/Lista/ListaUsuario';
import classes from './MyProfile.module.css'
import { UpperBar } from '../../components/ui/UpperBar/UpperBar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const FollowsList = () => {
    let arraySeguindoBruto = [{nome: "Luis", nickName: "LuisF"}, {nome: "Tiago", nickName: "Titi"}, {nome: "Luan Jardim", nickName: "LuanGarden"}]
    let arraySeguidoresBruto = [{nome: "Pedro coelho", nickName: "PedroNC2"}, {nome: "Luis", nickName: "LuisF"}, {nome: "Tiago", nickName: "Tiati"}]

    const [selectedOption, setSelectedOption] = useState('seguindo');
    let [arraySeguidores, setArraySeguidores] = useState(arraySeguidoresBruto)
    let [arraySeguindo, setArraySeguindo] = useState(arraySeguindoBruto)


    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const filterUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const arraySeguidoresTemp = arraySeguidoresBruto.filter(user => user.nickName.toLowerCase().includes(event?.target.value.toLowerCase()));
        const arraySeguindoTemp = arraySeguindoBruto.filter(user => user.nickName.toLowerCase().includes(event?.target.value.toLowerCase()));

        setArraySeguidores(arraySeguidoresTemp)
        setArraySeguindo(arraySeguindoTemp)
    }

    return(
        <html lang="pt-br" style={{height: '100%'}}>
            <body   className={inter.className}
            style = {{backgroundColor: 'var(--background-color)', height: '100%'}}>
                <div className={classes.mainBackgroud}>
                    <UpperBar text="Minha Lista" />
                    <div className={classes.name}>BrenoM</div>
                    <div className={classes.search_box}>
                        <input type="text" className={classes.search_text} placeholder="Search" onChange={filterUser}></input>
                    </div>
                    <div className={classes.selection}>
                        <button
                            className={selectedOption === 'seguindo' ? classes.box_selected : classes.box}
                            onClick={() => handleOptionClick('seguindo')}
                        >
                            Seguindo
                        </button>
                        <button
                            className={selectedOption === 'seguidores' ? classes.box_selected : classes.box}
                            onClick={() => handleOptionClick('seguidores')}
                        >
                            Seguidores
                        </button>
                    </div>
                    <div className={classes.whiteBox}>
                    </div>
                    <div>
                    {
                        selectedOption == "seguindo" ? (
                            arraySeguindo.map((usuario) => {
                                return <ListaUsuario nome={usuario.nome} usuario={usuario.nickName} url="asd" key={usuario.nickName}></ListaUsuario>
                            })
                        ) : (
                            arraySeguidores.map((usuario) => {
                                return <ListaUsuario nome={usuario.nome} usuario={usuario.nickName} url="asd" key={usuario.nickName}></ListaUsuario>
                            })
                        )
                    }
                    </div>
                </div>
            </body>
        </html>
    );
};

export default FollowsList;