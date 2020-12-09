import React from 'react';
import '../App.css';
import UpdateProduct from "./update_product";
import DeleteProduct from "./delete_product";
// import {Link} from "react-router-dom";
import AddProduct from "./add_product";
import Pagination from "./pagination";

const URL = "http://127.0.0.1:8000/list1/?"
class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            page_size: 5,
            page: 1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const {page, page_size} = this.state
        fetch(`http://127.0.0.1:8000/list1/?page=${this.state.page}&size=${this.state.page_size}`).then(res => res.json()).then(json => {
            this.setState({
                isLoading: true,
                data: json,
            })
        });
    }

    componentWillUnmount() {
        this.setState({
            isLoading: false
        })
    }

    handleChange(event) {
        this.setState({page_size: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`${URL}${this.state.page}&size=${this.state.page_size}`).then(res => res.json()).then(json => {
            this.setState({
                isLoading: true,
                data: json,
            })
        });
    };

    render() {
        const sendPage = (page) => fetch(`http://127.0.0.1:8000/list1/?page=${page}&size=${this.state.page_size}`).then(res => res.json()).then(json => {
            this.setState({
                page: page,
                isLoading: true,
                data: json,
            });
        })
        let {isLoading, data} = this.state;
        const isLoad = (item) => {
            if (data) {
                return <UpdateProduct item={item} id={item.id}/>

            } else {
                return <p>something wrong</p>
            }
        };
        const isDelete = (item) => {
            if (data) {
                return <DeleteProduct item={item}/>

            } else {
                return <p>something wrong</p>
            }
        };

        return (
            <div>
                {isLoading ?
                    <div>
                        <div className="container son">
                            <form onSubmit={this.handleSubmit} className='d-flex justify-content-end'>
                                <label>
                                    <span>page size: </span>
                                    <select value={this.state.value} onChange={this.handleChange}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                    </select>
                                </label>
                                <input type="submit" value="Change" className='btn btn-sm btn-danger'/>
                            </form>
                            <table className="table table-hover my-table">
                                <thead>
                                <tr className='table-header'>
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
                                {data.results.map(item => (
                                    <tbody key={item.id}>
                                    <tr>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_detail}</td>
                                        <td>{item.product_type}</td>
                                        <td>{item.product_price}<span>$</span></td>
                                        <td>
                                            <div className='custom-control form-control-lg custom-checkbox'>
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
                            <Pagination total={data.count} size={this.state.page_size} paginate={sendPage}
                                        current={this.state.page}/>
                        </div>
                        <AddProduct/>
                    </div>
                    : <div>b</div>}
            </div>
        );
    }

}

export default Show;