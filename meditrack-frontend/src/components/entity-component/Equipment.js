import React from "react";
import Error from "../util/Error";
import Loading from "../util/Loading";
import CircumIcon from "@klarr-agency/circum-icons-react";
import FixedSaveBtn from "../util/FixedSaveBtn";
import EquipmentForm from "../form/EquipmentForm";

export default class Equipment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchItems().then(json => {
                this.setState({
                    items: [
                        ...json._embedded.equipments
                    ]
                }, () => {
                    console.log(`state: ${JSON.stringify(this.state)}`);
                    this.setState(prev => ({...prev, isLoaded: true}))
                })
            }
        ).catch(error => this.setState({error}));
    }

    fetchItems = async () => {
        return await fetch("http://localhost:8080/equipments")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error({message: JSON.stringify(resp.body)});
                }
                return resp.json();
            })

    }



    render() {

        let {items, isLoaded, error} = this.state;

        if (error) {
            return <Error message={`${error.message}`}/>
        } else if (!isLoaded) {
            return <Loading/>
        }

        return (
            <>
                <ul className="list-group min-vh-100 ">
                    {
                        items.map(
                            i => {
                                return (
                                    <li className="list-group-item container-xl d-flex flex-column justify-content-between mt-3 shadow"
                                        key={i._links.self.href}>

                                        <div className="d-flex flex-column ">
                                            <div className="d-flex justify-content-between text-break">
                                                <h2>Наименование:</h2>
                                                <h2>{i.name}</h2>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Производитель:</p>
                                                <p>{i.manufacturer}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Дата приобретения:</p>
                                                <p>{new Date(Date.parse(i.acquisitionDate)).toLocaleDateString()}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Инвентарный номер:</p>
                                                <p>{i.inventoryNumber}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Тип:</p>
                                                <p>{i.type}</p>
                                            </div>
                                        </div>

                                        <div className="btn-group align-self-end">
                                            <button data-bs-target={"#update-equipment-form" + i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}
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
                                                            items: [...json._embedded.equipments],
                                                            isLoaded: true
                                                        })
                                                    })
                                                    .catch(error => this.setState({error}))
                                            }}>
                                                <CircumIcon name="trash"/>
                                            </button>
                                        </div>
                                        <div className="modal fade" id={"update-equipment-form" + + i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}>
                                            <div className="modal-dialog-centered modal-dialog">
                                                <div className="modal-content">
                                                    <EquipmentForm
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
                <div data-bs-toggle="modal" data-bs-target="#create-equipment-form">
                    <FixedSaveBtn/>
                </div>

                <div className="modal fade" id="create-equipment-form">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-2">
                            <h2 className="text-center">Опишите новое оборудование!</h2>
                            <EquipmentForm onSubmit={(data => {
                                fetch("http://localhost:8080/equipments",
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
                                            items: [...json._embedded.equipments],
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