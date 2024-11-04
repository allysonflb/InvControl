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
import { BASE_URL } from '../../../../global';

type Props = {
  data: Projects[];
  setData: React.Dispatch<React.SetStateAction<Projects[]>>; 
} & TableProps<any>;

export const ProjectsTable = ({ data, setData, ...others }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  const handleDelete = async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/produtosDelete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setData((prevData) => prevData.filter((item) => item.id_real !== id));
      console.log('Produto excluído com sucesso');
    } else {
      console.error('Erro ao excluir o produto');
    }
  };

  const handleUpdate = async (values: Projects) => {
    console.log({values})
    const response = await fetch(`${BASE_URL}/api/produtosUpdate/${selectedProject?.id_real}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: values.nome,
        descricao: values.descricao,
        quantidade: values.quantidade,
        preco: 0
      }),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      console.log('Produto atualizado com sucesso:', updatedProduct);
      const teste = data.map((item) => (item.id_real === selectedProject?.id_real ? updatedProduct : item))
      console.log(teste)
      setData((prevData) =>
        prevData.map((item) => (item.id_real === selectedProject?.id_real ? {...values} : item))
      );
      setOpen(false);
    } else {
      console.error('Erro ao atualizar o produto');
    }
  };

  const COLUMNS = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Produto',
      dataIndex: 'nome',
      key: 'nome',
      render: (_: any, { nome }: Projects) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {nome.substring(0, 20)}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
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
          <DeleteOutlined
            onClick={() => {
              Modal.confirm({
                title: 'Deseja realmente excluir este produto?',
                content: 'Essa ação não pode ser revertida.',
                okText: 'Sim',
                okType: 'danger',
                cancelText: 'Não',
                onOk: () => {
                  handleDelete(record.id_real);
                },
                onCancel: () => {
                  console.log('Exclusão cancelada');
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const onFinish = (values: Projects) => {
    handleUpdate(values);
    setOpen(false);
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={COLUMNS}
        className="overflow-scroll"
        rowKey="id"
        {...others}

      />
      {open && <Modal
        title="Detalhes do Produto"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={null}
      >
        {selectedProject && (
          <Form
            name="project_form"
            layout="vertical"
            initialValues={selectedProject}
            onFinish={onFinish}
          >
            <Form.Item
              name="id_real"
              style={{ display: 'none' }}
              initialValue={selectedProject.id_real}
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name="id"
              label="ID"
              initialValue={selectedProject.id}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="nome"
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
              name="descricao"
              label="Descrição"
              rules={[
                { required: true, message: 'Por favor, insira a quantidade!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="quantidade"
              label="Quantidade"
              rules={[
                { required: true, message: 'Por favor, insira a quantidade!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Atualizar Produto
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>}
    </>
  );
};
