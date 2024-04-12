export enum MovementType {
  Timer = 'timer',
  Counter = 'counter',
}

export interface Movement {
  name: string;
  type: MovementType;
  action: number;
  reset: number;
}

export interface Group {
  uid: string;
  count: number;
  movement: Movement;
}

export interface Plan {
  uid?: string;
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
