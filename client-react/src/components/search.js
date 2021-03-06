import List from "../shop/list";

export default function Search({count, onCountChange}) {

    const q = window.location.search.toString();

    return (
        <div>
            <List q={'/search' + q} count={count} onCountChange={onCountChange}/>
        </div>
    );
}