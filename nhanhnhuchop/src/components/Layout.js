import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
  <div>
    <NavBar />
    <div className="container">
      {loading ? <p>Đang tải câu hỏi...</p> : error ? <p>Không tải được câu hỏi</p> : <Outlet />}
    </div>
  </div>
);

export default Layout;
