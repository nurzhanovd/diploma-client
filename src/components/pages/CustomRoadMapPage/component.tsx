import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Row } from 'components/molecules/Row';
import { Payload } from 'components/organisms/ExpandableCourse';

import { addNode } from './services/addNode';
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

  useEffect(() => {
    setTimeout(() => {
      setPayload((p) => addNode(p, { id: 5, parentId: 3, title: 'Kek2', childes: [] }, 3));
    }, 3000);
  }, []);

  const onClick = (id: string | number) => {
    if (open.has(id)) {
      open.delete(id);
    } else {
      open.add(id);
    }

    setOpen(new Set(open));
  };
  const isOpen = (id: any) => open.has(id);

  return (
    <div className={classNames('d-flex flex-column road-map', className)} {...rest}>
      <header className="container-fluid road-map__header d-flex flex-column">
        <h1 className="road-map__title">Make your own roadmap</h1>
        <p className="road-map__text">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
        </p>
        <button className="road-map__action" type="button">
          Create new one
        </button>
      </header>
      <section className="container-fluid road-map__filter">
        <div className="container d-flex align-items-center h-100">
          <p className="mr-4 road-map__filter-title">Filter by:</p>
          <div className="flex-grow-1 d-flex" />
        </div>
      </section>
      <div style={{ height: 5000 }} className="container road-map__tree mt-3">
        <Row
          current={payload.data[payload.root]}
          payload={payload}
          onClick={onClick}
          isOpen={isOpen}
          isRoot={true}
        />
      </div>
    </div>
  );
};
