import './index.less';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useCountDown } from '@hooks/useCountDown';
import { useExecModel } from '@pages/exec/models';

const StartView = () => {
  const { start } = useExecModel();
  const timer = useCountDown(3, { onFinish: start });

  return (
    <div className="exec-start">
      {!timer.running && <PlayCircleOutlined className="exec-icon" onClick={timer.start} />}
      {timer.running && <span>{timer.remain}</span>}
    </div>
  );
};

export default StartView;
