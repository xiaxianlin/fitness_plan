import './index.css';
import React, { useState } from 'react';
import { Group, MovementType } from '@struct/model';
import { Button, Table, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import MovementModal from '../Movement';

interface PhaseProps {
  value?: Group[];
  onChange?: (value: Group[]) => void;
}
const Phase: React.FC<PhaseProps> = ({ value = [], onChange }) => {
  const [group, setGroup] = useState<Group>();
  const [visible, setVisible] = useState(false);

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
    {
      key: 'op',
      title: '操作',
      dataIndex: 'uid',
      width: 80,
      render: (_, row) => (
        <>
          <EditOutlined
            style={{ marginRight: 8 }}
            onClick={() => {
              setGroup(row);
              setVisible(true);
            }}
          />
          <DeleteOutlined onClick={() => onChange?.(value.filter((g) => g.uid !== row.uid))} />
        </>
      ),
    },
  ];

  const show = (edit?: Group) => {
    setGroup(edit);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const confirm = (newGroup: Group) => {
    if (!group) {
      return onChange?.([...value, newGroup]);
    }
    setGroup(undefined);
    const index = value.findIndex((i) => i.uid === group.uid);
    onChange?.([...value.slice(0, index), newGroup, ...value.slice(index + 1)]);
  };

  return (
    <div className="phase">
      <Button icon={<PlusOutlined />} className="phase-add" size="small" onClick={() => show()}>
        添加动作
      </Button>
      <Table bordered className="phase-table" rowKey="uid" size="small" dataSource={value} columns={columns} pagination={false} />
      <MovementModal visible={visible} group={group} onCancel={hide} onConfirm={confirm} />
    </div>
  );
};

export default Phase;
