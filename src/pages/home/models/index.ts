import { allPlans } from '@services/plan';
import { Plan } from '@struct/model';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { createContainer } from 'unstated-next';

const useContainer = () => {
  const navigate = useNavigate();
  const plans = useLiveQuery(allPlans);

  const handleDelete = (_plan: Plan) => {};

  const gotoFormPage = (uid: string) => {
    navigate(`/form/${uid}`);
  };

  const gotoDetailPage = (uid: string) => {
    navigate(`/detail/${uid}`);
  };

  return { plans, handleDelete, gotoFormPage, gotoDetailPage };
};

export const HomeModel = createContainer(useContainer);
export const useHomeModel = HomeModel.useContainer;
