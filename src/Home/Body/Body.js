import "./body.css";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SearchContext from "../../SearchContext";
function Body() {
    const { alphabetsClass, outlet, pair } = useContext(SearchContext);
    return (
        <div className={outlet}>
            <Outlet />
            <div className={alphabetsClass}>
                مخاطبین:<br />
                <div dangerouslySetInnerHTML={{ __html: `${pair}` }} style={{ lineHeight: 1.5 }} />
            </div>
        </div>
    )
}
export default Body