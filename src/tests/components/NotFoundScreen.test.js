import React from 'react';
import { shallow } from 'enzyme';
import {NotFoundScreen} from '../../components/screens/NotFoundScreen';

test('should render NotFoundPage correctly', () => {
    const wrapper = shallow(<NotFoundScreen />);
    expect(wrapper).toMatchSnapshot();
});