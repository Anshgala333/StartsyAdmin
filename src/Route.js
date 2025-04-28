import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./App";
import AcceptInvestor from "./component/AcceptOrRejectInvestor";
import Home from "./component/Home";
import Report from "./component/ReportPost";
import Login from "./component/Login";
import { Provider, useSelector } from 'react-redux'
import store from './Redux/Store'
import { useEffect } from "react";
import BetaRating from "./component/BetaRating";
import NewsLetter from "./component/NewsLetter";
import UserStat from "./component/UserStat";

var CustomRoute = () => {

    var loginStatus = useSelector((state) => state.admin.isLoggedIn)
    useEffect(() => {
        console.log(loginStatus);
    }, [loginStatus])

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={loginStatus ? null : <Login />} />
                <Route path="" element={loginStatus ? <App /> : <Navigate to="/login" />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/getUnverifiedInvetsor" element={<AcceptInvestor />} />
                    <Route path="/ReportPost" element={<Report />} />
                    <Route path="/betaRating" element={<BetaRating />} />
                    <Route path="/Newsletter" element={<NewsLetter />} />
                    <Route path="/userStat" element={<UserStat />} />
                </Route>
            </Routes>
        </BrowserRouter>

    )
}




export default CustomRoute;