/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

const Button = () => <button type="button">Click</button>;

export default {
  title: 'Button',
  component: Button,
};

export const Primary = {
  args: {},
};

export const WithState = {
  render: () => {
    const [clicked, setClicked] = useState(false);
    return <Button />;
  },
};
