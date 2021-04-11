import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import KoreaAllData from "./components/KoreaData/KoreaAllData/KoreaAllData";
import KoreaCityData from "./components/KoreaData/KoreaCityData/KoreaCityData";
import OverseasAllData from "./components/OverseasData/OverseasAllData/OverseasAllData";
import OverseasCountryData from "./components/OverseasData/OverseasCountryData/OverseasCountryData";
import JHUDashboard from "./components/OverseasData/JHUDashboard/JHUDashboard";
import Center from "./components/Center/Center";
import News from "./components/News/News";
import Other from "./components/Other/Other";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={"/"} component={KoreaAllData} />
          <Route exact path={"/city"} component={KoreaCityData} />
          <Route exact path={"/all"} component={OverseasAllData} />
          <Route exact path={"/country"} component={OverseasCountryData} />
          <Route exact path={"/dashboard"} component={JHUDashboard} />
          <Route exact path={"/center"} component={Center} />
          <Route exact path={"/news"} component={News} />
          <Route exact path={"/other"} component={Other} />
          <Route to={"/404"} component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default App;
