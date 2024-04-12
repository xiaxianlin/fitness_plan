import { Group } from '@struct/model';

export interface PlanFormModel {
  name: string;
  desc: string;
  warm: Group[];
  train: Group[];
  cool: Group[];
}
