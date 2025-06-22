import { useEffect, useState } from 'react';
import styles from './Tickets.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Ticket = {
    id: number;
    title: string;
    description: string;
    status: string;
    username: string;
    name: string;
    assigned_to: string;
}

const TicketLists = () => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const[name, setName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
      // Отфильтруем последние три тикета
    const lastThreeTickets = tickets.slice(-3);
    const navigate = useNavigate();
  const handleTicketClick = (ticketId: number) => {
    
    navigate(`/ticketDetail/${ticketId}`);
  };
    useEffect(() => {
            fetch()
        }, [])
        const fetch = async() => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4002/api/tickets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             });
             console.log('Fetched tickets:', res.data);

            setTickets(res.data.tickets || res.data);

            } catch(error) {
                console.error('Error of getting data', error);
            }
        };

    const createTicket = async () => {
        if (!title.trim()) {
            alert('Zapolnite pole')
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4002/api/tickets',   
                    {title,  description, username, name},
                    {headers : {Authorization: `Bearer ${token}`}}
            );
            setTitle('');
            setDescription('');
            setUsername('')
            setName('')
            setShowForm(false);
        } catch (error) {
            alert('Error while creating ticket')
        } finally {
        setLoading(false);
    }

    
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.barside}>
                <div className={styles.tickets}>
                    <input type='checkbox'/> <p>Tickets</p>
                </div>
                <div className={styles.dashboard}>
                <   input type='checkbox'/>  <p>Dashboard</p>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>Tickets</h1>
                                <button onClick={() => setShowForm(!showForm)}>
                                    {showForm ? 'Отмена' : 'Создать тикет'}
                                </button>  
                        <div className={styles.selection}>
                            <select  className={styles.selection1}>
                                    <option value='' disabled className={styles.option}>
                                            Status     
                                    </option>
                                    <option value='open'>opened</option>
                                    <option value='close'>closed</option>
                                    <option value='inProccess'>in proccess</option>
                            </select>
                            <input type='search' placeholder='Search'/>
                        </div>
                                            {showForm && (
                            <div className={styles.ticketForm}>
                                <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                />
                                
                                {/* <textarea
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                /> */}
                                <button onClick={createTicket} disabled={loading}>
                                {loading ? 'Создаём...' : 'Создать'}
                                </button>
                            </div>
                            )}
            </div>

                <hr className={styles.line}/>

                <div className={styles.main_head}>
                    <p>Title</p>
                    <p>Customer</p>
                    <p>Status</p>
                </div>
                <div className={styles.set}>
                    {lastThreeTickets.map ((ticket)  => (
                       <div key={ticket.id} className={styles.row} onClick={() =>
                        handleTicketClick(ticket.id)}
                        style={{cursor: 'pointer'}}
                       >
                            <div className={styles.qw}>
                                <p>{ticket.title}</p>
                            </div>
                            <div className={styles.qw}>
                                <p>{ticket.name}</p>
                            </div>
                            <div className={styles.qw}>
                                <p>{ticket.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      
        </div>
        
    )
}
 export default TicketLists;