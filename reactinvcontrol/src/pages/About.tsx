import { Flex, Space, Button, Typography, message, Col, Row, Table } from 'antd';
import { useStylesContext } from '../context';
import { PageHeader, Card } from '../components';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../global';

export const AboutPage = () => {
const stylesContext = useStylesContext();
const contentRef = useRef<HTMLDivElement>(null);
const reactToPrintFn = useReactToPrint({ contentRef });
const [dataProducts, setDataProducts] = useState([]);
const onChange = (date:any, dateString:any) => {
  console.log(date, dateString);
};
const handleButtonClick = () => {
  message.success('Relatório gerado com sucesso!');
  reactToPrintFn();
};

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
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
      onCell: () => {
        return {
          style: {
            backgroundColor: 'white',
            color: 'red',
          },
        };
      },
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/produtosZero`);
        const result = await response.json();
        setDataProducts(result["Produtos:"]);
        console.log('Dados recebidos da API:', result["Produtos:"]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData(); 
  
    const intervalId = setInterval(fetchData, 10000); 
  
    return () => clearInterval(intervalId); 
  }, []);
  

  const template_em_branco_impressao = <>
    <div ref={contentRef} className="print-adjust">
    <Flex vertical> 
      {/* <PageHeader title="Relatório de produtos faltantes" /> */}
      <Space direction="vertical" size="small">
        <Typography.Title
          level={4}
          style={{ padding: 0, margin: 0, textTransform: 'capitalize', textAlign: 'center' }}
        >
          Relatório de produtos faltantes
        </Typography.Title>
      </Space>
        <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <Card
            title="Listagem de Produtos"
            style={{ textAlign: 'left' }}
          >
            <Table dataSource={dataProducts} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
    </Flex>  
    </div>
  </>

  return (
    <div>
      <div style={{ display: 'none' }}>
        <div ref={contentRef} className="print-adjust">
            {template_em_branco_impressao}
        </div>
      </div>
      <Flex vertical>
        <PageHeader title="Emissão de relatório" />
        <Space direction="horizontal">
          <Typography.Text strong style={{ fontSize: '16px' }}>
            Produtos com estoque 0:
          </Typography.Text>
          <Button
            type="primary"
            style={{
              backgroundColor: 'blue',
              borderColor: 'blue',
              margin: '10px',
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
