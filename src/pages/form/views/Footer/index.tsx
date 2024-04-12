import { useFormModel } from '@pages/form/models';
import { Button } from 'antd';

const FooterView = () => {
  const { save, cancel } = useFormModel();
  return (
    <div className="form-footer">
      <Button onClick={cancel}>取消</Button>
      <Button onClick={save}>保存</Button>
    </div>
  );
};

export default FooterView;
