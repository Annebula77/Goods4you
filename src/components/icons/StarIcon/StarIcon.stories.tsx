import type { Meta, StoryObj } from '@storybook/react';
import StarIcon from './StarIcon';



const meta: Meta<typeof StarIcon> = {
  title: 'Atoms/StarIcon',
  component: StarIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    fill: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof StarIcon>;

export const Default: Story = {
  args: {
    width: 20,
    height: 20,
    fill: 'rgba(213, 213, 213, 1)',
  },
};


export const Filled: Story = {
  args: {
    width: 20,
    height: 20,
    fill: 'rgba(241, 79, 79, 1)',
  },
};

export const Large: Story = {
  args: {
    width: 40,
    height: 40,
    fill: 'rgba(241, 79, 79, 1)',
  },
};