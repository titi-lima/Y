import { ReactNode } from 'react';
import classes from "./ListaUsuario.module.css"

interface ListaUsuarioProps {
    nome: string
    usuario: string
    url: string

}

export default function ListaUsuario({ nome, usuario, url }: ListaUsuarioProps) {
    return (
        <div className={`
            bg-white
            h-20
            mb-1
            flex
            items-center
         `}>
            <a href='www.teste.com'>
                <div className={classes.box}>
                    <div className="ml-2 w-16 h-16 bg-purple-400 rounded-full mr-2"></div>
                    <div>
                        <div className={classes.name}>
                            {nome}
                        </div>
                        <div className={classes.nick}>
                            {usuario}
                        </div>    
                    </div>
                </div>
            </a>
        </div>
    )
}