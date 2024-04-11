import React from 'react';
import { ConfigProvider, Flex, theme } from 'antd';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import HomePage from '@pages/home';
import FormPage from '@pages/form';
import DetailPage from '@pages/detail';
import ExecPage from '@pages/exec';

const Layout = () => {
  return (
    <Flex vertical>
      <header className="layout-header">FITNESS</header>
      <div className="layout-body">
        <Outlet />
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
        <Route path=":id" element={<FormPage />} />
      </Route>
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/exec/:id" element={<ExecPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
