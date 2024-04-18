import { Flex } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLayoutModel } from '@models/layout';

const AppHeader = () => {
  const { title } = useLayoutModel();
  return <header className="layout-header">{title}</header>;
};

const AppLayout = () => {
  return (
    <Flex vertical className="layout">
      <AppHeader />
      <div className="layout-body">
        <div className="layout-container">
          <Outlet />
        </div>
      </div>
    </Flex>
  );
};

export default AppLayout;
