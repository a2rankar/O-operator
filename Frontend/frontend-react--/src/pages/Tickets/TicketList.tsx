import { useEffect, useState } from 'react';
import styles from './Tickets.module.scss'
import axios from 'axios';

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
        if (!title.trim() || !description.trim()) {
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
               <input type='checkbox'/>
               <input type='checkbox'/>
            </div>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>Tickets</h1>
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Отмена' : 'Создать тикет'}
                    </button>       
                        <div className={styles.selection}>
                            <select >
                                    <option value='' disabled>
                                        Select role
                                    </option>
                                    <option value='operator'>Operator</option>
                                    <option value='supervisor'>Supervisor</option>
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
               <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button onClick={createTicket} disabled={loading}>
              {loading ? 'Создаём...' : 'Создать'}
            </button>
          </div>
        )}
                </div>

                <div className={styles.line}/>

                <div className={styles.main_head}>
                    <p>Title</p>
                    <p>Customer</p>
                    <p>Status</p>
                </div>
                <div className={styles.set}>
                    {tickets.map ((ticket)  => (
                       <div key={ticket.id} className={styles.row}>
                            <p>{ticket.title}</p>
                            <p>{ticket.name}</p>
                            <p>{ticket.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
 export default TicketLists;