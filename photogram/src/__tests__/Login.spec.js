import renderer from 'react-test-renderer';
import Login from '../components/Login';

describe('LoginForm should', () => {
  test('be rendered', () => {
    const tree = renderer.create(<Login />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
