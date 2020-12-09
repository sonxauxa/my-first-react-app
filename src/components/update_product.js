import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useState} from 'react';
import axios from "axios";


function UpdateProduct({item}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState(item.product_name);
    const [price, setPrice] = useState(item.product_price);
    const [detail, setDetail] = useState(item.product_detail);
    const [stock, setStock] = useState(item.product_in_stock);
    const [quantity, setQuantity] = useState(item.product_quantity)
    const [type, setType] = useState(item.product_type);
    const productName = (e) => {
        setName(e.target.value)
    };
    const productPrice = (e) => {
        setPrice(e.target.value)
    };
    const productDetail = (e) => {
        setDetail(e.target.value)
    };
    const productStock = (e) => {
        setStock(e.target.checked)
    };
    const productQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const productType = (e) => {
        setType(e.target.value)
    };
    const sendUpdate = () => {
        axios.put(`http://127.0.0.1:8000/change/${item.id}`, {
            'product_name': name,
            'product_price': price,
            'product_detail': detail,
            'product_in_stock': stock,
            'product_quantity': quantity,
            'product_type': type
        }).then(res => {
                console.log('a', res)
                document.getElementById('mes').innerHTML = res.data
            }
        ).catch((error) => {
                console.error('error', error)
            }
        );
    };
    return (
        <>
            <button className='btn btn-sm btn-success m-1' onClick={handleShow}>
                <i className="fa fa-pencil text-white">
                </i>
            </button>
            <Modal show={show} onHide={handleClose}>
                <div id='mes'>
                </div>
                <form key={item.id}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <td> Name:</td>
                                    <td><input defaultValue={item.product_name}
                                               onChange={productName}/></td>
                                </tr>
                                <tr>
                                    <td>price</td>
                                    <td><input defaultValue={item.product_price}
                                               onChange={productPrice}/></td>
                                </tr>
                                <tr>
                                    <td>Detail</td>
                                    <td><input defaultValue={item.product_detail}
                                               onChange={productDetail}/></td>
                                </tr>
                                <tr>
                                    <td>stock</td>
                                    <td><input type="checkbox" id={item.id} defaultChecked={stock}
                                               onChange={productStock}/></td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td><input defaultValue={item.product_quantity}
                                               onChange={productQuantity}/></td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td><input defaultValue={item.product_type}
                                               onChange={productType}/></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={sendUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
        ;
}

export default UpdateProduct;