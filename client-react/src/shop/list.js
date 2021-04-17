import Item from "./item";
import React, {useState} from "react";
import {BrowserRouter, Redirect, useHistory} from "react-router-dom";
import LogoImg from "../images/Logo2.jpg";

export default function List({q = '', count, onCountChange}) {

    const [items, setItems] = React.useState([]);

    const history = useHistory();

    const [searchByName, setSearchByName] = useState("");
    const [searchByMaxPrice, setSearchByMaxPrice] = useState("");
    const [searchByManufacturer, setSearchByManufacturer] = useState("");

    const doSearch = (e) => {
        if (searchByName == "" && searchByMaxPrice == "" && searchByManufacturer == "")
            history.push('/');
        else
        {
            history.push('/search?name=' + searchByName + '&maxPrice=' + searchByMaxPrice + '&manufacturer=' + searchByManufacturer);
        }

    }

    React.useEffect(() => {

        fetch('http://localhost:8080/api/phone' + q)
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, [q]);

    if (items.length < 1)
        return "";

    return (
        <div className="container">
            <hr/>
            <form>
                <div className="form-row align-items-center justify-content-center">
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            Search for phone:
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="input-group mb-2" name="manufacturer">
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            <input placeholder="By Phone Name" className="form-control" type="text"
                                   value={searchByName} onChange={({target}) => setSearchByName(target.value)}/>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            </div>
                            <input placeholder="By Phone Manufacturer" className="form-control" type="text"
                                   value={searchByManufacturer}
                                   onChange={({target}) => setSearchByManufacturer(target.value)}/>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input placeholder="By Phone Max Price" className="form-control" type="text"
                                   value={searchByMaxPrice} onChange={({target}) => setSearchByMaxPrice(target.value)}/>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-2" onClick={doSearch}>Search</button>
                    </div>
                </div>
            </form>
            <hr/>

            <div className="row">
                <div className="row">
                    {
                        items.length > 0 ? items.map((data, key) => {
                            return <Item name={data.displayName} price={data.price} key={key} id={data._id}
                                         manufacturer={data.manufacturer} imageUrl={data.imageUrl} count={count}
                                         onCountChange={onCountChange}/>;
                        }) : ""
                    }
                </div>
            </div>
        </div>

    );
}