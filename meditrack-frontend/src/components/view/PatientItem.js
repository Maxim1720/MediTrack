import React, {useState} from "react";
import CircumIcon from "@klarr-agency/circum-icons-react";
import Error from "../util/Error";
import 'bootstrap/dist/css/bootstrap.css';
import {PatientUpdater} from "../form/patient/PatientUpdater";

export default function PatientItem({item, onUpdate}) {

    let [error, setError] = useState();

    return (
        <>
            {
                error ?
                    <div className="fixed-top">
                        <Error message={error}/>
                    </div>

                    : <></>
            }


            <div className="w-100 h-100 d-flex flex-column justify-content-between">

                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="container">
                        <h2>
                            {item.firstname} {item.lastname}
                        </h2>

                        <p>
                            Пол: {item.gender === "FEMALE" ? "Женский" : "Мужской"}
                        </p>
                        <p>
                            Дата рождения: {new Date(Date.parse(item.birthday)).toLocaleDateString()}
                        </p>
                        <p>
                            Контакты: {item.contacts}
                        </p>
                    </div>


                    <div className="btn-group align-self-end">

                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target={"#modalEditForm"+ item._links.self.href.split('/')[item._links.self.href.split('/').length-1]}>
                            <CircumIcon name="edit"></CircumIcon>
                        </button>

                        <button type="submit" className="btn btn-danger" onClick={(e) => {
                            fetch(item._links.self.href, {
                                method: "DELETE"
                            })
                                .then(resp => {
                                    if (resp.status === 409) {
                                        throw new Error({
                                            message: "Пациент связан с записью, его нельзя удалить!"
                                        });
                                    } else {
                                        onUpdate();
                                    }
                                })
                                .catch(reason => {
                                        console.log(JSON.stringify(reason));
                                        setError(reason);
                                        return;
                                    }
                                )
                        }}>
                            <CircumIcon name="trash"></CircumIcon>
                        </button>
                    </div>
                </div>

                <div className="modal" id={"modalEditForm"+item._links.self.href.split('/')[item._links.self.href.split('/').length-1]}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <PatientUpdater initData={item}/>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );

}