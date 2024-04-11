import React from 'react';
import { HomeModel } from './models';
import ListView from './views/List';

import './index.css';

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
