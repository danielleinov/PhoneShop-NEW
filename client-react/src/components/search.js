import List from "../shop/list";

export default function Search() {

    const q = window.location.search.toString().substring(3);

    return (
        <div className="col-lg-9">
            <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active"/>
                    <li data-target="#carouselExampleIndicators" data-slide-to={1}/>
                    <li data-target="#carouselExampleIndicators" data-slide-to={2}/>
                </ol>
            </div>
            <List q={'/name/' + q}/>
        </div>
    );
}