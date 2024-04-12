import { Form, Modal } from 'antd';
import { createContainer } from 'unstated-next';
import { PlanFormModel } from '../types';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { formatPlan } from '../utils';
import { addPlan, getPlan, updatePlan } from '@services/plan';
import { useEffect, useState } from 'react';
import { Plan } from '@struct/model';

const useContainer = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan>();
  const [blocked, setBlocked] = useState(true);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => blocked && currentLocation.pathname !== nextLocation.pathname);

  const [form] = Form.useForm<PlanFormModel>();

  const query = async () => {
    if (!uid) return;
    const plan = await getPlan(uid);
    setPlan(plan);
    form.setFieldsValue({ name: plan?.name, desc: plan?.desc, cool: plan?.cool || [], train: plan?.train || [], warm: plan?.warm || [] });
  };

  const save = () => {
    form.submit();
  };

  const cancel = () => {
    navigate('/');
  };

  const confirm = async (values: PlanFormModel) => {
    Modal.confirm({
      title: '保存提示',
      content: '确定要保存吗',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        setBlocked(false);
        const update = formatPlan(values, plan);
        if (!uid) {
          await addPlan(update);
        } else {
          await updatePlan(update);
        }
        navigate('/');
      },
    });
  };

  useEffect(() => {
    query();
  }, [uid]);

  useEffect(() => {
    if (blocked && blocker.state === 'blocked') {
      Modal.confirm({
        title: '离开提示',
        content: '确定要离开吗',
        okText: '确定',
        cancelText: '取消',
        onOk: () => blocker.proceed(),
        onCancel: () => blocker.reset(),
      });
    }
  }, [blocked, blocker]);

  return { uid, form, plan, blocker, save, cancel, confirm };
};

export const FormModel = createContainer(useContainer);
export const useFormModel = FormModel.useContainer;
