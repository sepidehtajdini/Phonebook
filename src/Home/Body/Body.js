import "./body.css";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SearchContext from "../../SearchContext";
import NewContactContext from "../../NewContactContext";
function Body() {
    const { alphabetsClass, outlet, pair } = useContext(SearchContext);
    const { theme } = useContext(NewContactContext);
    return (
        <div className={theme === "pinkTheme" ? "container pinkContainer" : "container oliveContainer"}>
            <div className={outlet}>
                <Outlet />
                <div className={alphabetsClass}>
                    مخاطبین:<br />
                    <div dangerouslySetInnerHTML={{ __html: `${pair}` }} style={{ lineHeight: 1.5 }} />
                </div>
            </div>
        </div>
    )
}
export default Body