import List from "../shop/list";
import "./main.css"
import LogoImg from '../images/Logo2.jpg'


export default function Main() {
    return ( 
        <div>
            <div className="header">
                <img className="logo" height="160" width="570" src={LogoImg} alt=""/>
            </div>
            <List/>
        </div>
    );
}