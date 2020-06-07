import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'debounce';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TopicTag } from 'components/molecules/TopicTag';
import { InfoBlock } from 'components/molecules/InfoBlock';
import { FormGroup, InputGroup, Label, Button } from '@blueprintjs/core';
import classNames from 'classnames';
import {
  roadMapNodesAtom,
  addNodesToRoadMapAction,
  addNodeToRoadmapNodeAction,
  addNewRoadMapNodeAction,
  ID,
  changeRoadMapTitleAction,
} from 'store/nodes';

import { useAction, useAtom } from '@reatom/react';
import { query } from './index.gql';
import { Search, SearchVariables } from './__generated__/Search';

import { Props } from './props';
import './styles.scss';
import { Row } from '../../molecules/Row';

export const CustomRoadMapPage: FC<Props> = (props) => {
  const nodes = useAtom(roadMapNodesAtom);
  const addNodes = useAction(addNodesToRoadMapAction);
  const changeRoadMapTitle = useAction(changeRoadMapTitleAction);
  const addNodeToRoadmap = useAction(addNodeToRoadmapNodeAction);
  const addNewRoadMapNode = useAction(addNewRoadMapNodeAction);
  const { className, ...rest } = props;
  const [open, setOpen] = useState<Set<ID>>(new Set());
  const [searchString, setSearchString] = useState('');

  const [roadmapTitle, setRoadmapTitle] = useState<string>('New Roadmap');
  const [selectedRoadMapNode, setSelectedRoadMapNode] = useState<ID>(1);
  const [editableRoadMapNode, setEditableRoadMapNode] = useState<ID>(1);
  const [searchNodes, { data: rawSearchNodes, loading }] = useLazyQuery<Search, SearchVariables>(
    query,
  );

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
        variables: { searchString: str, rootId: 'cc7caae6-1a6d-4330-8ba2-e7bb76ca51d4' },
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
        rawSearchNodes.RoadMapSearch?.map((n) => ({
          id: n?.uuid || '',
          title: n?.title || '',
          tableOfContents: [],
          childes: [],
          type: 'Node',
        })) || []
      );
    }
    return [];
  }, [rawSearchNodes]);

  useEffect(() => {
    if (foundNodes && foundNodes.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      addNodes(Object.fromEntries(foundNodes.map((n) => [n.id, n])));
    }
  }, [foundNodes]);

  const isOpen = (id: ID) => open.has(id);
  const isLeaf = (id: ID) => !nodes[id]?.childes;
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
    addNodeToRoadmap({ nodeId: id, roadmapId: selectedRoadMapNode });
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
        className="container-fluid road-map__tree mt-3 d-flex justify-content-between mt-5"
      >
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
              const { title, type } = nodes[id];
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
                    <Button onClick={addNewRoadmapNode(id)} className="mr-3" icon="git-new-branch">
                      Add branch
                    </Button>
                  </div>
                );
              }
              return (
                <TopicTag className="road-map__foundNodes mb-3 mr-3" key={id} text={title}>
                  <InfoBlock nodeId={id} text={title} actions={[]} tableOfContents={[]} />
                </TopicTag>
              );
            }}
          </Row>
        </div>
        <div className="col-5">
          <div className="d-flex flex-column road-map__form">
            <Label>
              Category (required)
              <div className="bp3-select bp3-large">
                <select defaultValue="1">
                  <option value="1">All</option>
                  <option value="2">Computer Science</option>
                  <option value="3">Management</option>
                  <option value="4">Data Science</option>
                </select>
              </div>
            </Label>
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
                <TopicTag className="road-map__foundNodes mb-3 mr-3" key={n.id} text={n.title}>
                  <InfoBlock
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
  );
};
