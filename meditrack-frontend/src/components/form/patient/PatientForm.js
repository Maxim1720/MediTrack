import React from "react";
import {FormSaveBtn} from "../FormSaveBtn";

class PatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                firstname: '',
                gender: 0,
                lastname: '',
                contacts: '',
                birthday: new Date().toISOString().split('T')[0]
            }
        }
    }

    componentDidMount() {
        if (this.props.initData) {
            this.setState({
                formData: {
                    ...this.props.initData,
                }
            })
        }
    }


    onInputChange = (e) => {
        this.setState(
            prev => (
                {
                    ...prev,
                    formData: {
                        ...prev.formData,
                        [e.target.name]: e.target.value
                    }
                }
            ), () => {
                console.log(this.state)
            }
        )
    }


    render() {
        return (
            <form className=" fs-4 container d-flex flex-column form-control align-items-start text-start"
                  onSubmit={(event) => {
                      this.props.onSubmit(this.state.formData);
                  }}>
                <div className="container">
                    <label className="form-label" htmlFor="firstname">Имя</label>
                    <input className="form-control" type={"text"} name="firstname" onChange={this.onInputChange}
                           value={this.state.formData.firstname}/>
                </div>
                <div className="container">
                    <label htmlFor="lastname">Фамилия</label>
                    <input className="form-control" type={"text"} name="lastname" onChange={this.onInputChange}
                           value={this.state.formData.lastname}/>
                </div>
                <div className="container">
                    <label className="form-label" htmlFor="birthday">Дата рождения</label>
                    <input className="form-control" type="date" name="birthday" onChange={this.onInputChange}
                           value={this.state.formData.birthday}/>
                </div>
                <div className="container">
                    <label htmlFor="gender">Пол</label>
                    <select className="form-select" name="gender" onChange={(event) => {
                        this.onInputChange({
                            target: {
                                name: event.target.name,
                                value: event.target.options.selectedIndex ? "FEMALE" : "MALE"
                            }
                        });
                    }}
                            value={this.state.formData.gender === "FEMALE" ? "Женский" : "Мужской"}
                    >
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                </div>
                <div className="container ">
                    <label className="form-label" htmlFor="contacts">Контакты</label>
                    <input className="form-control" type="text" name="contacts"
                           onChange={this.onInputChange} value={this.state.formData.contacts}/>
                </div>
                <div className="btn align-self-end">
                    <FormSaveBtn/>
                </div>
            </form>
        );
    }
}

export default PatientForm;