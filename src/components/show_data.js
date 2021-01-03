import React from 'react';
import {useEffect, useState} from 'react';
import UpdateProduct from "./update_product";
import DeleteProduct from "./delete_product";
import '../App.css';
import AddProduct from "./add_product";
// import {Button} from "react-bootstrap";


const URL = 'http://127.0.0.1:8000/list/';

function ShowData() {
    useEffect(() => {
        sRequest().then(r => console.log('ok', r));
    });
    const [requestData, setRequestData] = useState([]);
    const sRequest = async () => {
        const sendRequest = await fetch(URL);
        const data = await sendRequest.json();
        setRequestData(data)
        console.log(requestData)
    };
    const isLoad = (item) => {
        if (requestData) {
            return <UpdateProduct item={item} id={item.id}/>

        } else {
            return <p>something wrong</p>
        }
    };
    const isDelete = (item) => {
        if (requestData) {
            return <DeleteProduct item={item}/>

        } else {
            return <p>something wrong</p>
        }
    };
    return (
        <div>
            <div className="container son">
                <table className="table table-hover my-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Detail</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Quantity</th>
                        <th style={{'width': '150px'}}>
                        </th>
                    </tr>
                    </thead>
                    {requestData.map(item => (
                        <tbody key={item.id}>
                        <tr>
                            <td>{item.product_name}</td>
                            <td>{item.product_detail}</td>
                            <td>{item.product_type}</td>
                            <td>{item.product_price}<span>$</span></td>
                            <td>
                                <div className='custom-control form-control-lg custom-checkbox son-checkbox'>
                                    <input type='checkbox' checked={item.product_in_stock}
                                           readOnly={true} className='custom-control-input' id={item.id}/>
                                    <label className='custom-control-label' htmlFor={item.id}>
                                    </label>
                                </div>
                            </td>
                            <td>{item.product_quantity}</td>
                            <td>
                                <div className='lookChange row' style={{'display': 'inline-block'}}>
                                    {isLoad(item)}
                                    {isDelete(item)}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className='add-product'>
                <AddProduct/>
            </div>

        </div>
    )
}

export default ShowData;