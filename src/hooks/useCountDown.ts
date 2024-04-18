import { useEffect, useState } from 'react';

type Options = { duration?: number; onFinish?: () => void };

enum Status {
  Wait,
  Run,
  Over,
}

export const useCountDown = (count: number, { duration = 1000, onFinish }: Options = {}) => {
  const [remain, setRemain] = useState(count);
  const [status, setStatus] = useState<Status>(Status.Wait);
  const [pausing, setPausing] = useState(false);

  const start = () => {
    setStatus(Status.Run);
  };

  const stop = () => {
    onFinish?.();
    setStatus(Status.Over);
  };

  const pause = () => {
    if (status !== Status.Run) return;
    setPausing(true);
  };

  const keep = () => {
    if (status !== Status.Run || !pausing) return;
    setPausing(false);
  };

  const reset = () => {
    setStatus(Status.Wait);
    setRemain(count);
  };

  const restart = () => {
    reset();
    start();
  };

  useEffect(() => {
    if (status !== Status.Run || pausing) {
      return;
    }
    if (remain === 0) {
      return stop();
    }
    const timer = setTimeout(() => setRemain(remain - 1), duration);
    return () => clearTimeout(timer);
  }, [status, remain, pausing]);

  useEffect(() => {
    return () => reset();
  }, []);

  return {
    remain,
    pausing,
    over: status === Status.Over,
    running: status === Status.Run,
    waiting: status === Status.Wait,
    stop,
    keep,
    pause,
    start,
    reset,
    restart,
  };
};
