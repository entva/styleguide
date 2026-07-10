/* eslint-disable @typescript-eslint/no-unused-vars */
const React = {};

// expect: react/no-deprecated
const Method = React.createClass({});

// expect: react/prefer-stateless-function
class Inherited extends React.Component {
  render() {
    return null;
  }
}
