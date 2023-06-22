import React from 'react';
import { render } from 'react-native-testing-library';
import App from './App';

describe('<App />', () => {
  it('renders correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});