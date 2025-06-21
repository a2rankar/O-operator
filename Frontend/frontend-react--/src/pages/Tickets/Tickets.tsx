import styles from './Tickets.module.scss'

const Tickets = () => {
    return (
        <div className={styles.container}>
            <div className={styles.barside}>
               <input type='checkbox'/>
               <input type='checkbox'/>
            </div>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>Tickets</h1>
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
                </div>
                <div className={styles.main_head}>
                    <p>Title</p>
                    <p>Customer</p>
                    <p>Status</p>
                </div>
                     <hr className={styles.divider} />
                <div className={styles.set}>

                </div>
            </div>
        </div>
    )
}
 export default Tickets;