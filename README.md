# levi-dom

A simple JSX implementation that supports the state class

### Configuring your bundler

First install levi-dom with `npm i levi-dom` (types already included)

To configure your frontend project to use levi-dom, alter your `tsconfig.json` to have

```json
"jsx": "preserve",
"jsxImportSource": "levi-dom",
```

Then, on your transformer (like babel or swc), find the place where you configure jsx and use the following settings, (or the equivalent for your case)

```json
"runtime": "automatic",
"importSource": "levi-dom",
```
