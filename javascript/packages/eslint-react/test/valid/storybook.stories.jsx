import { useState } from 'react';

const Button = (props) => <button type="button" {...props} />;

export default {
  title: 'Button',
  component: Button,
};

export const Primary = {
  args: {
    children: 'Click me',
  },
};

export const WithState = {
  render: () => {
    const [clicked, setClicked] = useState(false);
    return (
      <Button onClick={() => setClicked(true)}>
        {clicked ? 'Clicked' : 'Click me'}
      </Button>
    );
  },
};
