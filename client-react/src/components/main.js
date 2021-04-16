import List from "../shop/list";
import "./main.css"
import LogoImg from '../images/Logo2.jpg'
import {Route,useHistory} from "react-router-dom";
import {Button} from 'react-bootstrap';
import {useState} from "react";

export default function Main({count, onCountChange}) {

    const history = useHistory();

    const [searchByName, setSearchByName] = useState("");
    const [searchByMaxPrice, setSearchByMaxPrice] = useState("");
    const [searchByManufacturer, setSearchByManufacturer] = useState("");

    const doSearch = (e) => {
        if (searchByName === "" && searchByMaxPrice === "" && searchByManufacturer === "")
            history.push('/');
        else
            history.push('/search?name=' + searchByName + '&maxPrice=' + searchByMaxPrice + '&manufacturer=' + searchByManufacturer);
    }
    return ( 
        <div>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm mt-4">
                            <Button variant="primary" onClick={doSearch}>Search</Button>
                        </div>
                        <div className="col-sm">
                            <input placeholder="Search By Phone Name" className="form-control mt-4 " value={searchByName} onChange={({target}) => setSearchByName(target.value)}/>
                        </div>
                        <div className="col-sm">
                            <input placeholder="Search By Phone Manufacturer" className="form-control mt-4" value={searchByManufacturer} onChange={({target}) => setSearchByManufacturer(target.value)}/>
                        </div>
                        <div className="col-sm">
                            <input placeholder="Search By Phone Max Price" className="form-control mt-4" value={searchByMaxPrice} onChange={({target}) => setSearchByMaxPrice(target.value)}/>
                        </div>
                    </div>
                    <div className="container">
                        <img className="logo" height="160" width="570" src={LogoImg} alt=""/>
                    </div>
                </div>
            </div>
            <List count={count} onCountChange={onCountChange}/>
        </div>
    );
}