import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Login";
import Carousel from "./components/carousel";
import Team from "./components/Team";
import Dash from "./dash/src/Dash";
import UserTable from "./dash/src/consultation";
import ProfilUser from "./screens/ProfilUser";
import ProfilAdmin from "./screens/ProfilAdmin";
import ProfilProfessional from "./screens/ProfilProfessional";
import Signup from "./screens/Signup";
import Professions from "./screens/Professions";
import Discussion from "./screens/Disscussions";
import Discussionprofessional from "./screens/Discussionprofessional";
import MapIcon from "./screens/MapIcon";
import GeolocationMap from "./screens/GeolocationMap";
import Searchengine from "./screens/Searchengine";
import Pagenotfound from "./components/ErreurPage";
import StarRating from "./components/StarRating";
import Smodal from "./components/Smodal";
import HeaderAdmin from "./components/HeaderAdmin";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="carousel" element={<Carousel />} />
        <Route path="Team" element={<Team />} />

        <Route path="/ProfilUser/:id" element={<ProfilUser />} />
        <Route path="/ProfilAdmin/:id" element={<ProfilAdmin />} />
        <Route path="/Professions" element={<Professions />} />
        <Route
          path="/ProfilProfessional/:id"
          element={<ProfilProfessional />}
        />
        <Route path="/Discussion" element={<Discussion />} />
        <Route
          path="/Discussionprofessional"
          element={<Discussionprofessional />}
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/UserTable/:id" element={<UserTable />} />
        <Route path="/Dash" element={<Dash />} />
        <Route path="/GeolocationMap" element={<GeolocationMap />} />
        <Route path="/MapIcon" element={<MapIcon />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="StarRating" element={<StarRating />} />
        <Route path="SModal" element={<Smodal />} />
        <Route path="HeaderAdmin" element={<HeaderAdmin />} />

        <Route path="/Searchengine" element={<Searchengine />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
