import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: 'AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: (title: string) => console.log(title),
        color: { control: 'color' },
    },
};

export default meta;

type Story = StoryObj<typeof AddItemForm>

export const AddItemFormChangeColor: Story = {
    args: {
        callback(title) {
            console.log(title)
        },
        color: "red"
    },
};