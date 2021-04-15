import {Link} from "react-router-dom";

export default function Item({name, price, id, manufacturer, imageUrl}) {
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <Link to={'/phone/' + id}>
                    { imageUrl !== "" && imageUrl !== undefined ?
                        <img className="card-img-top"
                             src={imageUrl}
                             alt="" height="500"/>
                        :
                        <img className="card-img-top"
                             src="http://placehold.it/400x500"
                             alt=""/>
                    }
                </Link>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link to={'/phone/' + id}>{name}</Link>
                    </h4>
                    <h5>${price}</h5>
                    <p className="card-text">{manufacturer}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">★ ★ ★ ★ ☆</small>
                </div>
            </div>
        </div>
    );
}