# Nextjs Typescript + TailwindCSS Template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

---

## Make it a scalable fullstack app (optional).

### 1. Git Hooks (Husky)

Add Husky to the project

```bash
yarn add -D husky
```

Install Husky

```bash
npx husky install
```

Add Husky script.

This will run on every commit for everyone.

```bash
npx husky add .husky/pre-commit "yarn lint"
```

This will run on every push & on every successful production build.

```bash
npx husky add .husky/pre-push "yarn build"
```

Add script to package.json.

This will make sure that everyone who clone this project, during a yarn or npm install will install husky also and use the pre commit and pre push hooks provided above.

```json
"prepare": "husky install"
```

Add commitlint packages.

The cli package is what will enforce the commits and conventional is preconfigured settings that are a set of common standards.

```bash
yarn add -D @commitlint/config-conventional @commitlint/cli
```

Add commitlint config file:

We don’t neccessarily need this file, it’s a copy from the @commitlint/config-conventional file.

If we have it in the root of the project we can easily see what the different rules or prefixes for a commit are.

```bash
commitlint.config.js
```

Add the commitlint Husky hook:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### 2. Storybook

Install Storybook

```bash
npx sb init --builder webpack5
```

Update .eslintrc.json file with the following:

```json
{
  "extends": [
    "plugin:storybook/recommended",
    "next",
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  "globals": {
    "React": "readonly"
  },
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
  },
  "overrides": [
    {
      // or whatever matches stories specified in .storybook/main.js
      "files": ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      "rules": {
        // example of overriding a rule
        "storybook/hierarchy-separator": "error",
        // example of disabling a rule
        "storybook/default-exports": "off"
      }
    }
  ]
}
```

Add resolutions webpack 5 to package.json file.

We wan’t to make sure that the tools we are using uses webpack version 5.

```json
"resolutions": {
  "webpack": "^5"
}
```

Run yarn install after adding the above to the package.json file.

Update .storybook/main.js file with the following:

```js
module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
```

Update .storybook/preview.js file with the following:

This will help Storybook to understand and handle the Next Image component.

```js
// @ts-check
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';

const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    console.log(val);
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

// Allow Storybook to handle Next's <Image> component
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
```

Add the BaseTemplate.stories.tsx file to the components/templates/base component.

```js
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BaseTemplate, { IBaseTemplate } from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

export default {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BaseTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BaseTemplate> = (args) => (
  <BaseTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as IBaseTemplate;

```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
