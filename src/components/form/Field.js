import React from "react";

export default class Field extends React.Component {
    getDefaultInput()
    {
       return (
           <input
               name={this.props.name}
               className="form-control"
               type={this.props.type}
               placeholder={this.props.label}
               value={this.props.value}
               onChange={this.props.onChange}
           />
       );
    }

    render() {
        switch(this.props.type) {
            default:
                return this.getDefaultInput()
        }
    }
}