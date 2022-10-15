import './Register.scss'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterNewUser, getUserAccount } from '../../services/userService'
const Register = (props) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUserName: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput)

    const history = useHistory();
    useEffect(() => {
        // axios.get('http://localhost:8080/api/v1/test-api').then((data) => {
        //     console.log('>>> check data', data);
        // })

    }, []);
    const handleLogin = () => {
        history.push('/Login')
    }
    const isValidInput = () => {
        setObjCheckValid(defaultValidInput);
        if (!email) {
            toast.error('Email is required');
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        var regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false })
            toast.error('Please enter a valid email address');
            return false;
        }
        if (!phone) {
            setObjCheckValid({ ...defaultValidInput, isValidPhone: false })
            toast.error('Phone is required');
            return false;

        }
        if (!username) {
            setObjCheckValid({ ...defaultValidInput, isValidUserName: false })
            toast.error('Username is required')
            return false;

        }
        if (!password) {
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false })
            toast.error('Password is required')
            return false;
        }
        if (password !== confirmPassword) {
            setObjCheckValid({ ...defaultValidInput, isValidConfirmPassword: false })
            toast.error('ConfirmPassword is required');
            return false;

        }

        return true;
    }
    const handleRegister = async () => {
        let check = isValidInput()
        if (check) {
            let res = await RegisterNewUser(email, phone, username, password);
            let serverData = res;
            if (serverData && serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push('/Login')

            } else {
                toast.error(serverData.EM);
            }
            console.log('>>>chekc ', res);
        }
    }
    return (
        <div className='Register-container'>
            <div className='container mt-sm-5 my-auto px-3 px-sm-0 "'>
                <div className='row '>
                    <div className='content-left  col-0 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            React JS
                        </div>
                        <div className='detail'>
                            React JS helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className='content-right col-11 col-sm-5  d-flex flex-column gap-3 py-3 mx-sm-0 mx-3 '>
                        <div className='brand d-block d-sm-none'>
                            React JS
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type='text'
                                className={objCheckValid.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input type='text'
                                className={objCheckValid.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Phone Number'
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Username</label>
                            <input type='text'
                                className={objCheckValid.isValidUserName ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Username'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password'
                                className={objCheckValid.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> Er-enter password</label>
                            <input type='password'
                                className={objCheckValid.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Er-enter password'
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >Register</button>

                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'
                                onClick={() => handleLogin()}
                            >Already've an account . Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;