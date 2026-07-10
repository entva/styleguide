/* eslint-disable no-unused-vars */
const Bool = (
  <input
    // expect: react/jsx-boolean-value
    disabled={true}
  />
);

const PropsPass = (props) => {
  const { a, b, ...rest } = props;
  return <div {...props} />;
};
