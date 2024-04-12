import { Form, Modal } from 'antd';
import { createContainer } from 'unstated-next';
import { PlanFormModel } from '../types';
import { useBlocker, useNavigate } from 'react-router-dom';
import { formatPlan } from '../utils';
import { addPlan } from '@services/plan';
import { useEffect } from 'react';

const useContainer = () => {
  const navigate = useNavigate();
  const blocker = useBlocker(({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname);

  const [form] = Form.useForm<PlanFormModel>();

  const save = () => {
    form.submit();
  };

  const cancel = () => {
    form.resetFields();
    navigate('/');
  };

  const confirm = async (values: PlanFormModel) => {
    const plan = formatPlan(values);
    await addPlan(plan);
    navigate('/');
  };

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      e.returnValue = '确定要离开吗';
    };
    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, []);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      Modal.confirm({
        title: '离开提示',
        content: '确定要离开吗',
        okText: '确定',
        cancelText: '取消',
        onOk: () => blocker.proceed(),
        onCancel: () => blocker.reset(),
      });
    }
  }, [blocker]);

  return { form, blocker, save, cancel, confirm };
};

export const FormModel = createContainer(useContainer);
export const useFormModel = FormModel.useContainer;
