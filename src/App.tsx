import React from 'react';
import { ConfigProvider, Flex, theme } from 'antd';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import HomePage from '@pages/home';
import FormPage from '@pages/form';
import DetailPage from '@pages/detail';
import ExecPage from '@pages/exec';

const Layout = () => {
  return (
    <Flex vertical className="layout">
      <header className="layout-header">FITNESS</header>
      <div className="layout-body">
        <div className="layout-container">
          <Outlet />
        </div>
      </div>
    </Flex>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/form">
        <Route index element={<FormPage />} />
        <Route path=":uid" element={<FormPage />} />
      </Route>
      <Route path="/detail/:uid" element={<DetailPage />} />
      <Route path="/exec/:uid" element={<ExecPage />} />
    </Route>
  )
);

ConfigProvider.config({
  holderRender: (children) => <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>{children}</ConfigProvider>,
});

const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
