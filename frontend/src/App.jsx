import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home.jsx";
import Details from "./views/Details.jsx";
import Map from "./views/Map.jsx"
import Vessel from "./views/Vessel.jsx"
import Gallery from "./views/Gallery.jsx";
import Login from "./views/Login.jsx";


function App() {
    return (
        <BrowserRouter>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/details" element={<Details />} />
                <Route path="/vessel/:id" element={<Vessel />} />
                <Route path="/dev/gallery" element={<Gallery />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;