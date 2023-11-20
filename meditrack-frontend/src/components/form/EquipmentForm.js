import React from "react";
import Error from "../util/Error";
import Loading from "../util/Loading";
import {FormSaveBtn} from "./FormSaveBtn";

export default class EquipmentForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formData: {

            },
            isLoaded: false
        }
    }

    componentDidMount() {
        if(this.props.initData){
            this.setState({
                formData:{
                    ...this.props.initData
                },
                isLoaded: true
            })
        }
        else{
            this.setState(prev=>({
                ...prev,
                isLoaded: true
            }));
        }
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
        }
        else if(!isLoaded) {
            return (
                <div>
                    <Loading/>
                </div>
            );
        }

        return (

            <form className="form-control fs-4"
                  onSubmit={
                      (e) => {
                          this.props.onSubmit(this.state.formData)
                      }
                  }>

                <div className="form-label">
                    <label htmlFor="name" className="form-label me-2">Наименование</label>
                    <input className="form-control" type="text" name="name"
                           onChange={this.onInputChange}
                           value={this.state.formData.name} required={true}/>
                </div>

                <div className="form-label">
                    <label htmlFor="manufacturer" className="form-label me-2">Производитель</label>
                    <input className="form-control" type="text" name="manufacturer"
                           onChange={this.onInputChange}
                           value={this.state.formData.manufacturer} required={true}/>
                </div>

                <div className="form-label">
                    <label htmlFor="acquisitionDate" className="form-label me-2">Дата приобретения</label>
                    <input className="form-control" type="date" name="acquisitionDate"
                           onChange={this.onInputChange}
                           value={this.state.formData.acquisitionDate} required={true}/>
                </div>
                <div className="form-label">
                    <label htmlFor="inventoryNumber" className="form-label me-2">Инвентарный номер</label>
                    <input className="form-control" type="text" name="inventoryNumber"
                           onChange={this.onInputChange}
                           value={this.state.formData.inventoryNumber} required={true}/>
                </div>

                <div className="form-label">
                    <label htmlFor="type" className="form-label me-2">Тип оборудования</label>
                    <input className="form-control" type="text" name="type"
                           onChange={this.onInputChange}
                           value={this.state.formData.type} required={true}/>
                </div>

                <div className="d-flex justify-content-center">
                    <FormSaveBtn/>
                </div>
            </form>
        );
    }
}