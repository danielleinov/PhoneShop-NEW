import List from "../shop/list";

export default function Search() {

    const q = window.location.search.toString().substring(3);

    return (
        <div className="col-lg-9">
            <List q={'/name/' + q}/>
        </div>
    );
}