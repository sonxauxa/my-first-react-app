import React, {useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import InputNumber from "react-input-number";

function AddProduct() {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        window.location.reload()
    };
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(99999.0);
    const [detail, setDetail] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('family');

    const productName = (event) => {
        setName(event.target.value)
    };
    const productDetail = (e) => {
        setDetail(e.target.value)
    };

    const productType = (event) => {
        setType(event.target.value)
    };
    const sendUpdate = () => {
        axios.post(`http://127.0.0.1:8000/list/`, {
            'product_name': name,
            'product_price': price,
            'product_detail': detail,
            'product_quantity': quantity,
            'product_type': type
        }).then(res => {
                document.getElementById('mes1').innerHTML = Object.values(res.data)
            }
        )
    };
    return (
        <>
            <button className='btn btn-sm btn-success m-1' onClick={handleShow}>
                <i className="fa fa-pencil text-white">
                </i>
            </button>
            <Modal show={show} onHide={handleClose}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input onChange={productName} placeholder='product name'/>
                        <br/>
                        <InputNumber min={10} max={100000} step={0.03} value={price} onChange={setPrice}/>
                        <br/>
                        <input onChange={productDetail}/>
                        <br/>
                        <InputNumber value={quantity} onChange={setQuantity}/>
                        <label>
                            Pick Type:
                            <select value={type} onChange={productType}>
                                <option value="family">family</option>
                                <option value="indie">indie</option>
                                <option value="actions">actions</option>
                                <option value="adventure">adventure</option>
                            </select>
                        </label>
                        <br/>
                        <strong style={{'color': 'red', 'font-style': 'italic'}} id='mes1'>
                        </strong>
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
    );
}

export default AddProduct;