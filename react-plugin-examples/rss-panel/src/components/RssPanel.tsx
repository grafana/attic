import React, { PureComponent } from 'react';
import Feed from 'rss-to-json';
import { PanelProps } from '@grafana/ui';

import { RssFeedRow } from './RssFeedRow';

import { RssFeed, RssOptions } from '../types';

interface Props extends PanelProps<RssOptions> {}

interface State {
  rssFeed: RssFeed;
  isError: boolean;
}

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export class RssPanel extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      rssFeed: {} as RssFeed,
      isError: false,
    };
  }

  componentDidMount(): void {
    this.loadFeed(this.props.options.feedUrl);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.options.feedUrl !== prevProps.options.feedUrl) {
      this.loadFeed(this.props.options.feedUrl);
    }
  }

  loadFeed(feedUrl: string) {
    Feed.load(CORS_PROXY + feedUrl, (error, feed) => {
      if (error) {
        console.error(error);
        this.setState({ isError: true });
        return;
      }

      this.setState({
        rssFeed: feed,
        isError: false,
      });
    });
  }

  render() {
    const { isError, rssFeed } = this.state;

    if (rssFeed.items && rssFeed.items.length > 1) {
      return (
        <div
          style={{
            padding: '24px 0',
            maxHeight: '100%',
            overflow: 'scroll',
          }}
        >
          {rssFeed.items.map((item, index) => {
            return <RssFeedRow key={`${item.created}-${index}`} item={item} />;
          })}
        </div>
      );
    }

    if (isError) {
      return <div>Error :(</div>;
    }

    return <div>Loading...</div>;
  }
}
