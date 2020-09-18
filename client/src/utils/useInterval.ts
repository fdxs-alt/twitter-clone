import { useEffect, useRef } from "react";

const noop = () => {};

const useInteval = (cb: CallableFunction, delay: number) => {
  const callback = useRef<CallableFunction>(noop);

  useEffect(() => {
    callback.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => callback.current();

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInteval;
