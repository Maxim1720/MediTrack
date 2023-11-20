import React from "react";
import {FormSaveBtn} from "../FormSaveBtn";

export default class StaffForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                firstname: '',
                lastname: '',
                position: '',
                contacts: ''
            }
        }
    }

    componentDidMount() {
        if (this.props.initData) {
            this.setState({
                formData: {
                    ...this.props.initData
                }
            })
        }
    }

    onInputChange = (e) => {
        this.setState(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [e.target.name]: e.target.value
            }
        }));
    }


    render() {
        return (
            <form className="form-control fs-4"
                  onSubmit={
                      (e) => {
                          // e.preventDefault();
                          this.props.onSubmit(this.state.formData)
                      }
                  }>

                <div className="form-label">
                    <label htmlFor="firstname" className="form-label me-2">Имя</label>
                    <input className="form-control" type={"text"} name="firstname" onChange={this.onInputChange}
                           value={this.state.formData.firstname}/>
                </div>
                <div className="form-label">
                    <label htmlFor="lastname" className="form-label me-2">Фамилия</label>
                    <input className="form-control" type={"text"} name="lastname" onChange={this.onInputChange}
                           value={this.state.formData.lastname}/>
                </div>

                <div className="form-label">
                    <label htmlFor="position" className="form-label me-2">Должность</label>
                    <input className="form-control" type={"text"} name="position" onChange={this.onInputChange}
                           value={this.state.formData.position}/>
                </div>

                <div className="form-label">
                    <label htmlFor="contacts" className="form-label me-2">Контакты</label>
                    <input className="form-control" type={"text"} name="contacts" onChange={this.onInputChange}
                           value={this.state.formData.contacts}/>
                </div>


                <div className="d-flex justify-content-center">
                    <FormSaveBtn/>
                </div>
            </form>
        );
    }
}