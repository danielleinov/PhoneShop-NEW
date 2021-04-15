import React from "react";
import "./cart.css"

export default function Cart() {

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
                            <tr>

                                <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                                <td>Product Name Dada</td>
                                <td className="text-right">1</td>
                                <td className="text-right">124,90 €</td>
                                <td className="text-right"><button className="btn btn-sm btn-danger"><i className="fa fa-trash" /> </button> </td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>Sub-Total</td>
                                <td className="text-right">255,90 €</td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>Shipping</td>
                                <td className="text-right">6,90 €</td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td><strong>Total</strong></td>
                                <td className="text-right"><strong>346,90 €</strong></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="row">
                        <div className="col-sm-12  col-md-6">
                            <button className="btn btn-block btn-light">Continue Shopping</button>
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