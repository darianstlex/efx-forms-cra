import React from 'react';
import { Store } from 'effector';
import { useStore } from 'effector-react';
import { shapeFy, truthyFy } from 'efx-forms/utils';

import styles from './index.module.scss';

interface CodeProps {
  store: Store<{}>;
  title: string;
}

export const Code = ({ store, title }: CodeProps) => {
  const data = useStore(store);
  const shape = shapeFy(data);
  const truthy = truthyFy(data);
  const truthyShape = shapeFy(truthy);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <pre className={styles.code}>
        <div>Default: {JSON.stringify(data, undefined, 2)}</div>
        <div>Shaped: {JSON.stringify(shape, undefined, 2)}</div>
        <div>Truthy: {JSON.stringify(truthy, undefined, 2)}</div>
        <div>Shaped Truthy: {JSON.stringify(truthyShape, undefined, 2)}</div>
      </pre>
    </div>
  );
};
