import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { PageHeader } from './PageHeader.tsx';

const meta = {
  title: 'Components/Page header',
  component: PageHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    title: 'Dashboard',
    style: { width: 800 },
  },
};

export const Complex: Story = {
  args: {
    title: 'Dashboard',
    style: { width: 800 },
  },
};
