import {
  Modal,
  Space,
  Table,
  TableProps,
  Typography,
  Button,
  Form,
  Input,
} from 'antd';
import { Projects } from '../../../../types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

type Props = {
  data: Projects[];
} & TableProps<any>;

export const ProjectsTable = ({ data, ...others }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  const COLUMNS = [
    {
      title: 'ID',
      dataIndex: 'team_size',
      key: 'proj_team_size',
    },
    {
      title: 'Produto',
      dataIndex: 'project_name',
      key: 'proj_name',
      render: (_: any, { project_name }: Projects) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {project_name.substring(0, 20)}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'team_size',
      key: 'proj_team_size',
    },
    {
      title: 'Quantidade',
      dataIndex: 'client_name',
      key: 'proj_client_name',
    },
    {
      title: 'Ação',
      key: 'action',
      width: 100,
      render: (_: any, record: Projects) => (
        <Space size={[10, 1]} wrap>
          <EditOutlined
            onClick={() => {
              setSelectedProject(record);
              setOpen(true);
            }}
          />
          <DeleteOutlined onClick={() => {}} />
        </Space>
      ),
    },
  ];

  const onFinish = (values: Projects) => {
    console.log('Form Values: ', values);
    // Aqui você pode adicionar a lógica para atualizar o projeto, se necessário
    setOpen(false); // Fecha o modal após a submissão
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={COLUMNS}
        className="overflow-scroll"
        {...others}
      />
      <Modal
        title="Detalhes do Projeto"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={null} // Remover o footer padrão para personalizar
      >
        {selectedProject && (
          <Form
            name="project_form"
            layout="vertical"
            initialValues={selectedProject} // Preencher os valores iniciais do formulário
            onFinish={onFinish}
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
                { required: true, message: 'Por favor, insira a quantidade!' },
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
                Atualizar Projeto
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};
