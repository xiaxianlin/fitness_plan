import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import { getPlan } from '@services/plan';
import { useLiveQuery } from 'dexie-react-hooks';
import { Movement } from '@struct/model';
import { Status } from '../types';
import { useLayoutModel } from '@models/layout';

const useContainer = () => {
  const { uid = '' } = useParams();
  const { setTitle } = useLayoutModel();
  const plan = useLiveQuery(() => getPlan(uid));
  const [movement, setMovement] = useState<Movement>();
  const [status, setStatus] = useState<Status>(Status.Wait);

  const movements = useMemo(() => {
    const { warm = [], train = [], cool = [] } = plan || {};
    return [...warm, ...train, ...cool]
      .map((g) => {
        return Array(g.count)
          .fill('-')
          .map((_, i) => ({ ...g.movement, name: `${g.movement.name} - [ ${i + 1}/${g.count} ]` }));
      })
      .flat();
  }, [plan]);

  const next = () => {
    if (status !== Status.Running) return;
    if (movements.length) {
      setMovement(movements.shift());
    } else {
      setStatus(Status.Over);
    }
  };

  const start = () => {
    setStatus(Status.Running);
    setMovement(movements.shift());
  };

  useEffect(() => {
    plan?.name && setTitle(plan.name);
  }, [plan?.name]);

  return { loading: !!uid && !plan, status, movement, next, start };
};

export const ExecModel = createContainer(useContainer);
export const useExecModel = ExecModel.useContainer;
