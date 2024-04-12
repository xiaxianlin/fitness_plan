import { Button, Col, Empty, Flex, Row, Spin } from 'antd';
import { useHomeModel } from '@pages/home/models';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import PlanCard from '@pages/home/components/PlanCard';

const ListView = () => {
  const { plans, handleDelete, gotoFormPage, gotoDetailPage } = useHomeModel();
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
    <Row className="home" align="stretch">
      {plans.map((plan) => {
        return (
          <Col className="home-item" span={8}>
            <PlanCard
              key={plan.uid}
              plan={plan}
              onEdit={() => gotoFormPage(plan.uid!)}
              onDetail={() => gotoDetailPage(plan.uid!)}
              onRemove={() => handleDelete(plan)}
            />
          </Col>
        );
      })}
      <Col span={8} className="home-item">
        <Link to="/form" className="home-add">
          <PlusOutlined className="home-add-icon" />
        </Link>
      </Col>
    </Row>
  );
};

export default ListView;
