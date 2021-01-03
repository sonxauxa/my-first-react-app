import React from 'react';
import '../App.css';
import UpdateProduct from "./update_product";
import DeleteProduct from "./delete_product";
import AddProduct from "./add_product";
import Pagination from "./pagination";

const URL = `http://127.0.0.1:8000/list1/?`;

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            page_size: 2,
            page: 1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this)
    }

    componentDidMount() {
        const {page, page_size} = this.state
        this.sendData(URL, page, page_size)
    }

    sendData(url, page1, page_size, event) {
        fetch(`${url}page=${page1}&size=${page_size}`).then(res => res.json()).then(json => {
            this.setState({
                isLoading: true,
                data: json,
            })
        })
        console.log(this.state.data);
    }

    componentWillUnmount() {
        this.setState({isLoading: false})
    }

    handleChange(event) {
        const {page} = this.state
        this.setState({page_size: event.target.value})
        this.sendData(URL, page, event.target.value)
    }

    render() {

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
                                <span id='mes'>
                                </span>
                            <form onSubmit={this.handleSubmit} className='d-flex justify-content-end'>
                                <label>
                                    <span>page size: </span>
                                    <select value={this.state.page_size} onChange={this.handleChange}>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                        <option value={20}>20</option>
                                    </select>
                                </label>
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
                            <Pagination total={data.count} size={this.state.page_size} paginate={this.sendData}
                                        current={this.state.page} url={URL}/>
                        </div>
                        <AddProduct/>
                    </div>
                    : <div>show time</div>}
            </div>
        );
    }

}

export default Show;