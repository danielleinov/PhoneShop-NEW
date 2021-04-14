import {Link} from "react-router-dom";
import React from "react";

export default function Item({name, price, id, description}) {
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
                    <Link to={'/phone/' + id}><button  className="btn btn-success">Add To Cart</button></Link>
                </div>
            </div>
        </div>
    );
}