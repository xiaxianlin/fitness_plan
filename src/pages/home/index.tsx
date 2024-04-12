import './index.css';
import { HomeModel } from './models';
import ListView from './views/List';

const HomePage = () => {
  return (
    <HomeModel.Provider>
      <div className="home">
        <ListView />
      </div>
    </HomeModel.Provider>
  );
};

export default HomePage;
