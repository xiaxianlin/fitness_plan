import { ExecModel } from './models';
import MainView from './views/Main';

const ExecPage = () => {
  return (
    <ExecModel.Provider>
      <MainView />
    </ExecModel.Provider>
  );
};

export default ExecPage;
