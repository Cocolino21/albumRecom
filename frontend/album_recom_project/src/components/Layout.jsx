import Navbar from "./Navbar";
import Sidepanel from "./Sidepanel";
import {Outlet} from "react-router-dom"

function Layout() {
    return (
        <div className="app-container">
            <Navbar />
            <Sidepanel />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;