import { Flex, Spin } from 'antd';
import { Status } from '@pages/exec/types';
import { useExecModel } from '@pages/exec/models';
import StartView from '../Start';
import RunView from '../Run';
import OverView from '../Over';

const MainView = () => {
  const { loading, status } = useExecModel();
  if (loading) {
    return (
      <Flex justify="center">
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <div className="exec-page">
      {status === Status.Wait && <StartView />}
      {status === Status.Running && <RunView />}
      {status === Status.Over && <OverView />}
    </div>
  );
};

export default MainView;
