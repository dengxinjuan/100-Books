import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { useEffect } from "react";
import BookApi from "./Api/api";

function App() {
  useEffect(() => {
    async function fetchData() {
      const c = await BookApi.removeWish("bird", "12wddasd44");
      console.log(c);
    }
    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
