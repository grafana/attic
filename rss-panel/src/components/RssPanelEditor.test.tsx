import React from 'react';
import { shallow } from 'enzyme';
import { RssPanelEditor } from './RssPanelEditor';
import { PanelEditorProps } from '@grafana/ui';
import { RssOptions } from '../types';

const setup = (propOverrides?: Partial<PanelEditorProps<RssOptions>>) => {
  const props: PanelEditorProps<RssOptions> = {
    options: {
      feedUrl: 'some/url',
    },
    onOptionsChange: jest.fn(),
  };

  Object.assign(props, propOverrides);

  return shallow(<RssPanelEditor {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
