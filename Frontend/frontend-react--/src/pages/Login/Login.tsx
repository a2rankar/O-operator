
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


type LoginFormData = {
  username: string;
  password: string;
};


 const Login = () => {
const navigate  = useNavigate();


  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
        const res = await axios.post('http://localhost:4002/api/login', data,)
        const token = res.data.token;
        if (token) {
            localStorage.setItem('token', token);
            console.log('success');
            navigate('/tickets')
        } else {
            console.error('no toekn')
        }
    } catch (error) {
        console.error('Login error: ', error)
    }

  };

    return (
      
            <div className={styles.modal}>
                <form onSubmit={handleSubmit (onSubmit)}>
                        <h2>Login</h2>
                        <p>Enter your credentials to access<br></br>
                            your account. </p>
                            <div className={styles.input_cont}>
                                <input type="email" placeholder="Email"
                                    {...register('username', {required: 'Email id reequireed'})}/>
                                        {errors.username && <p>{errors.username.message}</p>}
                                <input type="password" placeholder="Password"
                                    {...register('password', {required: 'Password is wrong '})}/>
                                        {errors.password && <p>{errors.password.message}</p>}
                            </div>
                        <button type="submit" className={styles.login}>Login</button>
                </form>
            </div>

    )
}


export default Login;