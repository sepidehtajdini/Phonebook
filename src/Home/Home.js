import Header from "./Header/Header";
import Body from "./Body/Body";
import { useState } from "react";
import SearchContext from "../SearchContext";
function Home() {
    const [searchText, setSearchText] = useState("");
    const [findTextClass, setFindTextClass] = useState("hide");
    const [findText, setFindText] = useState("");
    const [alphabetsClass, setAlphabetsClass] = useState("hide");
    const [outlet, setOutlet] = useState("outlet-gap");
    const [pair, setPair] = useState([]);
    return (
        <SearchContext.Provider value={{
            searchText, setSearchText,
            findText, setFindText,
            findTextClass, setFindTextClass,
            alphabetsClass, setAlphabetsClass,
            outlet, setOutlet,
            pair, setPair
        }}>
            <Header />
            <Body />
        </SearchContext.Provider>
    )
}
export default Home