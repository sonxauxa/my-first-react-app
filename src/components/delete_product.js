import React, {useState} from "react";
import {Modal, Button} from 'react-bootstrap';
import axios from "axios";



function DeleteProduct({item}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const sendDelete = () => {
        axios.delete(`http://127.0.0.1:8000/change/${item.id}`)
            .then(res => {
                window.location.reload()
            }).catch((error) => {
            console.error('error', error)
        });
    };

    return (
        <>
            <button className='btn btn-sm btn-danger m-1' onClick={handleShow}>
                <i className="fa fa-trash-o">
                </i>
            </button>
            <Modal show={show} onHide={handleClose}>
                <p id='message'>
                </p>
                <form key={item.id}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{item.id}</p><br/>
                        <h6>delete this item?</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={sendDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default DeleteProduct;