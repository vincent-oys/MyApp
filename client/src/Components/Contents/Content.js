import React from "react";
import Expense from "./Expense";
import Home from "./Home";
import Journal from "./Journal";
import Login from "./Login";
import Test from "../Test/Test"
import { Route } from "react-router-dom"

class Content extends React.Component {
    render() {
        return (
            <div>
                <Route path="/Test" component={Test} />
                <Route path="/Home" component={Home} />
                <Route path="/Journal" component={Journal} />
                <Route path="/Expense" component={Expense} />
                <Route path="/Login" component={Login} />
            </div>
        )
    }
}

export default Content