// next-storybook.json's storybook/* rules only apply to **/*.stories.* files (see the
// "files" override in next-storybook.json). This proves the eslint-plugin-storybook
// jsPlugin actually loads and fires -- there was previously zero coverage for it.

// expect: storybook/default-exports
export const Primary = { args: {} };
