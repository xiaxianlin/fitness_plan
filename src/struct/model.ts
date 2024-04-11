export enum MovementType {
  Timer,
  Counter,
}

export interface Movement {
  name: string;
  type: MovementType;
  action: number;
  reset: number;
}

export interface Group {
  movement: Movement;
  count: number;
}

export interface Plan {
  id?: number;
  name: string;
  warm: Group[];
  train: Group[];
  cool: Group[];
  createTime: string;
  updateTime: string;
  movementCount: number;
  trainTime: number;
  desc: string;
}
