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
