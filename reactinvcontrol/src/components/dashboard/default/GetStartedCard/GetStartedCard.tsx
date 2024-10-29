import { Button, CardProps, Flex, Image, Typography, Modal } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Card } from '../../../index';
import CountUp from 'react-countup';
import { useState } from 'react';

type Props = CardProps;

export const GetStartedCard = ({ ...others }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Card {...others}>
        <Flex justify="space-between" align="center" gap="middle">
          <Flex vertical gap="large" align="flex-start">
            <Typography.Title level={4} style={{ margin: 0 }}>
              You have <CountUp end={2} /> projects to finish this week
            </Typography.Title>
            <Typography.Text>
              You have already completed 68% of your monthly target. Keep going
              to achieve your goal.
            </Typography.Text>
            <Button type="primary" size="middle" onClick={showModal}>
              Get started <RightOutlined />
            </Button>
          </Flex>
          <Image
            src="/get-started.png"
            height={180}
            preview={false}
            style={{ objectFit: 'cover' }}
          />
        </Flex>
      </Card>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
