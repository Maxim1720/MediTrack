import React from "react";
import PatientForm from "./PatientForm";


export class PatientUpdater extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    update = (data) => {
        fetch(this.props.initData._links.self.href, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .catch(error => this.setState({error}))

    }

    render() {
        console.log(this.props.initData);
        return (
            <PatientForm onSubmit={this.update} initData={this.props.initData}/>
        );
    }

}