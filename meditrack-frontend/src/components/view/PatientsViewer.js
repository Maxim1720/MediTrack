import React from "react";
import Loading from "../util/Loading";
import Error from "../util/Error";
import PatientItem from "./PatientItem";

export default class PatientsViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: []
        }

    }

    componentDidMount() {
        this.fetchItems();
    }

    render() {

        const {error, isLoaded, items} = this.state;

        if (error) {
            return <Error message={error.message}/>
        } else if (!isLoaded) {
            return <Loading/>
        }



        console.log(items);
        return (
            <ul className="list-group">
                {items.map(i => (
                    <li className="list-group-item d-flex mt-2 rounded-2 shadow"
                        key={i._links.self.href}>
                        <PatientItem item={i} onUpdate={this.fetchItems}/>
                    </li>
                ))}
            </ul>
        );
    }

    fetchItems = () => {
        fetch("http://localhost:8080/patients")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error({message: resp.status.toString()});
                }
                return resp.json()
            })
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: [
                        ...json._embedded.patients
                    ]
                }, () => {
                    console.log(this.state);
                });
            })
            .catch(error => this.setState({error}));
    }
}