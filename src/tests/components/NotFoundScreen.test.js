import React from 'react';
import { shallow } from 'enzyme';
import NotFoundScreen from '../../screens/NotFoundScreen';

test('should render NotFoundPage correctly', () => {
    const wrapper = shallow(<NotFoundScreen />);
    expect(wrapper).toMatchSnapshot();
});