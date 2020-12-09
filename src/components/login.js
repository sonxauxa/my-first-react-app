import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';

const MY_URL = 'http://127.0.0.1:8000/api/token/';

function Login() {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const userHandle = (event) => {
        setUserName(event.target.value)
    };
    const passHandle = (event) => {
        setPassWord(event.target.value)
    };
    const data = {'username': userName, 'password': passWord};
    const [message, setMessage] = useState('');

    if (localStorage.getItem('userToken')) {
        return <Redirect to='/'/>
    } else {
        const postRequest = (url = '', data = {}) => {
            const sendRequest = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }).then(response => response.json()).then(data => {
                console.log(data)
                if (data.access) {
                    localStorage.setItem('userToken', data.access)
                    history.push('/');
                } else {
                    setMessage(data.detail)
                }
            }).catch((error) => {
                console.error('error', error)
            });
            return sendRequest.json
        };
        const sendRequest = (event) => {
            event.preventDefault();
            postRequest(MY_URL, data)

        };
        return (
            <div className='container'>
                {message}
                <form>
                    <label>User name:</label><input name='username' type='text' onChange={userHandle}/> <br/>
                    <label>Password:</label><input name='username' type='password' onChange={passHandle}/><br/>
                    <button className='btn btn-danger' onClick={sendRequest}>submit</button>
                </form>
            </div>
        )
    }
}

export default Login;