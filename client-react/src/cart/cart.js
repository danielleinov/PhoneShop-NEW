import React from "react";
import "./cart.css"
import {Link} from "react-router-dom";

export default function Cart() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    let totalPrice = 0;
    cart.phones.map((data, key) => {
        totalPrice += data.totalPricePhone;
    });
    return (
        <div className="container mb-4">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col"> </th>
                                <th scope="col">Product</th>
                                <th scope="col" className="text-center">Quantity</th>
                                <th scope="col" className="text-right">Price</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                cart.phones.map((data, key) => {
                                    console.log(data)
                                    return([
                                        <tr>

                                            <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                                            <td key={key}>{data.phone.displayName}</td>
                                            <td className="text-right">{data.quantity}</td>
                                            <td className="text-right">{data.totalPricePhone} €</td>
                                            <td className="text-right"><button className="btn btn-sm btn-danger"><i className="fa fa-trash" /> </button> </td>
                                        </tr>
                                    ])

                                })
                            }
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td><strong>Total</strong></td>
                                <td className="text-right"><strong>{totalPrice} €</strong></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="row">
                        <div className="col-sm-12  col-md-6">
                            <Link to={'/'}><button className="btn btn-block btn-light">Continue Shopping</button></Link>
                        </div>
                        <div className="col-sm-12 col-md-6 text-right">
                            <button className="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}