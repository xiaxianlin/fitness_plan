import { Flex, Form, Input, Spin } from 'antd';
import BlockBox from '@pages/form/components/BlockBox';
import Phase from '@pages/form/components/Phase';
import { PlanFormModel } from '@pages/form/types';
import { useFormModel } from '@pages/form/models';

const MainView = () => {
  const { uid, plan, form, confirm } = useFormModel();
  if (!!uid && !plan) {
    return (
      <Flex justify="center">
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <Form<PlanFormModel> name="plan" layout="vertical" form={form} onFinish={confirm}>
      <BlockBox title="基础信息">
        <Form.Item required label="计划名称" name="name" rules={[{ required: true, message: '计划名称不能为空' }]}>
          <Input placeholder="输入计划名称" />
        </Form.Item>
        <Form.Item required label="计划描述" name="desc" rules={[{ required: true, message: '计划描述不能为空' }]}>
          <Input.TextArea placeholder="简单描述一下计划的训练效果" />
        </Form.Item>
      </BlockBox>
      <BlockBox title="热身阶段">
        <Form.Item name="warm" rules={[{ required: true, message: '热身动作不能为空' }]}>
          <Phase />
        </Form.Item>
      </BlockBox>
      <BlockBox title="训练阶段">
        <Form.Item name="train" rules={[{ required: true, message: '训练动作不能为空' }]}>
          <Phase />
        </Form.Item>
      </BlockBox>
      <BlockBox title="恢复阶段">
        <Form.Item name="cool" rules={[{ required: true, message: '恢复动作不能为空' }]}>
          <Phase />
        </Form.Item>
      </BlockBox>
    </Form>
  );
};

export default MainView;
