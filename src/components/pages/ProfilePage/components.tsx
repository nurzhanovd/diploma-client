import React, { FC, useState } from 'react';
import { Icon, Tabs, Tab, TabId } from '@blueprintjs/core';
import { PersonalInfoCard } from 'components/organisms/PersonalInfoCard';
import { Props } from './props';

import './styles.scss';

const Test: FC<{}> = () => (
  <div>
    <p>asd</p>
  </div>
);

export const ProfilePage: FC<Props> = (props) => {
  const [tabId, setTabId] = useState<TabId>('about');
  return (
    <div className="container profile-page d-flex justify-content-between">
      <div className="row flex-wrap w-100">
        <div className="col-4 no-gutters px-0">
          <img
            className="profile-page__avatar w-100"
            src="/images/default-avatar.png"
            alt="avatar"
          />
        </div>
        <div className="offset-1" />
        <div className="col-7 no-gutters px-0 flex-column">
          <div className="d-flex align-items-center">
            <h2 className="profile-page__fullname mr-3">Jack London</h2>
            <p className="profile-page__location">
              <Icon icon="map-marker" className="mr-1" />
              Almaty, KZ
            </p>
          </div>
          <Tabs animate large onChange={setTabId} selectedTabId={tabId}>
            <Tab id="skills" title="Skills" panel={<Test />} />
            <Tab
              id="about"
              title="About"
              panel={
                <PersonalInfoCard
                  phone="+1 123 456 78 89"
                  address="Main street"
                  birthday={new Date()}
                  gender="Male"
                  email="test@gmail.com"
                />
              }
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
};
