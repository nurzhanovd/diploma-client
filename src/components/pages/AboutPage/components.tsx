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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </section>
        <section className="main-page__section">
          <h2 className="main-page__slogan">Contribute to our knowledge source</h2>
          <p className="main-page__description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </section>
        <section className="main-page__section">
          <h2 className="main-page__slogan">Create your own paths</h2>
          <p className="main-page__description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </section>
        <section className="main-page__section">
          <h2 className="main-page__slogan">Learn More</h2>
          <p className="main-page__description main-page__btn mb-4">
            <Link to="/main/categories">Check out available categories</Link>
          </p>
          <p className="main-page__description main-page__btn">
            <Link to="/main/categories">Register to keep track of your progress</Link>
          </p>
        </section>
      </div>
    </div>
  );
};
