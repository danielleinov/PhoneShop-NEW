import React, {useState} from "react";
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
        if (submitedStatus === SUBMITED_STATUS.SUBMITED_SUCCESSFULLY) {
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
        const review = {phoneId: phoneId, content: reviewContent, author: user.name};
        await axios.post(
            "http://localhost:8080/api/review/",
            review
        );
        setSubmitedStatus(SUBMITED_STATUS.SUBMITED_SUCCESSFULLY);
    }

    if (phoneDetails === null)
        return "";

    return (
        <div className="d-flex flex-column">
            <div className="container">
                <div className="loader-container">
                    <div className={loading ? "loader" : ""}/>
                </div>
                <div className="col-lg-12">
                    <div className="card mt-4">
                        <img className="card-img-top img-fluid" alt=""/>
                        <div className="card-body">
                            {phoneDetails.imageUrl !== "" && phoneDetails.imageUrl !== undefined ?
                                <img className="card-img-top detailsImage"
                                     src={phoneDetails.imageUrl}
                                     alt="" width="400" height="500"/>
                                :
                                <img className="card-img-top"
                                     src="http://placehold.it/400x500"
                                     alt=""/>
                            }
                            <h3 className="card-title">{phoneDetails.displayName}</h3>
                            <h4 className="card-title">{phoneDetails.manufacturer}</h4>
                            <br/>
                            <h5 className="d-inline">{phoneDetails.price} $</h5>
                            <p className="d-inline p-1 m-2 bg-danger text-white">{phoneDetails.discount}% OFF</p>
                            <br/>
                            <br/>
                            {/*<a className="btn btn-success AddToCart col-auto pull-right" id="cartButton">*/}
                            {/*    Add to cart*/}
                            {/*</a>*/}
                        </div>
                    </div>
                    <div className="card card-outline-secondary my-4">
                        <div className="card-header">
                            Reviews
                        </div>
                        <div className="card-body">
                            {
                                phoneDetails.reviews.map((data, index) => {
                                    return (
                                        <div key={index}>
                                            <p className="text-dark">{data.content}</p>
                                            <small className="text-muted">Posted by {data.author} on {data.date}</small>
                                            <hr/>
                                        </div>
                                    )
                                })
                            }
                            <hr/>
                            <form className="form-group">
                                <div className="form-group">
                                <textarea className="form-control" rows={3}
                                          placeholder="Write your review..." name="name" value={reviewContent}
                                          onChange={({target}) => setReviewContent(target.value)}/>
                                </div>
                                <button onClick={SubmitReview} className="btn btn-success">Leave a Review</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}