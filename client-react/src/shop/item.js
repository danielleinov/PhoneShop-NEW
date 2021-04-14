import {Link} from "react-router-dom";
import React from "react";
import axios from "axios";

export default function Item({name, price, id, description}) {
    const fetchData = async () => {
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
        localStorage.setItem('cart', JSON.stringify(response.data))
    };

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <Link to={'/phone/' + id}><img className="card-img-top" src="http://placehold.it/700x400"
                                               alt=""/></Link>
                <div className="card-body">
                    <h4 className="card-title">
                        <a href="#">{name}</a>
                    </h4>
                    <h5>${price}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer">
                    <button onClick={() => fetchData()} className="btn btn-success">Add To Cart</button>
                </div>
            </div>
        </div>
    );
}