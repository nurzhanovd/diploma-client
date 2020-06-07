import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'debounce';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TopicTag } from 'components/molecules/TopicTag';
import { InfoBlock } from 'components/molecules/InfoBlock';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import classNames from 'classnames';
import {
  roadMapNodesAtom,
  addRootNodeAction,
  addNodeToRoadmapNodeAction,
  addNewRoadMapNodeAction,
  deleteNodeFromRoadMapAction,
  ID,
  Node,
  changeRoadMapTitleAction,
} from 'store/nodes';
import { v4 as uuid } from 'uuid';

import { useAction, useAtom } from '@reatom/react';
import { query } from './index.gql';
import { Search, SearchVariables } from './__generated__/Search';

import { Props } from './props';
import './styles.scss';
import { Row } from '../../molecules/Row';

export const CustomRoadMapPage: FC<Props> = (props) => {
  const [searchNodes, { data: rawSearchNodes, loading }] = useLazyQuery<Search, SearchVariables>(
    query,
  );

  const { data: nodes, root } = useAtom(roadMapNodesAtom);
  const addRootNode = useAction(addRootNodeAction);
  const changeRoadMapTitle = useAction(changeRoadMapTitleAction);
  const addNodeToRoadmap = useAction(addNodeToRoadmapNodeAction);
  const addNewRoadMapNode = useAction(addNewRoadMapNodeAction);
  const deleteNodeFromRoadMap = useAction(deleteNodeFromRoadMapAction);
  useEffect(() => {
    if (!root) {
      addRootNode({
        id: uuid(),
        title: 'My New RoadMap',
        type: 'Roadmap',
        childes: [],
      });
    }
  }, [nodes, root]);


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

  const onCreateClick = () => {
    console.log(nodes);
  };

  return (
    <div className={classNames('d-flex flex-column road-map', className)} {...rest}>
      <header className="container-fluid road-map__header d-flex flex-column">
        <h1 className="road-map__title">Make your own roadmap</h1>
        <p className="road-map__text">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
          of classical Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the
          more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
          cites of the word in classical literature, discovered the undoubtable source.
        </p>
        <button className="road-map__action" type="button">
          Create new one
        </button>
      </header>
      <div
        style={{ height: 5000 }}
        className="container-fluid road-map__tree d-flex flex-column mt-3 d-flex mt-5"
      >
        <div className="mb-5">
          <Button>Create Roadmap</Button>
        </div>
        <div className="d-flex w-100">
          <div className="col-7">
            {root && (
              <Row
                isRoot={true}
                current={root}
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
            )}
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
