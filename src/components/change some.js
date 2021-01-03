import React, {useState, useEffect} from "react";
import AddProduct from "./add_product";
import axios from "axios";

const URL = 'http://127.0.0.1:8000/list/';

function Rerun() {
    const [count, setCount] = useState(null)
    useEffect(() => {
        async function getData(){
            const res = axios.get('http://127.0.0.1:8000/list/');
            setCount(res)
        }
        console.log(count)
    },[count])
    return (
        <div>
            {count}
        </div>
    )
}

export default Rerun