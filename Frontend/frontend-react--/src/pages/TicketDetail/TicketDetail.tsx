import { useParams } from "react-router-dom";
import axios  from "axios";
import {useState, useEffect} from 'react'
import styles from './TicketDetail.module.scss'
import vector1 from '../..//assets/Vector1.svg'
type Ticket = {
    id: number,
    title: string,
    description: string,
    status: string,
    username: string,
    name: string,
    assigned_to: string,
    comments: Comment[];
}
type Comment = {
    id: number,
    comment: string,
    createdAt: string;
}
const TicketDetail = () => {
    const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4002/api/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setTicket(res.data);
        setStatus(res.data.status);
    } catch (error) {
        console.error('Error while api fetching', error);
    }
  }


  const handleComment = async() => {
    if (!newComment.trim()) {
        alert('ENter comment');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        await axios.post( `http://localhost:4002/api/tickets/${id}/comment`,
            {content: newComment},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        setNewComment('');
        fetch()
    } catch (error) {
        console.error("errror while sending comment", error)
    }
  };

  const handleStatus = async(newStatus: string) => {
    try {
        const token = localStorage.getItem('token');
        await axios.patch(`http://localhost:4002/api/tickets/${id}/status`,
            {status: newStatus},
            {headers : {Authorization: `Bearer ${token}`}}
        );
        fetch();
    } catch (error) {
        console.error("error while changing comment ", error)
    }
  };
  if (!ticket) {
    return <div>Loading...</div>
  }

  const lastComments = ticket.comments.slice(-3).reverse();

  return (
    <div className={styles.container_2}>

        <div className={styles.container}>
                <div className={styles.barside}>
                    <div className={styles.tickets}>
                        <input type='checkbox'/> <p>Tickets</p>
                    </div>
                                    <hr style={{width: '80%', border: '1px solid #3c3b3b', margin: '0px'}}/>
                    <div className={styles.dashboard}>
                    <   input type='checkbox'/>  <p>Dashboard</p>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <h1>Ticket#{ticket.id}</h1>
                                
                            <div className={styles.selection}>
                            <select
                                    className={styles.selection1}
                                    value={status}
                                    onChange={(e) => {
                                        const newStatus = e.target.value;
                                        setStatus(newStatus);
                                        handleStatus(newStatus);
                                    }}
                                        >
                                        <option value='open'>opened</option>
                                        <option value='closed'>closed</option>
                                        <option value='in_progress'>in proccess</option>
                                        </select>

                            </div>
                                
                    </div>
                <hr style={{width: '100%'}}/>
                    
                    <div className={styles.under}>
                        <div className={styles.leftside}>
                            <div className={styles.user_info}>
                                <h3>{ticket.name}</h3>
                                <p>Issie wuth product</p>
                            </div>
                                <hr style={{width: '100%', margin: '0px'}}/>
                            <div className={styles.open_btn}>
                                <button style={{background: 'none', color: 'black',border: 'none', display: 'flex', justifyContent: 'space-between'}}>Open <img src={vector1}/></button>                             
                            </div>
                            <hr style={{width: '100%', margin: '0px'}}/>
                        </div>
                        <hr style={{width: '0px',height: '100%', margin: '20px'}}/>
                        <div className={styles.right_side}>
                            <p>Comments</p>
                          
                            <textarea
                                
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={4}
                            
                            ></textarea>
                            <input type="text" placeholder="add a commnet" className={styles.comment}/>
                            <button className={styles.comment_btn} onClick={handleComment} >Add Comment</button>
                        
                        </div>
                    </div>
                </div>

                
                    
                    

        </div>
            
    </div>
  )

}
export default TicketDetail;