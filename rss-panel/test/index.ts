// const context = require.context('./', true, /_specs\.ts/);
// context.keys().forEach(context);
// module.exports = context;

import '@babel/polyfill';
import 'jquery';

// configure enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const context = (require as any).context('../', true, /specs\.(tsx?|js)/);
for (const key of context.keys()) {
  context(key);
}
