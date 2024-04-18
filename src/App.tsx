import { ConfigProvider, theme } from 'antd';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomePage from '@pages/home';
import FormPage from '@pages/form';
import DetailPage from '@pages/detail';
import ExecPage from '@pages/exec';
import { LayoutModel } from '@models/layout';
import AppLayout from '@layouts/AppLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
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
      <LayoutModel.Provider>
        <RouterProvider router={router} />
      </LayoutModel.Provider>
    </ConfigProvider>
  );
};

export default App;
