import React from 'react';
import { Card, Descriptions } from 'antd';
import { Plan } from '@struct/model';
import { DeleteOutlined, DoubleRightOutlined, EditOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface PlanCardProps {
  plan: Plan;
  onEdit?: () => void;
  onDetail?: () => void;
  onRemove?: () => void;
  onExec?: () => void;
}
const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onDetail, onRemove, onExec }) => {
  return (
    <Card
      key={plan.uid}
      title={plan.name}
      bordered={false}
      style={{ width: '100%' }}
      extra={<DoubleRightOutlined onClick={onDetail} />}
      actions={[<EditOutlined onClick={onEdit} />, <DeleteOutlined onClick={onRemove} />, <ClockCircleOutlined onClick={onExec} />]}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="动作数">{plan.movementCount}</Descriptions.Item>
        <Descriptions.Item label="预估时长">{(plan.trainTime / 3600).toFixed(1)}小时</Descriptions.Item>
        <Descriptions.Item label="描述" span={2}>
          {plan.desc}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PlanCard;
