import "./App.css";
import loginPage from "./page/LoginPage/loginPage";
import POSpage from "./page/PosPage/POSpage";
import ProductPage from "./page/ProductPage/productPage";
import reportPage from "./page/ReportPage/reportPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="full-size">
        <div className="container">
          <Switch>
            <Route exact path="/" component={loginPage} />
            <Route path="/POS" component={POSpage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/report" component={reportPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;