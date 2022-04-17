import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage"
import ListOfEvents from "./components/ListOfEvents/ListOfEvents";
import EventForm from "./components/Event/EventForm";
import RegisterLoginPage from "./components/RegisterLoginPage/RegisterLoginPage";
import CalendarPage from "./components/CalendarPage/CalendarPage";
import Settings from "./components/Settings/Settings";
import './App.css';
import UsersProfilePage from "./components/ProfilePage/UsersProfilePage";
import EventPage from "./components/Event/EventPage";



function App() {
    
  return (
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={< WelcomePage />}/>
              <Route path="home" element={<WelcomePage />}/>
              <Route path="calendar" element={<CalendarPage />}/>
              <Route path="profile" element={<ProfilePage />}/>
              <Route path="profile/:visitedUserId" element={<UsersProfilePage />}/>
              <Route path="register" element={<RegisterLoginPage />}/>
              <Route path="login" element={<RegisterLoginPage />}/>
              <Route path="event/:id" element={<EventPage />}/>
              <Route path="event/create" element={<EventForm />} />
              <Route path="list-of-events" element={<ListOfEvents />} />
              <Route path="settings" element={<Settings />} />
          </Route>
      </Routes>
  );
}
export default App;
