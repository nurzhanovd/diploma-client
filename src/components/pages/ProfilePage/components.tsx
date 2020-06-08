import React, { FC, useEffect, useState, useMemo } from 'react';
import { gql } from 'apollo-boost';
import { Icon, Tabs, Tab, TabId } from '@blueprintjs/core';
import { PersonalInfoCard } from 'components/organisms/PersonalInfoCard';
import { Row } from 'components/molecules/Row';

import { client } from 'core/graphql';
import { Props } from './props';

import './styles.scss';

function Roadmap(props: { rootId: string; nodes: Record<string, Node>; rels: Rel }) {
  const { nodes, rels, rootId } = props;
  const [set, setSet] = useState(new Set());
  const onClick = (id: string | number) => {
    if (set.has(id)) {
      set.delete(id);
    } else set.add(id);

    setSet(new Set(set));
  };
  const isOpen = (id: string | number) => set.has(id);
  const isLeaf = (id: string | number) => !rels[id];
  const getChildes = (id: string | number) => rels[id] || [];
  return (
    <Row
      isRoot={true}
      current={rootId}
      onClick={onClick}
      isOpen={isOpen}
      isLeaf={isLeaf}
      getChildes={getChildes}
    >
      {(id) => {
        const { title } = nodes[id];
        return <div>{title}</div>;
      }}
    </Row>
  );
}

const Test: FC<{}> = () => (
  <div>
    <p>asd</p>
  </div>
);

type Node = {
  title: string;
  uuid: string;
};

type Rel = Record<string, string[]>;

const makeTree = (rels: any) => {
  const child: Record<string, string[]> = {};

  rels.forEach((n: any) => {
    const { from, to } = n as { from: string; to: string };
    if (child[from as string]) {
      child[from] = [...child[from], to];
    } else child[from] = [to];
  });
  return child;
};

export const ProfilePage: FC<Props> = (props) => {
  const [tabId, setTabId] = useState<TabId>('about');
  const [rootRoadMapsId, setRootRoadMapsId] = useState<string[]>([]);
  const [roadMaps, setRoadmaps] = useState<Array<{ nodes: Record<string, Node>; rels: Rel }>>([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          query RootRoadMap {
            rootRoadMapsId: DauletGetUserRoadMapID
          }
        `,
      })
      .then((r) => {
        setRootRoadMapsId(r.data.rootRoadMapsId);
      })
      .catch();
  });

  useEffect(() => {
    if (rootRoadMapsId.length) {
      Promise.all(
        rootRoadMapsId.map((id) =>
          client.query({
            query: gql`
              query FetcnRoadMap {
                GetRoadMap(uuid: "${id}") {
                  nodes {
                    title
                    uuid
                  }
                  rels {
                    from
                    to
                  }
                }
              }
            `,
          }),
        ),
      )
        .then((r) => {
          setRoadmaps(
            r.map(({ data: { GetRoadMap: { nodes, rels } } }) => ({
              nodes: Object.fromEntries(nodes.map((n: any) => [n.uuid, n])),
              rels: makeTree(rels),
            })),
          );
        })
        .catch();
    }
  }, [rootRoadMapsId]);

  useEffect(() => {
    console.log(roadMaps);
  }, [roadMaps]);

  return (
    <div className="container profile-page d-flex justify-content-between">
      <div className="row flex-wrap w-100">
        <div className="col-6 no-gutters px-0 flex-column">
          {roadMaps.length && roadMaps.map((n) => (
            <Roadmap rootId={n.nodes[0].uuid} {...n} />
          ))}
        </div>
      </div>
    </div>
  );
};
