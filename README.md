# rubedo-dom

A simple JSX implementation that supports the state class

### Configuring your bundler

First install rubedo-dom with `npm i rubedo-dom` (types already included)

To configure your frontend project to use rubedo-dom, alter your `tsconfig.json` to have

```json
"jsx": "react-jsx",
"jsxImportSource": "rubedo-dom",
```

Then, on your transformer (like babel or swc), find the place where you configure jsx and use the following settings, (or the equivalent for your case)

```json
"runtime": "automatic",
"importSource": "rubedo-dom",
```
