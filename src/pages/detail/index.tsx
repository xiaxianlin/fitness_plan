import { DetailModel } from './models';
import MainView from './views/Main';

const DetailPage = () => {
  return (
    <DetailModel.Provider>
      <MainView />
    </DetailModel.Provider>
  );
};

export default DetailPage;
