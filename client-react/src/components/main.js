import List from "../shop/list";
import "./main.css"
import LogoImg from '../images/Logo2.jpg'


export default function Main() {
    return ( 
        <div>
            <div class="header">
                <img className="logo" height="160" width="570" src={LogoImg}/>
            </div>
            <List/>
        </div>
    );
}