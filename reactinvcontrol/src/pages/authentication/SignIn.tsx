import {
  Button,
  Checkbox,
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

const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    console.log('Success:', values);
    setLoading(true);

    try {
        const response = await fetch('http://localhost/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });

        // Se o status for 200 e não houver redirecionamento, o login foi bem-sucedido
        if (response.ok && !response.redirected) {
            message.open({
                type: 'success',
                content: 'Login bem-sucedido.',
            });
            setTimeout(() => {
                navigate(PATH_DASHBOARD.default);
            }, 1000);
        } else {
            const errorData = await response.json();
            message.error(errorData.message || 'Login falhou. Verifique suas credenciais.');
        }
    } catch (error) {
        message.error('Login falhou. Verifique suas credenciais.');
    } finally {
        setLoading(false);
    }
};
  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleButtonClick = () => {
    navigate(PATH_AUTH.passwordReset);
  };

  const handleButtonCreateAccount = () => {
    navigate(PATH_AUTH.signup);
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
          style={{ height: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Login</Title>

          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              email: 'demo@email.com',
              password: 'demo123',
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor digite seu email' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Senha"
                  name="password"
                  rules={[
                    { required: true, message: 'Por favor digite sua senha!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Flex align='center' justify='space-between'>
                    <Checkbox>Lembre-me</Checkbox>
                    <Button
                    type="link"
                    size="middle"
                    onClick={handleButtonCreateAccount}
                  >
                    Crie sua conta
                  </Button>
                  <Button
                    type="link"
                    size="middle"
                    onClick={handleButtonClick}
                  >
                    Esqueceu sua senha?
                  </Button>
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Continuar
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
