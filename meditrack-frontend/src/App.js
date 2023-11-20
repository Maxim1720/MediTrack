import './App.css';
import 'bootstrap';
import React from "react";
import Page from "./components/Page";

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className=" container-fluid p-3 bg-gradient bg-dark d-flex flex-column">
                <Page/>
            </div>
        );
    }

}

export default App;
