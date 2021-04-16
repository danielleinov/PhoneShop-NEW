import List from "../shop/list";

export default function Search() {

    const q = window.location.search.toString();
    console.log(q);

    return (
        <div className="col-lg-9">
            <List q={'/search' + q}/>
        </div>
    );
}