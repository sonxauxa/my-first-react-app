import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function SignUp() {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';    const history = useHistory();
    const API_URL = 'http://127.0.0.1:8000/regis/';
    const [username1, setUsername] = useState('');
    const [password1, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value)
    };
    function handleUsername(event) {
        setUsername(event.target.value)
    }
    const handlePassword2 = (event) => {
        setPassword2(event.target.value)
    };
    const handleEmail = (event) => {
        setEmail(event.target.value)
    };
    const handleFirstName = (event) => {
        setFirstname(event.target.value)
    };
    const handleLastName = (event) => {
        setLastname(event.target.value)
    };
    const checkPassword = (pass1, pass2) => {
        return pass1 === pass2;
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (checkPassword(password1, password2)) {
            axios.post(API_URL, {
                'username': username1,
                'email': email,
                'password': password2,
                'first_name': firstname,
                'last_name': lastname,
            }).then(res => {
                    console.log(res.data);
                    // console.log({res})
                    // history.push('login/')
                }
            ).catch((error) => {
                    console.error('error', error.data)
                }
            )

        } else {
            console.log('check your password')
        }
    };
    return (
        <div className='container'>
            Sign up page

            <form>
                <input type='text' onChange={handleUsername} placeholder='username'/><br/>
                <input type='email' onChange={handleEmail} placeholder='email'/><br/>
                <input type='text' onChange={handleFirstName} placeholder='firstname'/><br/>
                <input type='text' onChange={handleLastName} placeholder='lastname'/><br/>
                <input type='password' onChange={handlePassword} placeholder='password' autoComplete='password'/><br/>
                <input type='password' onChange={handlePassword2} autoComplete='password2'
                       placeholder='confirm password'/><br/>
                <button className='btn btn-danger' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;