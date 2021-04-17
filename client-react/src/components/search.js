import List from "../shop/list";

export default function Search() {

    const q = window.location.search.toString();

    return (
        <div className="col-lg-9">
            <List q={'/search' + q}/>
        </div>
    );
}