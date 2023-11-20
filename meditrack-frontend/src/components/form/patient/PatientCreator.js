import React from "react";
import PatientForm from "./PatientForm";
import Error from "../../util/Error";


export class PatientCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    create = (data) => {
        console.log(`creating data: \n ${JSON.stringify(data)}`);

        fetch("http://localhost:8080/patients", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error({
                        message: JSON.stringify(resp.body)
                    });
                }
                // this.props.onSubmit(resp);
            })
            .catch(error => {
                this.setState(error)
            })

    }

    render() {
        const {error} = this.state;

        if (error) {
            return <Error message={error.message}/>
        }

        return (
            <div className="container form-control">
                <h2 className="text-center">Создание пациента</h2>
                <PatientForm onSubmit={this.create}/>
            </div>

        );
    }
}