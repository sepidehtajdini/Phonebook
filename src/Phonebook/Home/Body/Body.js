import "./body.css";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchContext from "../../SearchContext";
function Body() {
    const { alphabetsClass, outlet, pair } = useContext(SearchContext);
    return (
            <div className="container">
                <div className={outlet}>
                    <Outlet />
                    <div className={alphabetsClass}>
                        مخاطبین:<br />
                        <div dangerouslySetInnerHTML={{ __html: `${pair}` }} />
                    </div>
                </div>
            </div>
    )
}
export default Body