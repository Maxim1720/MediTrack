import React from "react";
import Error from "../util/Error";
import Loading from "../util/Loading";
import CircumIcon from "@klarr-agency/circum-icons-react";
import FixedSaveBtn from "../util/FixedSaveBtn";
import SupplierForm from "../form/SupplierForm";


export default class Supplier extends React.Component{

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
                        ...json._embedded.suppliers
                    ]
                }, () => {
                    console.log(`state: ${JSON.stringify(this.state)}`);
                    this.setState(prev => ({...prev, isLoaded: true}))
                })
            }
        ).catch(error => this.setState({error}));
    }

    fetchItems = async () => {
        return await fetch("http://localhost:8080/suppliers")
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
                <ul className="list-group min-vh-100">
                    {
                        items.map(
                            i => {
                                return (
                                    <li className="list-group-item d-flex justify-content-between mt-3 shadow"
                                        key={i._links.self.href}>


                                        <div className="">
                                            <h3>{i.name}</h3>
                                            <p>{i.contacts}</p>
                                        </div>

                                        <div className="btn-group align-self-end">
                                            <button data-bs-target={"#update-supplier-form" + i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}
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
                                                            items: [...json._embedded.suppliers],
                                                            isLoaded: true
                                                        })
                                                    })
                                                    .catch(error => this.setState({error}))
                                            }}>
                                                <CircumIcon name="trash"/>
                                            </button>
                                        </div>
                                        <div className="modal fade" id={"update-supplier-form" + i._links.self.href.split('/')[i._links.self.href.split('/').length-1] }>
                                            <div className="modal-dialog-centered modal-dialog">
                                                <div className="modal-content">
                                                    <SupplierForm
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
                <div data-bs-toggle="modal" data-bs-target="#create-supplier-form">
                    <FixedSaveBtn/>
                </div>

                <div className="modal fade" id="create-supplier-form">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-2">
                            <h2 className="text-center">Заведите нового поставщика!</h2>
                            <SupplierForm onSubmit={(data => {
                                fetch("http://localhost:8080/suppliers",
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