import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import debounce from 'debounce';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TopicTag } from 'components/molecules/TopicTag';
import { InfoBlock } from 'components/molecules/InfoBlock';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import classNames from 'classnames';
import {
  roadMapNodesAtom,
  addNodesToRoadMapAction,
  addNodeToRoadmapNodeAction,
  addNewRoadMapNodeAction,
  deleteNodeFromRoadMapAction,
  ID,
  Node,
  RoadMapNode,
  changeRoadMapTitleAction,
} from 'store/nodes';
import { v4 as uuid } from 'uuid';

import { useAction, useAtom } from '@reatom/react';
import { query, addNewRoadMap } from './index.gql';
import { Search, SearchVariables } from './__generated__/Search';
import { AddNewRoadMap, AddNewRoadMapVariables } from './__generated__/AddNewRoadMap';

import { Props } from './props';
import './styles.scss';
import { Row } from '../../molecules/Row';

export const CustomRoadMapPage: FC<Props> = (props) => {
  const [searchNodes, { data: rawSearchNodes, loading }] = useLazyQuery<Search, SearchVariables>(
    query,
  );

  const [addRoadMap, { loading: addRoadmapLoading }] = useMutation<
    AddNewRoadMap,
    AddNewRoadMapVariables
  >(addNewRoadMap);

  const nodes = useAtom(roadMapNodesAtom);
  const addNodes = useAction(addNodesToRoadMapAction);
  const changeRoadMapTitle = useAction(changeRoadMapTitleAction);
  const addNodeToRoadmap = useAction(addNodeToRoadmapNodeAction);
  const addNewRoadMapNode = useAction(addNewRoadMapNodeAction);
  const deleteNodeFromRoadMap = useAction(deleteNodeFromRoadMapAction);
  const { className, ...rest } = props;
  const [open, setOpen] = useState<Set<ID>>(new Set());
  const [searchString, setSearchString] = useState('s');

  const [roadmapTitle, setRoadmapTitle] = useState<string>('New Roadmap');
  const [selectedRoadMapNode, setSelectedRoadMapNode] = useState<ID>(1);
  const [editableRoadMapNode, setEditableRoadMapNode] = useState<ID>(1);

  const selectRoadMapNode = useCallback(
    (id: ID): any => (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedRoadMapNode(id);
    },
    [setSelectedRoadMapNode],
  );
  const selectEditableMapNode = useCallback(
    (id: ID): any => (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setEditableRoadMapNode(id);
    },
    [setEditableRoadMapNode],
  );
  const addNewRoadmapNode = useCallback(
    (id: ID): any => (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      addNewRoadMapNode({ parentRoadMap: id });
    },
    [setEditableRoadMapNode],
  );
  const updateRoadMapField: any = useCallback(
    (e: any) => {
      e.stopPropagation();
      const v = roadmapTitle.trim();
      if (v && editableRoadMapNode) {
        changeRoadMapTitle({ id: editableRoadMapNode, title: v });
        setEditableRoadMapNode('');
        setRoadmapTitle('');
      }
    },
    [roadmapTitle],
  );

  const onSearchChange = useCallback((e) => {
    setSearchString(e.target.value);
  }, []);
  const onRoadMapTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setRoadmapTitle(e.target.value);
    },
    [setRoadmapTitle],
  );

  const fetchNodes = useCallback(
    debounce((str: string) => {
      searchNodes({
        variables: { searchString: str },
      });
    }, 250),
    [],
  );

  useEffect(() => {
    if (searchString) {
      fetchNodes(searchString);
    }
  }, [searchString]);

  const foundNodes = useMemo(() => {
    if (rawSearchNodes) {
      return (
        rawSearchNodes.Leaf?.map((n) => ({
          id: n?.uuid || '',
          title: n?.title || '',
          tableOfContents: [],
          type: 'Node',
          completed: n?.isComplete,
        })) || []
      );
    }
    return [];
  }, [rawSearchNodes]);

  const isOpen = (id: ID) => open.has(id);
  const isLeaf = (id: ID) => !nodes[id]?.childes?.length;
  const getChildes = (id: ID) => nodes[id]?.childes;
  const onClick = useCallback(
    (id: ID) => {
      if (open.has(id)) {
        open.delete(id);
      } else {
        open.add(id);
      }

      setOpen(new Set(open));
    },
    [open],
  );

  const onAddRoadMapClick = (id: ID) => {
    const node = nodes[id];
    const l = foundNodes.find(({ id: foundId }) => foundId === id)!;
    if (node && node.type === 'Node' && node.parentId) {
      const { childes } = nodes[node.parentId];
      if (childes.includes(id)) return;
    }
    addNodeToRoadmap({ node: (l as unknown) as Node, roadmapId: selectedRoadMapNode });
  };

  const onDeleteFromRoadMapNode = (id: ID) => () => {
    deleteNodeFromRoadMap(id);
    const { parentId } = nodes[id];
  };

  const saveRoadMap = () => {
    addRoadMap({
      variables: {
        data: Object.entries(nodes)
          .filter((n) => n[1].type === 'Roadmap')
          .map((n) => n[1] as RoadMapNode)
          .map((n) => ({
            uuid: (n.id === 1 ? uuid() : n.id) as string,
            title: n.title,
            next: n.next as string[],
            nodes: n.nodes as string[],
          })),
      },
    });
  };

  return (
    <div className={classNames('d-flex flex-column road-map', className)} {...rest}>
      <header className="container-fluid road-map__header d-flex flex-column">
        <h1 className="road-map__title">Make your own roadmap</h1>
        <p className="road-map__text">
          A knowledge map is a visual aid that shows where knowledge can be found within a group or organization, and how to find those with the most expertise. «Knowledge is a high-value form of information that is ready to apply to decisions and actions, [and that] knowledge derives from information as information derives from data.»

        </p>
      </header>
      <div
        style={{ height: 5000 }}
        className="container-fluid road-map__tree mt-3 d-flex flex-column mt-5"
      >
        <div>
          <Button onClick={saveRoadMap}>Save Roadmap</Button>
        </div>
        <div className="d-flex">
          <div className="col-7">
            <Row
              isRoot={true}
              current={1}
              onClick={onClick}
              isOpen={isOpen}
              isLeaf={isLeaf}
              getChildes={getChildes}
            >
              {(id) => {
                const { title, type, parentId } = nodes[id];
                const isEdit = id === editableRoadMapNode;
                if (type === 'Roadmap') {
                  return (
                    <div className="d-flex">
                      <FormGroup className="mb-0 mr-3" labelInfo="(required)">
                        <InputGroup
                          onChange={onRoadMapTitleChange}
                          disabled={!isEdit}
                          value={isEdit ? roadmapTitle : title}
                        />
                      </FormGroup>
                      <Button onClick={selectRoadMapNode(id)} className="mr-3" icon="select">
                        Pick
                      </Button>
                      {isEdit ? (
                        <Button onClick={updateRoadMapField} className="mr-3" icon="edit">
                          Save
                        </Button>
                      ) : (
                        <Button onClick={selectEditableMapNode(id)} className="mr-3" icon="edit">
                          Edit
                        </Button>
                      )}
                      <Button
                        onClick={addNewRoadmapNode(id)}
                        className="mr-3"
                        icon="git-new-branch"
                      >
                        Add branch
                      </Button>
                      {parentId && <Button onClick={onDeleteFromRoadMapNode(id)}>Delete</Button>}
                    </div>
                  );
                }
                return (
                  <TopicTag
                    isComplete={(nodes[id] as Node).completed}
                    className="road-map__foundNodes mb-3 mr-3"
                    key={id}
                    text={title}
                  >
                    <InfoBlock
                      isComplete={(nodes[id] as Node).completed}
                      nodeId={id}
                      text={title}
                      tableOfContents={[]}
                      actions={[{ text: 'Delete Node', onClick: deleteNodeFromRoadMap }]}
                    />
                  </TopicTag>
                );
              }}
            </Row>
          </div>
          <div className="col-5">
            <div className="d-flex flex-column road-map__form">
              <FormGroup
                helperText="Find what you want to learn by keywords"
                label="Search"
                labelFor="text-input"
                labelInfo="(required)"
              >
                <InputGroup onChange={onSearchChange} leftIcon="search" id="search" />
              </FormGroup>

              <div className="d-flex flex-wrap mt-5">
                {foundNodes.map((n) => (
                  <TopicTag
                    isComplete={Boolean(n.completed)}
                    className="road-map__foundNodes mb-3 mr-3"
                    key={n.id}
                    text={n.title}
                  >
                    <InfoBlock
                      isComplete={Boolean(n.completed)}
                      nodeId={n.id}
                      text={n.title}
                      actions={[
                        {
                          text: `Add to ${nodes[selectedRoadMapNode].title}`,
                          onClick: onAddRoadMapClick,
                        },
                      ]}
                      tableOfContents={n.tableOfContents}
                    />
                  </TopicTag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
