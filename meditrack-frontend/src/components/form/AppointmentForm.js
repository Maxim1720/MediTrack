import React from "react";
import {FormSaveBtn} from "./FormSaveBtn";
import Loading from "../util/Loading";
import Error from "../util/Error";

export default class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: {
                patient: [],
                staff: [],
            },
            formData: {
                timestamp: '',
                diagnosis: '',
                description:''
            },
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchAllPatientAndStaff();
    }

    fetchAllPatientAndStaff = () => {
        const fetchData = [
            fetch("http://localhost:8080/patients")
                .then(resp => {
                    return resp.json();
                })
            ,
            fetch("http://localhost:8080/staff")
                .then(resp => {
                    return resp.json();
                })
        ]

        Promise.all(fetchData)
            .then(resp => {
                if(resp[0]._embedded.patients[0] && resp[1]._embedded.staff[0]){
                    this.setState(prev=>({
                        ...prev,
                        formData: {
                            ...prev.formData,
                            patient: resp[0]._embedded.patients[0]._links.self.href,
                            staff: resp[1]._embedded.staff[0]._links.self.href
                        },
                    }));
                }
                this.setState(prev => ({
                        ...prev,
                        fetched: {
                            patient: resp[0]._embedded.patients,
                            staff: resp[1]._embedded.staff
                        },

                        isLoaded: true
                    }),
                    () => {
                        if (this.props.initData) {
                            Promise.all([
                                    fetch(this.props.initData._links.patient.href)
                                        .then(resp => resp.json()),
                                    fetch(this.props.initData._links.staff.href)
                                        .then(resp => resp.json())
                                ]
                            ).then(resp => {
                                this.setState(prev => ({
                                    ...prev,
                                    formData: {
                                        ...prev.formData,
                                        ...this.props.initData,
                                        patient: resp[0]._links.self.href,
                                        staff: resp[1]._links.self.href,
                                        timestamp: this.props.initData.timestamp.split('.')[0]
                                    },
                                    // isLoaded: true
                                }), () => console.log(this.state.isLoaded));
                            })
                                .catch(error => this.setState({error}));
                        }
                    }
                );
            })
            // .then(()=>this.setState(prev=>({...prev, isLoaded:this.props.initData?false:true})))
            .catch(error => this.setState({error}))
    }

    onInputChange = (e) => {
        console.log(e);
        this.setState(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [e.target.name]: e.target.value
            }
        }));
    }


    render() {
        const {isLoaded, error} = this.state;

        console.log(this.state);

        if (error) {
            return <Error message={error.message}/>
        } else if (!isLoaded) {
            return <Loading/>
        }
        return (

            <form className="form-control fs-4"
                  onSubmit={
                      (e) => {
                          this.props.onSubmit(this.state.formData)
                      }
                  }>

                <div className="form-label">
                    <label htmlFor="patinent" className="form-label me-2">Пациент</label>
                    <select className="form-select" name="patient" value={this.state.formData.patient}
                            onChange={this.onInputChange}
                            required={true}>
                        {this.state.fetched.patient.map(p =>
                            (
                                <option value={p._links.self.href}
                                        key={p._links.self.href}>{p.firstname} {p.lastname}</option>
                            )
                        )}
                    </select>
                </div>

                <div className="form-label">
                    <label htmlFor="staff" className="form-label me-2">Сотрудник</label>
                    <select className="form-select" name="staff" value={this.state.formData.staff} required={true}
                            onChange={this.onInputChange}
                    >
                        {this.state.fetched.staff.map(p =>
                            (
                                <option value={p._links.self.href}
                                        key={p._links.self.href}>{p.firstname} {p.lastname}</option>
                            )
                        )}
                    </select>
                </div>

                <div className="form-label">
                    <label htmlFor="timestamp" className="form-label me-2">Дата и время приёма</label>
                    <input className="form-control" type={"datetime-local"} name="timestamp"
                           onChange={this.onInputChange}
                           value={this.state.formData.timestamp} required={true}/>
                </div>

                <div className="form-label">
                    <label htmlFor="diagnosis" className="form-label me-2">Диагноз</label>
                    <input className="form-control" type="text" name="diagnosis"
                           onChange={this.onInputChange}
                           value={this.state.formData.diagnosis} required={true}/>
                </div>

                <div className="form-label">
                    <label htmlFor="description" className="form-label me-2">Описание</label>
                    <input className="form-control" type="text" name="description"
                           onChange={this.onInputChange}
                           value={this.state.formData.description} required={true}/>
                </div>

                <div className="d-flex justify-content-center">
                    <FormSaveBtn/>
                </div>
            </form>
        );
    }
}