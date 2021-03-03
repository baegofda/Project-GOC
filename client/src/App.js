import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import KoreaAllData from "./components/KoreaData/KoreaAllData/KoreaAllData";
import KoreaCityData from "./components/KoreaData/KoreaCityData/KoreaCityData";
import OverseasAllData from "./components/OverseasData/OverseasAllData/OverseasAllData";
import OverseasCountryData from "./components/OverseasData/OverseasCountryData/OverseasCountryData";
import Footer from "./components/Footer/Footer";
import JHUDashboard from "./components/OverseasData/JHUDashboard/JHUDashboard";

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={"/"} component={KoreaAllData} />
          <Route path={"/city"} component={KoreaCityData} />
          <Route path={"/all"} component={OverseasAllData} />
          <Route path={"/country"} component={OverseasCountryData} />
          <Route path={"/dashboard"} component={JHUDashboard} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default App;
