import Link from '../../node_modules/next/link';
import styles from './Header.module.scss';

interface IHeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ph2">
                <a className="navbar-brand" href="#">FFB</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active mr2">
                            <Link className="nav-link" href="/orders/orders">Orders</Link>
                        </li>
                        <li className="nav-item mr2">
                            <Link className="nav-link" href="/backoffice/backoffice">Backoffice</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className='container-fluid'>
                <div>
                    {children}
                </div>
            </main>
        </>
    );
};

export default Header;