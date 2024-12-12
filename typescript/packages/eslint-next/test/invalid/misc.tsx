/* eslint-disable @typescript-eslint/no-unused-vars */

export type MyType = {
  // expect: @stylistic/ts/member-delimiter-style
  className: string;
};

// expect: @typescript-eslint/no-explicit-any
const age: any = 'seventeen';

// expect: @typescript-eslint/no-explicit-any
type Anything = any;

const Component = {};

// expect: react/function-component-definition, func-style
function FunctionExprComponent(props: MyType) {
  return <div {...props} />;
}

// expect: react/jsx-wrap-multilines
const Alignment = <div
  // expect: react/jsx-closing-bracket-location, react/jsx-indent-props
                  className="class" />;

// expect: no-multi-spaces
const Spacing = <div className="class"  />;

// expect: react/jsx-curly-spacing, react/jsx-curly-brace-presence
const CurlySpacing = <div className={ 'class' } />;

const Keys = [].map((item, index) => (
  // expect: react/no-array-index-key
  <div key={index} />
));

// expect: react/no-string-refs
const Ref = () => <div ref="hello" />;

// expect: jsx-quotes
const Quote = () => <div data-thing='hello' />;

// expect: react/self-closing-comp
const Empty = () => <div></div>;

class RenderRequired extends Component {
  // expect: react/require-render-return
  render() {
    this.content = (<div />);
  }
}
