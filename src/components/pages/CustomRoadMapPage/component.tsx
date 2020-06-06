import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'debounce';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react';
import { FormGroup, InputGroup, Label } from '@blueprintjs/core';
import classNames from 'classnames';
import { Row } from 'components/molecules/Row';
import { Payload } from 'components/organisms/ExpandableCourse';

import { query } from './index.gql';
import { Search, SearchVariables } from './__generated__/Search';

import { Fog } from './libs/Fog';
import { Props } from './props';
import './styles.scss';

const init: Payload = {
  root: 1,
  data: {
    1: {
      id: 1,
      title: 'Frontend',
      childes: ['2', '3'],
      tableOfContents: [],
    },
    2: {
      id: 2,
      parentId: '1',
      title: 'Javascript',
      childes: [],
      tableOfContents: [],
    },
    3: {
      id: 3,
      parentId: '1',
      title: 'CSS',
      childes: ['4'],
      tableOfContents: [],
    },
    4: {
      id: 4,
      parentId: '3',
      title: 'Display',
      childes: [],
      tableOfContents: [],
    },
  },
};

export const CustomRoadMapPage: FC<Props> = (props) => {
  const { className, ...rest } = props;
  const [open, setOpen] = useState<Set<string | number>>(new Set());
  const [payload, setPayload] = useState<Payload>(init);
  const [searchString, setSearchString] = useState('');

  const [searchNodes, { data, loading }] = useLazyQuery<Search, SearchVariables>(query);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearchString(e.target.value);
  }, []);

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
      console.log('searchString', searchString);
      fetchNodes(searchString);
    }
  }, [searchString]);

  const [fogs] = useState([{ text: 'Strategy' }, { text: 'Template Method' }]);

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
      <div
        style={{ height: 5000 }}
        className="container-fluid road-map__tree mt-3 d-flex justify-content-between mt-5"
      >
        <div className="col-7">
          {/* <Row */}
          {/*  current={payload.data[payload.root]} */}
          {/*  payload={payload} */}
          {/*  onClick={onClick} */}
          {/*  isOpen={isOpen} */}
          {/*  isRoot={true} */}
          {/* /> */}
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
              <InputGroup onChange={onChange} leftIcon="search" id="search" />
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
