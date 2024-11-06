import { Flex, Space, Button, Typography, message, Col, Row, Table } from 'antd';
import { useStylesContext } from '../context';
import { PageHeader, Card } from '../components';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../global';

export const AboutPage = () => {
const stylesContext = useStylesContext();
const contentRef = useRef<HTMLDivElement>(null);
const [dataProducts, setDataProducts] = useState([]);

const handlePrint = useReactToPrint({
  content: () => contentRef.current,
  documentTitle: 'Relatório de produtos em falta',
  onBeforeGetContent: () => {
    const printStyles = `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        page-break-before: always;
        display: block;
        body {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
        }
        .print-adjust {
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .pagebreak {
          margin-top: 1rem;
          display: block;
          page-break-before: always;
        }
      }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = printStyles;
    document.head.appendChild(styleSheet);
  },
});

const handleButtonClick = () => {
  message.success('Relatório gerado com sucesso!');
  handlePrint();
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
  
    const intervalId = setInterval(fetchData, 60000); 
  
    return () => clearInterval(intervalId); 
  }, []);
  

  const template_impressao = <>
    <div ref={contentRef} className="print-adjust">
      <Flex vertical> 
        <Space direction="vertical" size="small">
          <Typography.Title
            level={4}
            style={{ padding: 0, margin: 0, textTransform: 'capitalize', textAlign: 'center' }}
          >
            Relatório de produtos em falta
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
      <Flex vertical>
        <PageHeader title="Emissão de relatório" />
        <Space direction="horizontal">
          <Typography.Text strong style={{ fontSize: '16px' }}>
            Produtos em falta:
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
      <div style={{ display: 'none' }}>
        <div ref={contentRef} className="print-adjust">
            {template_impressao}
        </div>
      </div>
    </div>
  );
};
