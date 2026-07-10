const [dir, type, ext] = process.argv.slice(2)
const run = async () => {
  const { default: fn } = await import(`./${type}.js`);
  fn(dir, ext);
};

run();
