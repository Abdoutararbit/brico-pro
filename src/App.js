import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";

import Dash from "./dash/src/Dash";
import UserTable from "./dash/src/consultation";
import ProfilUser from "./screens/ProfilUser";
import ProfilAdmin from "./screens/ProfilAdmin";
import ProfilProfessional from "./screens/ProfilProfessional";
import Signup from "./screens/Signup";
import Professions from "./screens/Professions";
import Discussion from "./screens/Disscussions";
import Discussionprofessional from "./screens/Discussionprofessional";
import Yojo from "./screens/Yojo";
import Chat from "./screens/Chat";
import Searchengine from "./screens/Searchengine";

import Pagenotfound from "./components/ErreurPage";
import StarRating from "./components/StarRating";
import Smodal from "./components/Smodal";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/Yojo" element={<Yojo />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="StarRating" element={<StarRating />} />
        <Route path="SModal" element={<Smodal />} />
        <Route path="/Searchengine" element={<Searchengine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
