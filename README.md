# Mollie Components Examples

This repository contains examples on how to implement [Mollie Components](https://docs.mollie.com/guides/mollie-components/overview). Mollie Components is a set of Javascript APIs that allow you to add the fields needed for credit card holder data to your own checkout, in a way that is fully PCI-DSS SAQ-A compliant.

## Documentation

- [Guide](https://docs.mollie.com/guides/mollie-components/overview)
- [API Reference](https://docs.mollie.com/guides/mollie-components/reference)
- [Handling errors](https://docs.mollie.com/guides/mollie-components/handling-errors)
- [Styling](https://docs.mollie.com/guides/mollie-components/styling)

## Examples

- [Example 1](./example-1) Bear minimum example for mollie component ([codepen](example-2))
- [Example 2](./example-2) Floating label ([codepen](example-2))
- [Example 3](./example-3) compact version ([codepen](example-2))

## Running locally

We recommend that to serve the examples via a webserver. Although its plain HTML, CSS and JavaScript Mollie components needs a valid hostename (e.g. localhost or 127.0.0.1). For this readme we use the [serve](https://www.npmjs.com/package/serve) package.

Clone the repo

```bash
git clone git@github.com:mollie/components-examples.git
```

Navigate to the the repo

```bash
cd components-example
```

Serve the examples via a webserver

```bash
npx serve
```
