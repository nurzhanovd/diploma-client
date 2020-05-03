import React, { createRef, FC, useCallback, useEffect, useMemo, useState } from 'react';
import Markdown from 'react-markdown';

import { TableOfContents } from './libs/TableOfContents';
import { Props } from './props';
import './styles.scss';

const a =
  'What is Kotlin?\n' +
  '---------------\n' +
  '\n' +
  '**Kotlin** is an effective, modern programming language developed by [JetBrains](https://www.jetbrains.com/). It has a clear and concise syntax that makes your code easy to read.\n' +
  '\n' +
  'Despite the fact that Kotlin is quite a new programming language, it is already widely used in practice, and its popularity is constantly growing among developers around the world. Also, Kotlin has excellent documentation and official tutorials that help you find answers to any questions that may arise.\n' +
  '\n' +
  'Many developers who use Kotlin note that it makes development faster and more exciting :)\n' +
  '\n' +
  '![](https://ucarecdn.com/d3ec070f-92aa-4473-af87-20d486a424a4/)\n' +
  '\n' +
  'Knowledge of Kotlin allows developers to write mobile, server-side and desktop applications, as well as useful frameworks, and libraries. As a general-purpose language, it can be used in many spheres such as the financial service industry, telecommunications, embedded systems, medicine, development tools (like IntelliJ IDEA), and so on.';
const b =
  'Multiplatform language\n' +
  '----------------------\n' +
  '\n' +
  'Kotlin is a cross-platform language.\n' +
  '\n' +
  '*   **JVM:** Kotlin is fully interoperable with Java, which means Kotlin works great with all existing Java code and libraries. It also allows companies to make a gradual migration from Java to Kotlin, because Java code can access Kotlin code too. At the same time, developers can use Kotlin as the only language for their projects without Java at all.\n' +
  '*   **Android:** using Kotlin, you can create mobile applications for the most used operating system in the world.\n' +
  '*   **JS:** Kotlin is also compatible with JavaScript, which enables you to develop client-side web applications and run them in a browser.\n' +
  '*   **Native:** you can compile Kotlin to native binaries, and can be run under Windows, Linux, iOS, and MacOS.\n' +
  '\n' +
  '![](https://ucarecdn.com/28192c0c-2d02-4503-8948-034efaddb8a0/)\n' +
  '\n' +
  'Among all these opportunities modern programmers prefer mobile and server-side development. Other areas are gaining popularity as well.';

const c =
  'Features\n' +
  '--------\n' +
  '\n' +
  'Kotlin is designed as a **pragmatic language**, which means, its main purpose is to solve real-world problems rather than completing research purposes.\n' +
  '\n' +
  'It is also important that Kotlin supports **multiple programming paradigms**, such as imperative programming, object-oriented programming, generic programming, functional programming, and more. You will learn about these paradigms throughout the course.\n' +
  '\n' +
  'Last but not least, Kotlin is a **tool-friendly language**, which means all popular development tools such as IntelliJ IDEA, Eclipse, and Android Studio are compatible with it.';

export const LearnNodePage: FC<Props> = (props) => {
  const refs = useMemo(
    () =>
      Array(3)
        .fill(1)
        .map(() => createRef<HTMLDivElement>()),
    [],
  );

  const [abc] = useState([a, b, c]);
  const [currentNode, setCurrentNode] = useState(0);
  const findMaxVisibleNode: IntersectionObserverCallback = useCallback(
    (entries) => {
      let maxIndex = 0;
      entries.forEach((n, i) => {
        if (n.intersectionRatio >= entries[maxIndex].intersectionRatio) {
          maxIndex = i;
        }
      });
      const { target } = entries[maxIndex];
      const maxVisibleNode = refs.findIndex((n) => n.current === target);
      setCurrentNode((prev) => (maxVisibleNode >= 0 ? maxVisibleNode : prev));
    },
    [refs],
  );
  const observer = useMemo(() => new IntersectionObserver(findMaxVisibleNode, { threshold: 0.5 }), [
    findMaxVisibleNode,
  ]);

  useEffect(() => {
    refs.forEach((n) => {
      if (n.current) {
        observer.observe(n.current);
      }
    });
    return () => observer.disconnect();
  }, [refs, observer]);

  return (
    <div className="container d-flex flex-column learn-node-page">
      <h1 className="learn-node-page__title">Learn: CSA</h1>
      <div className="w-100 mt-4 d-flex justify-content-between">
        <div className="col-8 pl-0 d-flex flex-column markdown">
          {abc.map((n, i) => (
            <div key={i} ref={refs[i]}>
              <Markdown source={n} />
            </div>
          ))}
        </div>
        <div className="col-3 pr-0 justify-content-end">
          <TableOfContents
            className="learn-node-page__table-of-contents"
            contents={[
              { text: 'Basis definition', onClick: console.log.bind(null, 1) },
              { text: 'Basis definition', onClick: console.log.bind(null, 1) },
              { text: 'Basis definition', onClick: console.log.bind(null, 1) },
            ]}
            activeContentIndex={currentNode}
          />
        </div>
      </div>
    </div>
  );
};
