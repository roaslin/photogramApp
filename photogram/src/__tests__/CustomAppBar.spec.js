import renderer from 'react-test-renderer';
import CustomAppBar from '../components/CustomAppBar';

describe('CustomAppBar should', () => {
  test('be rendered', () => {
    const tree = renderer.create(<CustomAppBar />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
