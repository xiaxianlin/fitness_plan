import React from 'react';
import { Group, MovementType } from '@struct/model';
import { Table, TableProps } from 'antd';

interface PhaseProps {
  value?: Group[];
}
const PhaseInfo: React.FC<PhaseProps> = ({ value = [] }) => {
  const columns: TableProps<Group>['columns'] = [
    {
      key: 'name',
      title: '动作',
      width: '30%',
      render: (_, { movement }) => movement.name,
    },
    {
      key: 'action',
      title: '频次',
      render: (_, { movement }) => `${movement.action}${movement.type === MovementType.Timer ? '秒' : '次'}`,
    },
    {
      key: 'reset',
      title: '间歇',
      render: (_, { movement }) => `${movement.reset}秒`,
    },
    {
      key: 'count',
      title: '组数',
      dataIndex: 'count',
    },
  ];

  return <Table bordered rowKey="uid" size="small" dataSource={value} columns={columns} pagination={false} />;
};

export default PhaseInfo;
