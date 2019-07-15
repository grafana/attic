import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { RssItem } from '../types';

interface Props {
  item: RssItem;
}

export const RssFeedRow: FunctionComponent<Props> = ({ item }) => {
  return (
    <a href={item.url} target="_blank">
      <div style={{ display: 'flex', padding: '4px 0' }}>
        <div>{moment(item.created).format('LLL')}</div>
        <div style={{ marginLeft: '16px' }}>{item.title}</div>
      </div>
    </a>
  );
};
