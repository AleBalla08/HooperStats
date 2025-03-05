import '../comps_styles/appStyles.css'
import { useEffect, useState } from "react";

function DoneSessions(){
    const [doneSessions, setDoneSessions] = useState<any | null>(null);

    useEffect(() => {
        const getDoneSessions = (): any | null => {
            const storedSessions = localStorage.getItem('doneSessions');

            if (!storedSessions) return null;
            return JSON.parse(storedSessions);
        };

        setDoneSessions(getDoneSessions());
    }, []);



    return (
        <>
            <h3 className='done-sessions_title'>Treinos</h3>
            <h5 className='done-sessions-subtitle'>Treinos concluídos aparecerão aqui</h5>
            <ul className='done-sessions_list'>
                {doneSessions && doneSessions.map((session: any, index: number) => (
                    <li className='donse-sessions_item' key={index}>{session.name} - {session.duration} segundos</li>
                ))}
            </ul>
            <div className='limpar-treinos'>
                <button>Limpar Treinos</button>
            </div>
        </>
    )
}

export default DoneSessions