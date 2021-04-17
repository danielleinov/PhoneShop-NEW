import List from "../shop/list";
import "./main.css"
import LogoImg from '../images/Logo2.jpg'
import {Route} from "react-router-dom";


export default function Main({count, onCountChange}) {

    return ( 
        <div>
            <List count={count} onCountChange={onCountChange}/>
        </div>
    );
}