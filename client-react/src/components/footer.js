export default function Footer() {
    if (window.location.pathname === '/login') {
        return null;
    }

    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Copyright © Your Website 2020</p>
            </div>
        </footer>
    );
}