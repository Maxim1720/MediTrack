import React from "react";
import Error from "../util/Error";
import Loading from "../util/Loading";
import CircumIcon from "@klarr-agency/circum-icons-react";
import FixedSaveBtn from "../util/FixedSaveBtn";
import AppointmentForm from "../form/AppointmentForm";

export default class Appointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchItems().then(
            json => {
                let promises = [];
                promises.push(...json._embedded.appointments.map(i=>this.fetchItemData(i)));
                Promise.all(promises)
                    .then(resp=>{
                        console.log(resp);
                        this.setState({
                            items: [
                                ...resp
                            ]
                        },()=>{
                            console.log(`state: ${JSON.stringify(this.state)}`);
                            this.setState(prev=>({...prev, isLoaded: true}))
                        })
                    })
            }
        )
            .catch(error => this.setState({error}));
    }

    fetchItems = async () => {
        return await fetch("http://localhost:8080/appointments")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error({message: JSON.stringify(resp.body)});
                }
                return resp.json();
            })

    }

    fetchItemData = (item)=> {
        let _item = {
            ...item
        };

        return Promise.all([
            fetch(_item._links.patient.href)
                .then(resp => resp.json()),
            fetch(_item._links.staff.href)
                .then(resp => resp.json())
        ])
            .then(resp => {
                _item.patient = {...resp[0]}
                _item.staff = {...resp[1]}
                return _item;
            })
            .catch(error => this.setState(error));
    }

    render() {

        let {items, isLoaded, error} = this.state;

        const patients = [], stuff=[];
        

        if (error) {
            return <Error message={`${error.message}`}/>
        } else if (!isLoaded) {
            return <Loading/>
        }

        return (
            <>
                <ul className="list-group min-vh-100">
                    {
                        items.map(
                            i => {
                                return (
                                    <li className="list-group-item d-flex justify-content-between mt-3 shadow"
                                        key={i._links.self.href}>


                                        <div className="">
                                            <h2>
                                                Пациент: {i.patient.firstname} {i.patient.lastname}
                                            </h2>
                                            <p>
                                                Сотрудник: {i.staff.firstname} {i.staff.lastname}
                                            </p>

                                            <p>
                                                Дата записи: {new Date(Date.parse(i.timestamp)).toLocaleString()}
                                            </p>
                                            <p>
                                                Диагноз: {i.diagnosis}
                                            </p>
                                            <p>
                                                Описание: {i.description}
                                            </p>
                                        </div>
                                        <div className="btn-group align-self-end">
                                            <button data-bs-target={"#update-appointment-form" + i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}
                                                    data-bs-toggle="modal"
                                                    className="btn btn-primary"
                                            >
                                                <CircumIcon name="edit"/>
                                            </button>
                                            <button className="btn btn-danger" onClick={() => {
                                                fetch(i._links.self.href, {
                                                    method: "DELETE"
                                                })
                                                    .then(resp => {
                                                        return this.fetchItems()
                                                    })
                                                    .then(json => {
                                                        this.setState({
                                                            items: [...json._embedded.appointments],
                                                            isLoaded: true
                                                        })
                                                    })
                                                    .catch(error => this.setState({error}))
                                            }}>
                                                <CircumIcon name="trash"/>
                                            </button>
                                        </div>
                                        <div className="modal fade" id={"update-appointment-form" + i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}>
                                            <div className="modal-dialog-centered modal-dialog">
                                                <div className="modal-content">
                                                    <AppointmentForm
                                                        initData={i} onSubmit={
                                                        data => {
                                                            fetch(i._links.self.href, {
                                                                method: "PATCH",
                                                                headers: {
                                                                    "content-type": "application/json"
                                                                },
                                                                body: JSON.stringify(data)
                                                            })
                                                                .catch(error => this.setState({error}))
                                                        }
                                                    }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <div data-bs-toggle="modal" data-bs-target="#create-appointment-form">
                    <FixedSaveBtn/>
                </div>

                <div className="modal fade" id="create-appointment-form">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-2">
                            <h2 className="text-center">Создайте новый приём!</h2>
                            <AppointmentForm onSubmit={(data => {
                                fetch("http://localhost:8080/appointments",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(data)
                                    }
                                ).then(resp => {
                                    return this.fetchItems()
                                })
                                    .then(json => {
                                        this.setState({
                                            items: [...json._embedded.appointments],
                                            isLoaded: true
                                        })

                                    })
                                    .catch(error => this.setState({error}))
                            })}/>
                        </div>
                    </div>
                </div>

            </>

        );
    }

}