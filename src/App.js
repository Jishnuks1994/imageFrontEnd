import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Landing from "./Landing";



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes> 
                <Route path='/' element={< Landing />}></Route> 
                <Route  path='/login' element={< Login />}></Route> 
                <Route  path='/register' element={< Register />}></Route> 
                <Route  path='/home' element={< Home />}></Route> 
        </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
