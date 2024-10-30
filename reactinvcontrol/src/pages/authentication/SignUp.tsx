import {
  Button,
  Checkbox,
  Col,
  Divider,
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
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cPassword?: string;
  terms?: boolean;
};

export const SignUpPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    setLoading(true);

    // Validação adicional para verificar se as senhas coincidem
    if (values.password !== values.cPassword) {
      message.error('As senhas não correspondem!');
      setLoading(false);
      return;
    }

    try {
      // Fazer a requisição POST para o backend usando fetch
      const response = await fetch('http://localhost/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`, // Enviando nome completo
          email: values.email,
          password: values.password,
          password_confirmation: values.cPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && !response.redirected) {
        setTimeout(() => {
            navigate(PATH_AUTH.signin);
        }, 1000);
      }

      if (!response.ok) {
        if (data.errors) {
          // Exibir erros específicos do backend
          if (data.errors.email) {
            message.error('O email já está em uso.');
          } else if (data.errors.password) {
            message.error('A senha deve ter pelo menos 8 caracteres.');
          }
        } else {
          message.error('Erro ao cadastrar usuário.');
        }
        return;
      }
  
      message.success('Usuário cadastrado com sucesso!');
      // Redirecionar ou realizar outras ações necessárias
    } catch (error) {
      message.error('Erro ao cadastrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Erro ao preencher o formulário.'); // Mensagem para o usuário
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
          <Title className="m-0">Crie uma conta</Title>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="Nome"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor coloque o seu primeiro nome!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="Sobrenome"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Por favor coloque seu sobrenome!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor coloque seu email' },
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
                    { required: true, message: 'Por favor coloque sua senha!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Confirme a senha"
                  name="cPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Verifique se as senhas coincidem!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="terms" valuePropName="checked">
                  <Flex>
                    <Checkbox>Eu concordo com</Checkbox>
                    <Link>termos e condições de uso</Link>
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" gap="15px">
                <Button
                  type="default"
                  size="middle"
                  loading={loading}
                  onClick={() => navigate(PATH_AUTH.signin)}
                >
                  Voltar
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Cadastrar
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
