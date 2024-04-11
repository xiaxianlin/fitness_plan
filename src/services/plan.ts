import { db } from '@utils/db';
import { Plan } from '@struct/model';

export const planService = db.plans;

export const addPlan = async (plan: Plan) => {
  return planService.add(plan);
};

export const allPlans = async () => {
  return planService.toArray();
};

export const deletePlan = async (id: number) => {
  return planService.where('id').equals(id).delete();
};

export const updatePlan = async (plan: Plan) => {
  const { id, ...update } = plan;
  return planService.where('id').equals(id!).modify(update);
};
