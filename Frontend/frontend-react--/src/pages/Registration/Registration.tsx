
import styles from './Registration.module.scss';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


type registrationFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  name: string;
};


 const Registration = () => {

  const navigate  = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<registrationFormData>();

  const onSubmit = async (data: registrationFormData) => {
    if (data.password !== data.confirmPassword) {
        alert('not same password symbhols ')
        return;
    }

    try {
        const res = await axios.post('http://localhost:4002/api/registration',{

        
            username: data.email,
            password: data.password,
            role: data.role,
            name: data.name,
            }
        )
            console.log('Regsitration data: ', res.data)
            navigate('/login')
    } catch (error) {
        if (axios.isAxiosError(error)) {
  console.error('Registration error:', error.response?.data);
  alert(error.response?.data?.error || 'Registration failed');
} else {
  console.error(error);
}

        console.error('Regsitration error: ', error)
    }

  };

    return (
      
            <div className={styles.modal}>
                <form className={styles.form} onSubmit={handleSubmit (onSubmit)}>
                        <h2>Registration</h2>
                        <p>Enter your credentials to access<br></br>
                            your account. </p>
                            <div className={styles.input_cont}>
                                <input type="email" placeholder="Email"
                                    {...register('email', {required: 'Email id reequireed'})}/>
                                        {errors.email && <p>{errors.email.message}</p>}
                                <input type="text" placeholder="Name"
                                    {...register('name', {required: 'name id reequireed'})}/>
                                        {errors.name && <p>{errors.name.message}</p>}        
                                <input type="password" placeholder="Password"
                                    {...register('password', {required: 'Password is wrong '})}/>
                                        {errors.password && <p>{errors.password.message}</p>}
                                <input type='password' placeholder='confirm password'
                                    {...register('confirmPassword', {required: 'Confrim your password'})}/>
                                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                                <select {...register('role', {required: 'role is re rquiered '})}>
                                    <option value='' disabled>
                                        Select role
                                    </option>
                                    <option value='operator'>Operator</option>
                                    <option value='supervisor'>Supervisor</option>
                                </select>
                            </div>
                        <button type="submit" className={styles.login}>Registration</button>
                </form>
            </div>

    )
}


export default Registration;