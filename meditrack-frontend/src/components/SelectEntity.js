import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

class SelectEntity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            // <form className="form h-100 container rounded-2 p-3" style={{backgroundColor: '#fdca0f',border:'2px solid #fdda0f'}}>
            <select className="d-block form-select shadow"

                    style={{
                        backgroundColor: '#f8f8f8'
                    }}

                    value={this.props.defaultValue}

                    onChange={(e) => {
                        this.props.onSelect(e.target.options.selectedIndex);
                        console.log(e);
                    }}>
                <option value="0" name="patients">Пациенты</option>
                <option value="1" name="stuff">Сотрудники</option>
                <option value="2" name="equipment">Оборудование</option>
                <option value="3" name="appointment">Приёмы</option>
                <option value="4" name="suppliers">Поставщики</option>
            </select>
            // </form>

        );
    }
}

export default SelectEntity;