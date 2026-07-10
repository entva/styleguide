/* eslint-disable @typescript-eslint/no-unused-vars */

export type MyType = {
  prop: string,
  otherProp: number,
};

export const __dirname = 'blah';
const Component = {};

const Alignment = (
  <div
    className="class"
  />
);

const CurlySpacing = <div className={`class${1}`} />;

const Keys = ([] as string[]).map((item: string) => (
  <div key={item} />
));

const Ref = () => <div ref={(el) => el} />;

const Quote = () => <div data-thing="hello" />;

const Empty = () => <div />;

const ImageNoAlt = () => <img src="image.png" />;

class RenderRequired extends Component {
  render() {
    return <div>{this.content}</div>;
  }
}

const NestedComponentProp = () => <Component getSwitch={(item) => <Empty>{item}</Empty>} />;
