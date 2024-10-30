import { Card, PageHeader, ProjectsTable } from '../../components';
import { Col, Row, Button, Modal, Form, Input } from 'antd';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../global';

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();
  const {} = useFetchData('../mocks/TasksList.json');
  const { data: projectsData = [] } = useFetchData('../mocks/Projects.json');
  const {} = useFetchData('../mocks/Notifications.json');

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm(); 
  const [dataProducts, setDataProducts] = useState([]); 

  const handleAddClick = () => {
    setModalVisible(true); // Abre o modal
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values: ', values);
        // Aqui você pode adicionar a lógica para adicionar um novo projeto
        form.resetFields(); // Reseta os campos do formulário
        setModalVisible(false); // Fecha o modal
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/produtos`); // Faz a requisição GET para a URL
        const result = await response.json();
        setDataProducts(result["Produtos:"]); // Salva os dados na variável de estado
        console.log('Dados recebidos da API:', result["Produtos:"]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData(); // Chama a função fetchData inicialmente
  
    const intervalId = setInterval(fetchData, 60000); // Configura o intervalo para chamar fetchData a cada 60 segundos
  
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, []);
  
  useEffect(() => {
    console.log('Data Products atualizado:', dataProducts);
  }, [dataProducts]);

  return (
    <div>
      <PageHeader title="Dashboard" />
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <Card
            title="Listagem de Produtos"
            extra={
              <Button type="primary" onClick={handleAddClick}>
                Adicionar
              </Button>
            }
          >
            <ProjectsTable key="all-projects-table" data={dataProducts} />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Adicionar Novo Projeto"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        footer={null} // Remove o footer padrão para personalização
      >
        <Form
          form={form}
          name="add_project_form"
          layout="vertical"
          onFinish={handleModalOk}
        >
          <Form.Item
            name="project_name"
            label="Produto"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o nome do produto!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="client_name"
            label="Descrição"
            rules={[
              { required: true, message: 'Por favor, insira a descrição!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="team_size"
            label="Quantidade"
            rules={[
              { required: true, message: 'Por favor, insira a quantidade!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar Projeto
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
