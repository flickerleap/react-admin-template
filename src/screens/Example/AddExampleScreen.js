import React from 'react';
import { connect } from 'react-redux';
import {exampleModel as model} from "../../models/models";
import {AddScreen} from "../../components/screens/AddScreen";

const initialProps = {
    title: "Add " + model.type,
    fields: model.getFormFields(),
    redirectPath: model.getBaseUrl()
};

const mapDispatchToProps = (dispatch) => ({
    add: (item) => {
        console.log('add');
    }
});

export default connect(undefined, mapDispatchToProps)((props) => {
    const finalProps = {...props, ...initialProps};
    return <AddScreen {...finalProps} />;
});