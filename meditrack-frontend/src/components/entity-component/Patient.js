import {PatientCreator} from "../form/patient/PatientCreator";
import PatientsViewer from "../view/PatientsViewer";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import FixedSaveBtn from "../util/FixedSaveBtn";

export default class Patient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-between">
                <div className="mt-2">
                    <PatientsViewer/>
                </div>
                <div data-bs-toggle="modal" data-bs-target="#creator">
                    <FixedSaveBtn/>
                </div>
                <div className="modal fade" id="creator">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <PatientCreator/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}