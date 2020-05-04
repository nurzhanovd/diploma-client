import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormGroup, InputGroup, Label } from '@blueprintjs/core';
import classNames from 'classnames';
import { Row } from 'components/molecules/Row';
import { Payload } from 'components/organisms/ExpandableCourse';

import { addNode } from './services/addNode';
import { deleteNode } from './services/deleteNode';
import { Fog } from './libs/Fog';
import { Props } from './props';
import './styles.scss';

const init: Payload = {
  root: 1,
  data: {
    1: {
      id: 1,
      title: 'Frontend',
      childes: [2, 3],
    },
    2: {
      id: 2,
      parentId: 1,
      title: 'Javascript',
      childes: [],
    },
    3: {
      id: 3,
      parentId: 1,
      title: 'CSS',
      childes: [4],
    },
    4: {
      id: 4,
      parentId: 3,
      title: 'Kek',
      childes: [],
    },
  },
};

export const CustomRoadMapPage: FC<Props> = (props) => {
  const { className, ...rest } = props;
  const [open, setOpen] = useState<Set<string | number>>(new Set());
  const [payload, setPayload] = useState<Payload>(init);

  const [fogs] = useState([{ text: 'Strategy' }, { text: 'Template Method' }]);

  useEffect(() => {
    setTimeout(() => {
      setPayload((p) => addNode(p, { id: 5, parentId: 3, title: 'Kek2', childes: [] }, 3));
    }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPayload((p) => deleteNode(p, { id: 5, parentId: 3, title: 'Kek2', childes: [] }));
    }, 8000);
  }, []);

  const onClick = useCallback(
    (id: string | number) => {
      if (open.has(id)) {
        open.delete(id);
      } else {
        open.add(id);
      }

      setOpen(new Set(open));
    },
    [open],
  );
  const isOpen = (id: any) => open.has(id);
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
      <div style={{ height: 5000 }} className="container-fluid road-map__tree mt-3 d-flex justify-content-between mt-5">
        <div className="col-6">
          <Row
            current={payload.data[payload.root]}
            payload={payload}
            onClick={onClick}
            isOpen={isOpen}
            isRoot={true}
          />
        </div>
        <div className="col-6">
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
              <InputGroup leftIcon="search" id="search" />
            </FormGroup>

            <div className="d-flex flex-column mt-5">
              {fogs.map((n) => (
                <Fog text={n.text} onClick={console.log} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
