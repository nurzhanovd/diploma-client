import React, { ChangeEventHandler, FC, useState } from 'react';
import classNames from 'classnames';
import { declareAction, declareAtom } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import { RegisterPayload, Payload } from 'components/pages/SignUp/types';
import { CategoryTag } from 'components/atoms/CategoryTag';
import { Button, Colors, FormGroup, InputGroup } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';

import { Props } from './props';
import './styles.scss';

const setField = declareAction<Payload>('setField');
const atom = declareAtom<RegisterPayload>(
  { email: '', name: '', surname: '', password: '', username: '', confirmPassword: '' },
  (on) => [on(setField, (state, { name, value }) => ({ ...state, [name]: value }))],
);

const tags = [
  'IT',
  'Software Development',
  'Computer Science',
  'Data Science',
  'Programming Languages',
  'IT Management',
  'IT Journalism',
];

export const SignUp: FC<Props> = (props: Props) => {
  useAtom(atom);
  const { push } = useHistory();
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const onChange = useAction<ChangeEventHandler<HTMLInputElement>>((e) =>
    setField({ name: e.target.name, value: e.target.value }),
  );
  return (
    <div className="sign-up d-flex flex-column">
      <h1 style={{ color: '#137cbd' }} className="bp3-heading mb-2">
        Everything happens first time!
      </h1>
      <h3 style={{ color: Colors.GRAY2 }} className="bp3-running-text mb-4">
        Sign up for getting access to our app
      </h3>
      {step === 1 ? (
        <form className="col-12 px-0">
          <FormGroup className="mb-2 sign-up__label" label="Name" labelFor="name" intent="primary">
            <InputGroup large onChange={onChange} name="name" id="name" intent="primary" />
          </FormGroup>
          <FormGroup
            className="mb-2 sign-up__label"
            label="Surname"
            labelFor="surname"
            intent="primary"
          >
            <InputGroup large onChange={onChange} name="surname" id="surname" intent="primary" />
          </FormGroup>
          <FormGroup
            className="mb-2 sign-up__label"
            label="Email"
            labelFor="email"
            intent="primary"
          >
            <InputGroup
              large
              onChange={onChange}
              name="email"
              id="email"
              intent="primary"
              type="email"
            />
          </FormGroup>
          <FormGroup
            className="mb-2 sign-up__label"
            label="Username"
            labelFor="username"
            intent="primary"
          >
            <InputGroup large onChange={onChange} name="username" id="username" intent="primary" />
          </FormGroup>
          <FormGroup className="mb-2 sign-up__label" label="Password" labelFor="password">
            <InputGroup
              large
              onChange={onChange}
              name="password"
              id="password"
              type="password"
              intent="primary"
              autoComplete="new-password"
            />
          </FormGroup>
          <FormGroup
            className="mb-2 sign-up__label"
            label="Confirm password"
            labelFor="confirmPassword"
          >
            <InputGroup
              large
              onChange={onChange}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              intent="primary"
              autoComplete="new-password"
            />
          </FormGroup>
          <Button
            color="white"
            rightIcon="chevron-right"
            text="Next"
            className="w-100 mt-3 sign-up__submit-button"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              setStep(2);
            }}
            large
            outlined
          />
        </form>
      ) : (
        <div className="d-flex flex-column tag-list">
          <p className="tag-list__text mb-2">Choose what you want to learn</p>
          <div className="d-flex flex-wrap">
            {selectedTags.map((n) => (
              <div key={n} className="d-flex selected-tag mb-2">
                <span className="selected-tag__text">{n}</span>
                <span
                  onClick={() => setSelectedTags((s) => s.filter((m) => n !== m))}
                  className="selected-tag__close"
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap">
            {tags.map((n) => (
              <CategoryTag
                key={n}
                title={n}
                onClick={() => {
                  setSelectedTags((s) => [...s, n]);
                }}
                className={classNames('sign-up__category-tag', {
                  'd-none': selectedTags.includes(n),
                })}
              />
            ))}
          </div>
          <Button
            color="white"
            rightIcon="chevron-right"
            text="Next"
            className="w-100 mt-3 sign-up__submit-button"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              push('/about');
            }}
            large
            outlined
          />
        </div>
      )}
      <Link to="/auth/sign-in">
        <Button className="sign-up__sign-in-link" icon="map-create" text="Sign In" />
      </Link>
    </div>
  );
};
