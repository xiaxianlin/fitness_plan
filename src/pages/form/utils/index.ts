import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { MovementType, Plan } from '@struct/model';
import { PlanFormModel } from '../types';

// 计次动作按照每个动作 3 秒算
const ACTION_DURATION = 3;

const calcTrainTime = ({ warm, train, cool }: PlanFormModel) => {
  const actions = [...warm, ...train, ...cool];
  const timerActions = actions.filter((g) => g.movement.type === MovementType.Timer);
  const counterActions = actions.filter((g) => g.movement.type === MovementType.Counter);
  const trainTime = timerActions.reduce((prev, i) => {
    return prev + (i.movement.action + i.movement.reset) * i.count;
  }, 0);
  const trainCount = counterActions.reduce((prev, i) => {
    return prev + i.movement.reset * i.count + i.movement.action * i.count * ACTION_DURATION;
  }, 0);

  return trainTime + trainCount;
};

export const formatPlan = (form: PlanFormModel, plan?: Plan): Plan => {
  const now = dayjs().format('YYYY-MM-DD HH:mm');
  return {
    uid: plan?.uid || v4(),
    name: form.name,
    warm: form.warm,
    train: form.train,
    cool: form.cool,
    createTime: plan?.createTime || now,
    updateTime: now,
    movementCount: form.warm.length + form.train.length + form.cool.length,
    trainTime: calcTrainTime(form),
    desc: form.desc || plan?.desc || '',
  };
};
