import React, { createRef, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TopicTag } from 'components/molecules/TopicTag';
import { getBreadCrumb } from 'components/molecules/Row';
import Markdown from 'react-markdown';

import { payload } from 'core/mocks/payload';
import { content } from 'core/mocks/content';
import { TableOfContents } from './libs/TableOfContents';
import { Props } from './props';
import './styles.scss';

export const LearnNodePage: FC<Props> = () => {
  const nodeId = 1;
  const refs = useMemo(
    () =>
      Array(3)
        .fill(1)
        .map(() => createRef<HTMLDivElement>()),
    [],
  );
  const { contents, markdown } = content[nodeId];
  const { title, childes } = payload.data[nodeId];
  const nextTopics = useMemo(
    () =>
      childes.map((n: any) => ({
        nodeId: n,
        text: payload.data[n].title,
        breadCrumb: getBreadCrumb(payload, payload.data[n]),
      })),
    [childes],
  );
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

  return (
    <div className="container d-flex flex-column learn-node-page">
      <h1 className="learn-node-page__title mb-2">{`Node: ${title}`}</h1>
      <p className="learn-node-page__amount-of-topics mb-4">{`${contents.length} topics`}</p>
      <div className="d-flex">
        <button type="button" className="learn-node-page__complete-node-btn">
          Complete this node
        </button>
      </div>
      <div className="w-100 mt-4 d-flex justify-content-between mb-5">
        <div className="col-7 pl-0 d-flex flex-column markdown">
          <div className="mb-5">
            {(markdown as any[]).map((n, i) => (
              <div key={i.toString()} ref={refs[i]}>
                <Markdown source={n} />
              </div>
            ))}
          </div>
          <div>
            <button type="button" className="learn-node-page__complete-node-btn">
              Complete this node
            </button>
          </div>
        </div>
        <div className="col-4 pr-0 justify-content-end">
          <div className="mb-4">
            <p className="learn-node-page__topic-title mb-2">Next Topics:</p>
            <div className="d-flex flex-wrap">
              {nextTopics.map((n) => (
                <TopicTag className="learn-node-page__topic-tag mr-3 mb-3" {...n} />
              ))}
            </div>
          </div>
          <TableOfContents
            className="learn-node-page__table-of-contents"
            contents={(contents as string[]).map((n) => ({
              text: n,
              onClick: console.log.bind(null, 1),
            }))}
            activeContentIndex={currentNode}
          />
        </div>
      </div>
    </div>
  );
};
