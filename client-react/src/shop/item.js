import {Link, Redirect} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import List from "./list";
import './item.css';

export default function Item({name, price, id, manufacturer, imageUrl, count, onCountChange}) {
    const fetchData = async () => {
        if(JSON.parse(localStorage.getItem("user")) == undefined) {
            return (alert("Need to login"))
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        console.log(userId)
        const response = await axios.post(
            "http://localhost:8080/api/cart",
            {
                userId: userId,
                phoneId: id,
                quantity: 1
            }
        );
        const cartDetails = JSON.stringify(response.data);
        localStorage.setItem('cart', cartDetails);
        localStorage.setItem('cartTotal', JSON.parse(cartDetails).totalQuantity);
        onCountChange(JSON.parse(cartDetails).totalQuantity);
    };

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <Link to={'/phone/' + id}>
                    { imageUrl !== "" && imageUrl !== undefined ?
                        <img className="card-img-top rounded mx-auto d-block phoneImg"
                             src={imageUrl}
                             alt=""/>
                        :
                        <img className="card-img-top"
                             src="http://placehold.it/400x500"
                             alt=""/>
                    }
                </Link>
                <div className="card-body d-flex flex-column justify-content-end">
                    <h4 className="card-title">
                        <Link to={'/phone/' + id}>{name}</Link>
                    </h4>
                    <h5>${price}</h5>
                    <p className="card-text">{manufacturer}</p>
                </div>
                <div className="card-footer">
                    <button onClick={() => fetchData()} className="btn btn-success">Add To Cart</button>
                </div>
            </div>
        </div>
    );
}