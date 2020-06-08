import React, { createRef, FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Props } from './props';
import './styles.scss';

export const AboutPage: FC<Props> = (props: Props) => {
  const ref = createRef<HTMLDivElement>();
  const vanta: any = window && (window as any).VANTA && (window as any).VANTA.NET;

  useEffect(() => {
    if (ref && ref.current && vanta) {
      vanta({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 600.0,
        minWidth: 200.0,
        color: 'black',
        backgroundColor: '#EEF0F2',
        scale: 1.0,
        scaleMobile: 1.0,
        maxDistance: 23.0,
        spacing: 16.0,
      });
    }
  }, [ref, vanta]);
  return (
    <div className="main-page d-flex flex-column">
      <div className="container-fluid px-0 position-relative">
        <div ref={ref} className="main-page__net #net" />
        <div className="main-page__text">
          <h1 className="mb-3">Learn only what you need</h1>
        </div>
      </div>
      <div className="container px-0 main-page__landing">
        <section className="main-page__section">
          <h2 className="main-page__slogan">Get knowledge in a new format</h2>
          <p className="main-page__description">
            New type of educational platforms based on a dynamic data structures, in particular graphs,
            due to the creation of a more flexible approach to obtaining new knowledge compared to modern e-learning systems.
            Moreover, the new educational platform is an improved process of creating and delivering educational material with help of graphs for
            the representation of data.
          </p>
        </section>
        <section className="main-page__section">
          <h2 className="main-page__slogan">Contribute to our knowledge source</h2>
          <p className="main-page__description">
            Web application helps to introduce new technologies into educational programs and increase the popularity of online platforms in various field of activity.
            Proposed educational platform is focused on helping students in obtaining needed technical capabilities that can be achieved through development of more personalized online learning strategies,
            which are believed to be effective in accomplishing of professional and academic objectives.
            The implementation of an educational platform also helps to expand the use of graphs in other information systems.
          </p>
        </section>
        <section className="main-page__section">
          <h2 className="main-page__slogan">Create your own paths</h2>
          <p className="main-page__description">
            Our educational platform represents various types of knowledge nodes in the form of graphs and called «Knowledge Maps». The goal of Knowledge Maps is to close the gap between accessibility and discoverability of scientific knowledge
          </p>
        </section>
        <section className="main-page__section">
          <h2 className="main-page__slogan">Learn More</h2>
          <p className="main-page__description main-page__btn mb-4">
            <Link to="/main/categories">Check out available categories</Link>
          </p>
          <p className="main-page__description main-page__btn">
            <Link to="/auth/sign-up">Register to keep track of your progress</Link>
          </p>
        </section>
      </div>
    </div>
  );
};
