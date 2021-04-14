import React,{useEffect, useState} from "react";
import axios from "axios";
import './details.css';

const SUBMITED_STATUS = {
    NOT_SUBMITED: 'not-submited',
    SUBMITED_SUCCESSFULLY: 'submited-successfully'
}

export default function Details() {

    const phoneId = window.location.pathname.split("/")[2];

    const [phoneDetails, setPhoneDetails] = React.useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [submitedStatus, setSubmitedStatus] = useState(SUBMITED_STATUS.NOT_SUBMITED);

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

    React.useEffect(() => {
        if(submitedStatus === SUBMITED_STATUS.SUBMITED_SUCCESSFULLY)
        {
            const index = window.location.toString().lastIndexOf('/') + 1;
            const id = window.location.toString().substring(index);

            fetch('http://localhost:8080/api/phone/' + id)
                .then((response) => response.json())
                .then((data) => setPhoneDetails(data));
            setSubmitedStatus(SUBMITED_STATUS.NOT_SUBMITED);
            setLoading(false)
        }
    }, [submitedStatus]);

    const SubmitReview = async e => {
        setLoading(true)
        const review = {phoneId: phoneId, content: reviewContent, author: user.name };
        const response = await axios.post(
            "http://localhost:8080/api/review/",
            review
        );
        setSubmitedStatus(SUBMITED_STATUS.SUBMITED_SUCCESSFULLY);
    }

    if (phoneDetails === null)
        return "";

    return (
        <div className="root">
            <div className="loader-container" >
                <div className={loading ? "loader" : ""}></div>
            </div>
            <div className="card mt-4 mr-4" >
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
            <div className="card card-outline-secondary my-4" >
                <div className="card-header">
                    Product Reviews
                </div>
                <div className="card-body overflow-auto">
                    {
                        phoneDetails.reviews.map((data, index) => {
                            return (
                                <div key={index}>
                                    <p>{data.content}</p>
                                    <small className="text-muted">Posted by {data.author} on {data.date}</small>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <input type="text" name="name" value={reviewContent} placeholder="Write a review" onChange={({target}) => setReviewContent(target.value)}/>
                <button onClick={SubmitReview} className="btn btn-success">Leave a Review</button>
            </div>
        </div>
    );
}