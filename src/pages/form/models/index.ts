import { Form } from 'antd';
import { createContainer } from 'unstated-next';
import { PlanFormModel } from '../types';
import { useNavigate } from 'react-router-dom';
import { formatPlan } from '../utils';
import { addPlan } from '@services/plan';

const useContainer = () => {
  const navigate = useNavigate();
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
  return { form, save, cancel, confirm };
};

export const FormModel = createContainer(useContainer);
export const useFormModel = FormModel.useContainer;
