import { ReactNode } from 'react';
import classes from "./ListaUsuario.module.css"
import { UserProfile } from '../UserProfile/userprofile';
import { useRouter } from 'next/navigation';
import { SrvRecord } from 'dns';

interface ListaUsuarioProps {
    name: string
    nickName: string
    url: string
    id: string
}

export default function ListaUsuario({ name, nickName, url, id }: ListaUsuarioProps) {

    const router = useRouter();
    const UserProfile = () => {
        const url = `/user?id=${id}`;
        router.push(url);
    };

    return (
        <div className={`
            bg-white
            h-20
            mb-1
            flex
            items-center
         `}>
            <button className={classes.box} onClick={UserProfile}>
                <div className="ml-2 w-16 h-16 bg-purple-400 rounded-full mr-2"></div>
                <div>
                    <div className={classes.name}>
                        {name}
                    </div>
                    <div className={classes.nick}>
                        {nickName}
                    </div>    
                </div>
            </button>
        </div>
    )
}