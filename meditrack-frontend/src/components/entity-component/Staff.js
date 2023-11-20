import React from "react";
import Error from "../util/Error";
import Loading from "../util/Loading";
import CircumIcon from "@klarr-agency/circum-icons-react";
import StaffForm from "../form/staff/StaffForm";
import FixedSaveBtn from "../util/FixedSaveBtn";

export default class Staff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchItems().then(
            json => {
                this.setState({
                    items: [...json._embedded.staff],
                    isLoaded: true
                })

            }
        )
            .catch(error => this.setState({error}));
    }

    fetchItems = async () => {
        return await fetch("http://localhost:8080/staff")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error({message: JSON.stringify(resp.body)});
                }
                return resp.json();
            })

    }

    render() {

        const {items, isLoaded, error} = this.state;

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
                            i => (
                                <li className="list-group-item d-flex flex-column justify-content-between mt-3 shadow" key={i._links.self.href}>

                                    <div className="container">
                                        <h2>{i.firstname} {i.lastname}</h2>
                                        <p>Должность: {i.position}</p>
                                        <p>Контакты: {i.contacts}</p>
                                    </div>
                                    <div className="btn-group align-self-end">
                                        <button data-bs-target={"#update-staff-form" + i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}
                                                data-bs-toggle="modal"
                                                className="btn btn-primary"
                                        >
                                            <CircumIcon name="edit"/>
                                        </button>
                                        <button className="btn btn-danger" onClick={()=>{
                                            fetch(i._links.self.href, {
                                                method: "DELETE"
                                            })
                                                .then(resp=>{
                                                    return this.fetchItems()
                                                })
                                                .then(json => {
                                                    this.setState({
                                                        items: [...json._embedded.staff],
                                                        isLoaded: true
                                                    })
                                                })
                                                .catch(error=>this.setState({error}))
                                        }}>
                                            <CircumIcon name="trash"/>
                                        </button>
                                    </div>

                                    <div className="modal fade" id={"update-staff-form"+ i._links.self.href.split('/')[i._links.self.href.split('/').length-1]}>
                                        <div className="modal-dialog-centered modal-dialog">
                                            <div className="modal-content">
                                                <StaffForm initData={i} onSubmit={data=>{
                                                    fetch(i._links.self.href,{
                                                        method:"PUT",
                                                        headers:{
                                                            "content-type":"application/json"
                                                        },
                                                        body: JSON.stringify(data)
                                                    })
                                                        .catch(error=>this.setState({error}))
                                                }}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        )
                    }
                </ul>
                <div data-bs-toggle="modal" data-bs-target="#create-stuff-form">
                    <FixedSaveBtn/>
                </div>

                <div className="modal fade" id="create-stuff-form">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-2">
                            <h2>Создайте сотрудника больницы</h2>
                            <StaffForm onSubmit={(data => {
                                fetch("http://localhost:8080/staff",
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
                                            items: [...json._embedded.staff],
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