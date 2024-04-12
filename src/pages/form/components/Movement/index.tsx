import React, { useEffect } from 'react';
import { Flex, Form, FormProps, Input, InputNumber, Modal, Radio } from 'antd';
import { Group, MovementType } from '@struct/model';
import * as uuid from 'uuid';

interface FormModel {
  name: string;
  type: MovementType;
  action: number;
  reset: number;
  count: number;
}

interface MovementModalProps {
  group?: Group;
  visible?: boolean;
  onCancel?: () => void;
  onConfirm?: (group: Group) => void;
}

const WIDTH = '48%';

const MovementModal: React.FC<MovementModalProps> = ({ group, visible, onCancel, onConfirm }) => {
  const [form] = Form.useForm();
  const type = Form.useWatch<MovementType>('type', form);

  const initModel: FormModel = {
    count: group?.count || 5,
    name: group?.movement.name || '',
    reset: group?.movement.reset || 15,
    action: group?.movement.action || 45,
    type: group?.movement.type || MovementType.Timer,
  };

  const cancel = () => {
    form.resetFields();
    onCancel?.();
  };

  const confirm: FormProps['onFinish'] = ({ count, ...movement }: FormModel) => {
    onConfirm?.({ uid: group?.uid || uuid.v4(), count, movement });
    cancel();
  };

  useEffect(() => {
    visible && form.setFieldsValue(initModel);
  }, [visible, initModel, form]);

  return (
    <Modal
      mask
      centered
      destroyOnClose
      okText="确定"
      cancelText="取消"
      title={group ? '修改动作' : '添加动作'}
      open={visible}
      onCancel={cancel}
      maskClosable={false}
      onOk={() => form.submit()}
      styles={{ mask: { backgroundColor: 'rgba(0, 0, 0, 0.85)' } }}
    >
      <Form<FormModel>
        name="group"
        form={form}
        onFinish={confirm}
        style={{ marginTop: 24 }}
        initialValues={initModel}
        validateMessages={{ required: '${label}不能为空' }}
      >
        <Form.Item<string> required label="动作" name="name" rules={[{ required: true }]}>
          <Input placeholder="输入动作名称" autoComplete="off" />
        </Form.Item>
        <Flex wrap="wrap" justify="space-between">
          <Form.Item<MovementType> required label="类型" name="type" style={{ width: WIDTH }}>
            <Radio.Group
              style={{ width: '100%' }}
              onChange={(e) => {
                form.setFieldsValue({
                  reset: e.target.value === MovementType.Timer ? 15 : 45,
                  action: e.target.value === MovementType.Timer ? 45 : 15,
                });
              }}
            >
              <Radio.Button value={MovementType.Timer} style={{ width: '50%', textAlign: 'center' }}>
                计时
              </Radio.Button>
              <Radio.Button value={MovementType.Counter} style={{ width: '50%', textAlign: 'center' }}>
                计次
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item<number> required label="组数" name="count" style={{ width: WIDTH }} rules={[{ required: true }]}>
            <InputNumber precision={0} placeholder="动作重复次数" addonAfter="组" />
          </Form.Item>
          <Form.Item<number> required label="频次" name="action" style={{ width: WIDTH }} rules={[{ required: true }]}>
            <InputNumber precision={0} placeholder="每组运动频次" addonAfter={type === MovementType.Timer ? '秒' : '次'} />
          </Form.Item>
          <Form.Item<number> required label="间歇" name="reset" style={{ width: WIDTH }} rules={[{ required: true }]}>
            <InputNumber precision={0} placeholder="每组休息时间" addonAfter="秒" />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default MovementModal;
