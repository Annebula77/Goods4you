import type { Meta, StoryObj } from '@storybook/react';
import QuantityButton from './QuantityButton';

const meta: Meta<typeof QuantityButton> = {
  title: 'Molecules/QuantityButton',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: QuantityButton,
  argTypes: {
    quantity: { control: 'number', defaultValue: 1 },
    onIncrement: { action: 'increment clicked' },
    onDecrement: { action: 'decrement clicked' },
    onInputChange: { action: 'input changed' },
    decrementDisabled: { control: 'boolean' },
    incrementDisabled: { control: 'boolean' },
    hovered: { control: 'boolean' },
    background: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof QuantityButton>;

export const Default: Story = {
  args: {
    quantity: 1,
  },
};

export const DisabledDecrement: Story = {
  args: {
    quantity: 0,
    decrementDisabled: true,
  },
};

export const DisabledIncrement: Story = {
  args: {
    quantity: 10,
    incrementDisabled: true,
  },
};

export const WithHoverBackground: Story = {
  args: {
    quantity: 5,
    hovered: true,
    background: true,
  },
};