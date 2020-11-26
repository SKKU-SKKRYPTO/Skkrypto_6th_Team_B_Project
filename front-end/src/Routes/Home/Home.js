import React from "react";
import Navigation from "Components/Navigation";
import PrivateRoute from "Components/PrivateRoute";
import Intro from "Routes/Home/Intro";
import Matching from "Routes/Home/Matching";
import Party from "Routes/Home/Party";
import Setting from "Routes/Home/Setting";

const Home = () => {
    return (
        <>
            <Navigation />
			<PrivateRoute path="/home" exact={true} component={Matching} />
			<PrivateRoute path="/home/intro" exact={true} component={Intro} />
			<PrivateRoute path="/home/party" exact={true} component={Party} />
			<PrivateRoute path="/home/setting" exact={true} component={Setting} />
        </>
    )
}

export default Home;