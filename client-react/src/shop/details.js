import React,{useEffect, useState} from "react";
import axios from "axios";


export default function Details() {

    const [phoneDetails, setPhoneDetails] = React.useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [user, setUser] = useState();

    const SubmitReview = async e => {
        const review = {phoneDetails.phoneId,reviewContent,user.username };
        const response = await axios.post(
            "http://localhost:8080/api/review/",
            review
        );
    }

    React.useEffect(() => {
        const index = window.location.toString().lastIndexOf('/') + 1;
        const id = window.location.toString().substring(index);

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }

        fetch('http://localhost:8080/api/phone/' + id)
            .then((response) => response.json())
            .then((data) => setPhoneDetails(data));
    }, []);

    if (phoneDetails === null)
        return "";

    return (
        <div className="col-lg-9">
            <div className="card mt-4">
                <img className="card-img-top img-fluid" src="http://placehold.it/900x400" alt="" />
                <div className="card-body">
                    <h3 className="card-title">{phoneDetails.displayName}</h3>
                    <h4>{phoneDetails.price}$</h4>
                    <h5>{phoneDetails.discount}% Discount</h5>
                    <p className="card-text">{phoneDetails.description}</p>
                    <span className="text-warning">★ ★ ★ ★ ☆</span>
                    4 stars
                </div>
            </div>
            {/* /.card */}
            <div className="card card-outline-secondary my-4">
                <div className="card-header">
                    Product Reviews
                </div>
                <div className="card-body">
                    {
                        phoneDetails.reviews.map((data, key) => {
                            return ([
                                <p key={key}>{data.content}</p>,
                                <small className="text-muted">Posted by {data.author} on {data.date}</small>,
                                <hr />,
                            ]
                            )
                        })

                    }
                    <input type="text" name="name" onClick={SubmitReview} value={reviewContent} placeholder="Write a review" onChange={({target}) => setReviewContent(target.value)}/>
                    <button href="#" className="btn btn-success">Leave a Review</button>
                </div>
            </div>
        </div>
    );
}