import { Flex, DatePicker, Space, Button, Typography, message } from 'antd';
import { PageHeader } from '../components';

export const AboutPage = () => {
  const onChange = (date:any, dateString:any) => {
    console.log(date, dateString);
  };
  const handleButtonClick = () => {
    message.success('Relatório gerado com sucesso!');
  };

  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader title="Emissão de relatório" />
        <Space direction="vertical">
          <Typography.Text strong style={{ fontSize: '16px' }}>
            Data inicial
          </Typography.Text>
          <DatePicker onChange={onChange} />
          <Typography.Text strong style={{ fontSize: '16px' }}>
            Data final
          </Typography.Text>
          <DatePicker onChange={onChange} />

          <Button
            type="primary"
            style={{
              backgroundColor: 'blue',
              borderColor: 'blue',
              marginTop: '16px',
            }}
            onClick={handleButtonClick}
          >
            Gerar Relatório
          </Button>
        </Space>
      </Flex>
    </div>
  );
};
