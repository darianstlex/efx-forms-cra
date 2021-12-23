import React from 'react';
import { Store } from 'effector';
import { useStore } from 'effector-react';
import './index.css';

interface CodeProps {
  store: Store<any>;
  title: string;
}

export const Code = ({ store, title }: CodeProps) => {
  const data = useStore(store);
  return (
    <div className="Code">
      <div className="Code-title">{title}</div>
      <pre className="Code-code">
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  );
};
