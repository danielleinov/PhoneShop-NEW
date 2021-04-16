import React, {useState} from "react";
import "./cart.css"
import {Link} from "react-router-dom";
import axios from "axios";

export default function Cart({count, onCountChange}) {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const cartId = cart._id;
    const [data, setData] = useState(cart);
    React.useEffect(() => {
        const cartDetails = JSON.stringify(data);
        localStorage.setItem("cart", cartDetails);
        localStorage.setItem("cartTotal", JSON.parse(cartDetails).totalQuantity)
        onCountChange(JSON.parse(cartDetails).totalQuantity);

    }, [data]);

    let totalPrice = 0;
    data.phones.map((data, key) => {
        totalPrice += data.totalPricePhone;
    });
    const deletePhone = async (cartId, phoneId) => {
        const response = await axios.delete(
             `http://localhost:8080/api/cart/${cartId}`,
            {
                data: {
                    phoneId: phoneId,
                    quantity: 1
                }
            }

         );
        setData(response.data)
    }
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
                                data.phones.map((data, key) => {
                                    console.log(data)
                                    return([
                                        <tr>

                                            <td><img src={data.phone.imageUrl} /> </td>
                                            <td key={key}>{data.phone.displayName}</td>
                                            <td className="text-right">{data.quantity}</td>
                                            <td className="text-right">{data.totalPricePhone} €</td>
                                            <td className="text-right"><button onClick={()=>{deletePhone(cartId,data.phone._id)}} className="btn btn-sm btn-danger"><i className="fa fa-trash" /> </button> </td>
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