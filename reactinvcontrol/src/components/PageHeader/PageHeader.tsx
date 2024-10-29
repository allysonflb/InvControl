import React from 'react';
import { Divider, Space, Typography } from 'antd';

import './styles.css';

type Props = {
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeader = ({ title, ...others }: Props) => {
  return (
    <div {...others}>
      <Space direction="vertical" size="small">
        <Typography.Title
          level={4}
          style={{ padding: 0, margin: 0, textTransform: 'capitalize' }}
        >
          {title}
        </Typography.Title>
      </Space>
      <Divider orientation="right" plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
};
