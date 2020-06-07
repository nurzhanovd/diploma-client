import React, { createRef, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TopicTag } from 'components/molecules/TopicTag';
import Markdown from 'react-markdown';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { fulfillNode, queryNode } from './index.gql';
import { FulfillNode, FulfillNodeVariables } from './__generated__/FulfillNode';
import { Node, NodeVariables } from './__generated__/Node';
import { TableOfContents } from './libs/TableOfContents';
import { Props } from './props';
import { parsePayload } from './services/parsePayload';
import './styles.scss';

const userId = '2ebad554-448b-4543-986d-d9e31326a7ae';

export const LearnNodePage: FC<Props> = () => {
  const { nodeId: uuid } = useParams();
  const refs = useMemo(
    () =>
      Array(3)
        .fill(1)
        .map(() => createRef<HTMLDivElement>()),
    [],
  );
  const { data, loading: nodeLoading, refetch } = useQuery<Node, NodeVariables>(queryNode, {
    variables: { userId, nodeId: uuid },
  });

  const [fulfill, { loading }] = useMutation<FulfillNode, FulfillNodeVariables>(fulfillNode);
  const onFulfillButtonClick = () => {
    fulfill({ variables: { uuid } });
    refetch();
  };
  const [currentNode, setCurrentNode] = useState(0);
  const findMaxVisibleNode: IntersectionObserverCallback = useCallback(
    (entries) => {
      let maxIndex = 0;
      entries.forEach((n, i) => {
        if (n.intersectionRatio >= entries[maxIndex].intersectionRatio) {
          maxIndex = i;
        }
      });
      const { target } = entries[maxIndex];
      const maxVisibleNode = refs.findIndex((n) => n.current === target);
      setCurrentNode((prev) => (maxVisibleNode >= 0 ? maxVisibleNode : prev));
    },
    [refs],
  );
  const observer = useMemo(() => new IntersectionObserver(findMaxVisibleNode, { threshold: 0.5 }), [
    findMaxVisibleNode,
  ]);

  useEffect(() => {
    refs.forEach((n) => {
      if (n.current) {
        observer.observe(n.current);
      }
    });
    return () => observer.disconnect();
  }, [refs, observer]);

  const payload = useMemo(() => {
    return parsePayload(data!);
  }, [data]);

  const { title, childes, tableOfContents, content, neighbours, parent, isComplete } =
    payload || {};

  return payload ? (
    <div className="container d-flex flex-column learn-node-page">
      <div className="d-flex flex-column mb-4">
        <div className="mb-3">
          <h1 className="learn-node-page__title ">{`Node: ${title}`}</h1>
          {isComplete && <h3 className="success">Completed !</h3>}
        </div>
        <p className="learn-node-page__amount-of-topics">{`${content!.length} topics`}</p>
      </div>
      <div className="d-flex">
        <button
          onClick={onFulfillButtonClick}
          type="button"
          className="learn-node-page__complete-node-btn"
        >
          Complete this node
        </button>
      </div>
      <div className="w-100 mt-4 d-flex justify-content-between mb-5">
        <div className="col-7 pl-0 d-flex flex-column markdown">
          <div className="mb-5">
            {content!.map((n, i) => (
              <div key={n} ref={refs[i]}>
                <Markdown source={n} />
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={onFulfillButtonClick}
              type="button"
              className="learn-node-page__complete-node-btn"
            >
              Complete this node
            </button>
          </div>
        </div>
        <div className="col-4 pr-0 justify-content-end">
          {parent && parent.text && parent.nodeId ? (
            <div className="mb-4">
              <p className="learn-node-page__topic-title mb-2">Parent Topic</p>
              <TopicTag className="learn-node-page__topic-tag" {...parent} />
            </div>
          ) : (
            <></>
          )}
          {neighbours && neighbours.length ? (
            <div className="mb-4">
              <p className="learn-node-page__topic-title mb-2">Neighbours Topics:</p>
              <div className="d-flex flex-wrap">
                {neighbours.map((n) => (
                  <TopicTag className="learn-node-page__topic-tag mr-3 mb-3" {...n} />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          {childes && childes.length ? (
            <div className="mb-4">
              <p className="learn-node-page__topic-title mb-2">Next Topics:</p>
              <div className="d-flex flex-wrap">
                {childes.map((n) => (
                  <TopicTag className="learn-node-page__topic-tag mr-3 mb-3" {...n} />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          <TableOfContents
            className="learn-node-page__table-of-contents"
            contents={tableOfContents!.map((n) => ({
              text: n,
              onClick: console.log.bind(null, 1),
            }))}
            activeContentIndex={currentNode}
          />
        </div>
      </div>
    </div>
  ) : null;
};
