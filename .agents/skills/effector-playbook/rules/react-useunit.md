# react-useunit

## Why

`useUnit` provides a single, consistent binding for stores and events. It reduces boilerplate and keeps components simple.

## Prefer

```ts
import { useUnit } from "effector-react";
import { $counter, increased, sendToServerFx } from "./model";

const Component = () => {
  // Don't split into separate `useUnit` hook calls. Always use object or array structure being passed as an argument.
  const [counter, increase, sendToServer] = useUnit([$counter, increased, sendToServerFx]);

  return (
    <div>
      <button onClick={increase}>{counter}</button>
      <button onClick={sendToServer}>send data to server</button>
    </div>
  );
};
```
