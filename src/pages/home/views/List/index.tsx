import React from 'react';
import { Button, Card, Empty, Flex, Spin } from 'antd';
import { useHomeModel } from '@pages/home/models';
import { Link } from 'react-router-dom';

const ListView = () => {
  const { plans } = useHomeModel();
  if (!plans) {
    return (
      <Flex justify="center">
        <Spin size="large" />
      </Flex>
    );
  }

  if (!plans.length) {
    return (
      <Flex justify="center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无训练计划">
          <Link to="/form">
            <Button type="primary">创建计划</Button>
          </Link>
        </Empty>
      </Flex>
    );
  }
  return (
    <>
      {plans.map((plan) => {
        return (
          <Card key={plan.id} title={plan.name} extra={plan.createTime} bordered={false} style={{ width: 300 }}>
            <p>动作数: {plan.movementCount}</p>
            <p>预估训练时长: {plan.trainTime}</p>
            <p>{plan.desc}</p>
          </Card>
        );
      })}
    </>
  );
};

export default ListView;
