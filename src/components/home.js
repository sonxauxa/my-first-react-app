import React, {useEffect} from 'react';

function Home() {
    useEffect(() => {
        if (localStorage.getItem('isLogged') === 'true') {
            window.location.reload()
            localStorage.removeItem('isLogged')
        }
    },[]);
    return (
        <div>
            <h2>Home</h2>

        </div>

    );
}

export default Home;