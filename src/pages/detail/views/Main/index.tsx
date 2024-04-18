import { Descriptions, Flex, FloatButton, Spin } from 'antd';
import { useDetailModel } from '@pages/detail/models';
import { BlockBox } from '@components';
import PhaseInfo from '@pages/detail/components/Phase';
import { ExportOutlined } from '@ant-design/icons';

const MainView = () => {
  const { uid, plan, domRef, download } = useDetailModel();
  if (!!uid && !plan) {
    return (
      <Flex justify="center">
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <>
      <div className="detail-page" ref={domRef} style={{ background: 'rgb(48, 48, 48)' }}>
        <BlockBox title="基础信息">
          <Descriptions column={2}>
            <Descriptions.Item label="动作数">{plan?.name}</Descriptions.Item>
            <Descriptions.Item label="描述">{plan?.desc}</Descriptions.Item>
          </Descriptions>
        </BlockBox>
        <BlockBox title="热身阶段">
          <PhaseInfo value={plan?.warm} />
        </BlockBox>
        <BlockBox title="训练阶段">
          <PhaseInfo value={plan?.train} />
        </BlockBox>
        <BlockBox title="恢复阶段">
          <PhaseInfo value={plan?.cool} />
        </BlockBox>
      </div>
      <FloatButton icon={<ExportOutlined />} onClick={download} />
    </>
  );
};

export default MainView;
