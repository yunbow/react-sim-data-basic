import type { Meta, StoryObj } from '@storybook/react';
import { StackVisualizer } from '../features/simulator/components/StackVisualizer';

const meta = {
  title: 'Simulator/StackVisualizer',
  component: StackVisualizer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StackVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    state: {
      items: [],
      highlightIndex: null,
    },
  },
};

export const WithItems: Story = {
  args: {
    state: {
      items: [10, 20, 30, 40, 50],
      highlightIndex: null,
    },
  },
};

export const WithHighlight: Story = {
  args: {
    state: {
      items: [10, 20, 30, 40, 50],
      highlightIndex: 4,
    },
  },
};

export const LargeStack: Story = {
  args: {
    state: {
      items: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
      highlightIndex: null,
    },
  },
};
