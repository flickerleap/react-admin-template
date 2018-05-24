import React from 'react';
import {connect} from 'react-redux';
import {exampleModel as model} from "../../models/models";
import {ViewScreen} from "../../components/screens/ViewScreen";
import moment from "moment/moment";
import {fetchExamples, removeExample} from "../../store/actions/actions";

const items = [
    {
        name: 'Example',
        description: 'Example',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        start_time: moment().format('hh:mm'),
        interests: 'Pottery'
    }
];

const mapStateToProps = (state) => {
    return {
        items: items,
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
    return <ViewScreen {...finalProps} />;
});