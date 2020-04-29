import React, { FC } from 'react';
import { useParams } from 'react-router';
import Markdown from 'react-markdown';

import { TableOfContents } from './libs/TableOfContents';
import { Props } from './props';
import './styles.scss';

export const LearnNodePage: FC<Props> = (props) => {
  const { nodeID } = useParams();
  return (
    <div className="container d-flex flex-column">
      <h1>Learn: CSA</h1>
      <div className="w-100 mt-4 d-flex">
        <div className="col-8 pl-0">
          <Markdown source="It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)" />
        </div>
        <div className="col-3 pr-0 justify-content-end">
          <TableOfContents
            className="justify-content-end"
            contents={[
              { text: 'Basis definition', active: true, onClick: console.log.bind(null, 1) },
              { text: 'Basis definition', active: false, onClick: console.log.bind(null, 1) },
              { text: 'Basis definition', active: false, onClick: console.log.bind(null, 1) },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
