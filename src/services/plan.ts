import { db } from '@utils/db';
import { Plan } from '@struct/model';

export const planService = db.plans;

export const addPlan = async (plan: Plan) => {
  return planService.add(plan);
};

export const allPlans = async () => {
  return planService.toArray();
};

export const deletePlan = async (uid: string) => {
  return planService.where('uid').equals(uid).delete();
};

export const updatePlan = async (plan: Plan) => {
  const { uid, ...update } = plan;
  return planService.where('uid').equals(uid!).modify(update);
};
