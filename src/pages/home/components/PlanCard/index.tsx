import React from 'react';
import { Card, Descriptions } from 'antd';
import { Plan } from '@struct/model';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface PlanCardProps {
  plan: Plan;
  onEdit?: () => void;
  onDetail?: () => void;
  onRemove?: () => void;
}
const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onDetail, onRemove }) => {
  return (
    <Card
      key={plan.uid}
      title={plan.name}
      bordered={false}
      style={{ width: '100%' }}
      actions={[<EditOutlined onClick={onEdit} />, <DeleteOutlined onClick={onRemove} />, <InfoCircleOutlined onClick={onDetail} />]}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="动作数">{plan.movementCount}</Descriptions.Item>
        <Descriptions.Item label="预估时长">{plan.trainTime}秒</Descriptions.Item>
        <Descriptions.Item label="描述" span={2}>
          {plan.desc}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PlanCard;
