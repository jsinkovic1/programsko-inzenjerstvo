import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Details from "./Details.jsx";
import Map from "./Map.jsx"
import Vessel from "./Vessel.jsx"


function App() {
    return (
        <BrowserRouter>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/details" element={<Details />} />
                <Route path="/vessel/:id" element={<Vessel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;