import './login.scss'
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { LoginUser } from '../../services/userService';
import { UserContext } from '../../Context/UserContext';

function Login(props) {
    const { loginContext, user } = useContext(UserContext);
    const history = useHistory();
    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const defaultValidInput = {
        isValueLogin: true,
        isValidPassword: true

    }
    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);


    const handleClickNewUser = () => {
        history.push('/register')
    }
    const isValidInput = () => {
        // check email
        if (!valueLogin) {
            toast.error('Please enter your email address or phone number');
            setObjCheckValid({ ...defaultValidInput, isValueLogin: false })
            return false
        }
        // check password
        if (!password) {
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false })
            toast.error('Please enter your password');
            return false;
        }
        if (password.length < 4) {
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false })
            toast.error('Your password must have more than 3 letters')
            return false
        }
        return true

    }
    const handleClickLogin = async () => {
        setObjCheckValid(defaultValidInput)
        let check = isValidInput()
        if (check) {
            let res = await LoginUser(valueLogin, password);
            console.log('>>check data', res);
            if (res && res.EC === 0) {
                let groupWithRoles = res.DT.groupWithRoles;
                let email = res.DT.email;
                let username = res.DT.username;
                let data = {
                    isAuthenticated: true,
                    token: 'fake token',
                    account: { groupWithRoles, email, username }
                }

                // sessionStorage.setItem('account', JSON.stringify(data))
                loginContext(data)
                history.push('/users')


                toast.success(res.EM);
            } else {
                toast.error(res.EM);
            }
        }
    }
   
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleClickLogin();
        }
    }
    return (
        <div className='login-container'>
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
                        <input
                            type='text'
                            value={valueLogin}
                            className={objCheckValid.isValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email address or phone number'
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            type='password'
                            value={password}
                            className={objCheckValid.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password'
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button
                            className='btn btn-primary'
                            onClick={() => handleClickLogin()}
                        >Login</button>
                        <a className='text-center forgot-password' >Forgot your password</a>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'
                                onClick={() => handleClickNewUser()}
                            >Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;