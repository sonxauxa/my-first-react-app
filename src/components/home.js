import React, {useEffect} from 'react';
import Rerun from "./change some";

function Home() {
    useEffect(() => {
        if (localStorage.getItem('isLogged') === 'true') {
            window.location.reload()
            localStorage.removeItem('isLogged')
        }
    }, []);
    return (
        <div>
            <h2>Home</h2>
            <Rerun/>
        </div>

    );
}

export default Home;