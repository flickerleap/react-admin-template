import React from 'react';
import {connect} from 'react-redux';
import {EditScreen} from "../../components/screens/EditScreen";
import {editExample, fetchExamples} from "../../store/actions/actions";
import {userModel as model} from "../../models/models";
import {userItems} from "../../models/user";

const mapStateToProps = (state) => ({
    items: userItems
});

const mapDispatchToProps = (dispatch) => ({
    edit: (item) => dispatch(editExample(item)),
    fetch: () => dispatch(fetchExamples())
});

const initialProps = {
    title: 'Edit ' + model.type,
    fields: model.getFormFields(),
    redirectPath: model.getBaseUrl()
};

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    const finalProps = {...props, ...initialProps};
    return <EditScreen {...finalProps} />;
});