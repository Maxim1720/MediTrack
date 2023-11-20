import React from "react";
import SelectEntity from "./SelectEntity";
import Patient from "./entity-component/Patient";
import Staff from "./entity-component/Staff";
import Appointment from "./entity-component/Appointment";
import Supplier from "./entity-component/Supplier";
import Equipment from "./entity-component/Equipment";


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEntityIndex: Number(sessionStorage.getItem("selectedEntityIndex"))
        }
    }

    onSelect = (sel) => {
        sessionStorage.setItem("selectedEntityIndex", sel);
        this.setState({
            selectedEntityIndex: sel
        }, () => {
            console.log(this.state);
        })
    }

    render() {
        return (
            <div className="min-vh-100 bg-light p-3 rounded-3 d-flex flex-column justify-content-between">
                <SelectEntity onSelect={this.onSelect} defaultValue={this.state.selectedEntityIndex}/>
                {this.#entityPage()}
            </div>
        );
    }


    #entityPage() {
        if (!isNaN(this.state.selectedEntityIndex)) {
            switch (this.state.selectedEntityIndex) {
                case 0:
                    console.log("patients selected")
                    return <Patient/>;
                case 1:
                    console.log("staff");
                    return <Staff/>
                case 2:
                    return <Equipment/>
                case 3:
                    console.log("appointment");
                    return <Appointment/>
                case 4:
                    console.log("supplier");
                    return <Supplier/>
                default:
                    return <></>
            }
        }
    }


}

export default Page;