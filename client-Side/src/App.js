import logo from './logo.svg';
import './App.css';
import { AddUsers } from './components/AddUsers';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AllUsers } from './components/AllUsers';
import { EditUser } from './components/EditUser';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="" element={<AllUsers/>} />
        <Route path="/add" element={<AddUsers />} />
        <Route path="/edit/:id" element={<EditUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
