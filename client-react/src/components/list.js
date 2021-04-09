import Item from "./item";
import React from "react";

export default function List({q=''}) {

    
    const [items, setItems] = React.useState([]);

    
    React.useEffect(() => {        

        fetch('http://localhost:8080/api/phone'+q)
        .then((response) => response.json())
        .then((data) => setItems(data));
    }, [q]);
    

    if (items.length < 1)
        return "";
        

        

    return (
        <div className="row">
            {
                items.map((data,key) => {
                    return <Item name={data.displayName} price={data.price} key={key} id={data._id} description={data.description}/>;
                })
            }            
        </div>
    );
    

    return "";
}