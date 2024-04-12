import './index.css';
import { FormModel } from './models';
import MainView from './views/Main';
import FooterView from './views/Footer';

const FormPage = () => {
  return (
    <FormModel.Provider>
      <MainView />
      <FooterView />
    </FormModel.Provider>
  );
};

export default FormPage;
