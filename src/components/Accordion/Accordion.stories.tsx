import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'rgb(72, 66, 131)' },
        { name: 'light', value: 'rgb(255, 255, 255)' },
      ],
    },
  },
  component: Accordion,
  argTypes: {
    question: { control: 'text' },
    answer: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    question: 'What is the purpose of this component?',
    answer: 'This component serves as an accordion to toggle the visibility of content.',
  },
};

export const LongAnswer: Story = {
  args: {
    question: 'How does this accordion work?',
    answer: 'This accordion uses a simple React state to toggle the visibility of the answer. The answer can be any length of text, and the accordion will expand or collapse based on user interaction. You can use this component to display frequently asked questions (FAQs) or any other content that should be hidden by default and shown on demand.',
  },
};