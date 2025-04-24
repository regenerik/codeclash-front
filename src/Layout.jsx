import React, {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from './views/Contact.jsx'
import NotFound from './views/NotFound.jsx'
import LoginRegisterView from './views/LoginRegisterView.jsx';
import injectContext from "./js/store/appContext";
import SaberMas from './views/SaberMas.jsx';
import Admin from './views/Admin.jsx';
import Profile from './views/Profile.jsx'
import Directorio from './views/Directorio.jsx';
import socket from "./socket";
import Lobby from './components/Lobby.jsx';
import RoomView from './components/RoomView.jsx'
import LobbySection from './components/LobbySection.jsx';
import RoomViewBest from './components/RoomViewBest.jsx';
import Main from './views/Main.js';
import RegisterNew from './components/RegisterNew.jsx';
import LoginNew from './components/LoginNew.jsx';
import PerfilNew from './views/PerfilNew.jsx';


const Layout = () => {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("¡Socket conectado!", socket.id);
    });
    socket.on("server_message", data => {
      console.log("Server:", data.msg);
    });

    // cleanup al desmontar
    return () => {
      socket.off("connect");
      socket.off("server_message");
    };
  }, []);

  const basename = process.env.BASENAME || "";

  return (
    <div>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route exact path="/lobby" element={<Lobby/>}/>
                <Route exact path="/login-new" element={<LoginNew/>}/>
                <Route exact path="/lobbysection" element={<LobbySection/>} />
                <Route exact path="/roomviewbest/:id" element={<RoomViewBest/>} />
                <Route exact path="/register" element={<RegisterNew/>} />
                <Route path="/room/:id" element={<RoomView />} />
                <Route path="/perfilnew" element={<PerfilNew />} />
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/contact" element={<Contact/>}/>
                <Route exact path="/main" element={<Main/>}/>
                <Route exact path="/loginregister" element={<LoginRegisterView/>}/>
                <Route exact path="/plus" element={<SaberMas/>}/>
                <Route exact path="/admin" element={<Admin/>}/>
                <Route exact path="/profile" element={<Profile />}/>
                <Route exact path="/directorio" element={<Directorio />}/>
                <Route exact path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)