import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => {
      return store[key];
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: key => {
      delete store[key];
    },
  };
})();

const global = window as any;
global.localStorage = localStorageMock;
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });
