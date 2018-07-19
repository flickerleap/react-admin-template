import React from 'react';
import {connect} from 'react-redux';
import {exampleModel as model} from "../../models/models";
import {IndexScreen} from "../../components/screens/IndexScreen";
import {fetchExamples, removeExample} from "../../store/actions/actions";
import {exampleItems} from "../../models/example";

const mapStateToProps = (state) => {
    return {
        items: exampleItems,
        loading: false,
        pagination: {
            total: 1,
            perPage: 10,
            current: 1,
            link: ''
        },
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetch: (params) => dispatch(fetchExamples(params)),
    remove: (id) => dispatch(removeExample(id))
});

const initialProps = {
    title: model.plural,
    fields: model.getDisplayFields()
};

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    const actions = model.getActions(props);
    const finalProps = {...props, ...initialProps, actions};
    return <IndexScreen {...finalProps} />;
});