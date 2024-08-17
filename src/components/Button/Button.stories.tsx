import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    padding: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;


export const Default: Story = {
  args: {
    children: 'Click Me',
    padding: '20px 50px',
  },
};


export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};


export const CustomPadding: Story = {
  args: {
    children: 'Custom Padding Button',
    padding: '10px 30px',
  },
};

