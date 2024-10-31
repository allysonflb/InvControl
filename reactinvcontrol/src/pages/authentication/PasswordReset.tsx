import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from 'antd';
import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { PATH_AUTH, PATH_DASHBOARD } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BASE_URL } from '../../global';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
};

export const PasswordResetPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
  
    try {
      // Realiza a requisição para o backend para redefinir a senha
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });
  
      const data = await response.json();

      console.log(response);
      console.log(data.status);
      // Verifica se a resposta foi bem-sucedida e contém o status esperado
      if (response.ok && data.status === 'Senha resetada para o default') {
        message.success('Senha redefinida para o padrão com sucesso.');
      } else if (data.error === 'Usuario não encontrado') {
        message.error('Usuário não encontrado.');
      } else {
        message.error('Falha ao redefinir a senha.');
      }
    } catch (error) {
      message.error('Erro na solicitação. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  
    // // Redireciona após 3 segundos (opcional)
    setTimeout(() => {
      navigate(PATH_AUTH.signin);
    }, 3000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: '100%', padding: '1rem' }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Bem-vindo ao InvControl
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Sistema desenvolvido para a Vilalt Café.
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', width: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Esqueci minha senha</Title>
          <Text>Digite seu email para restaurar sua senha</Text>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            style={{ width: '100%' }}
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Flex align="center" gap="15px">
                <Button 
                  type="default" 
                  size="middle"
                  // style={{marginLeft: '15px'}} 
                  onClick={() => navigate(PATH_AUTH.signin)}
                  loading={loading}>
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Enviar
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
