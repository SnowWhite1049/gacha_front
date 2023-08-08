import AdminNavbottom from '../Nav/Nav-Links/AdminNavLink';
import AdminNavtop from '../Nav/Container/Container';
import './Header.css'

const AdminHeader = () => {
    return (
        <div className='header__container'>
            <AdminNavtop />
            <AdminNavbottom />
        </div>
    );
}

export default AdminHeader;