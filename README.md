# Markdown to HTML Converter
This program implements a Markdown to HTML converter based on the spec from [this assignment]('./assignment.md').

Some assumptions are being made:
1. Converter should honor punctuation.
2. Each line of markdown should be treated independently.

## Steps to use:
1. Ensure nvm + node are available on local machine.
    - [NVM](https://formulae.brew.sh/formula/nvm)
    - [Node](https://nodejs.org/en/)
2. `nvm use && npm i`
3. `npm run convert`
    - _NOTE: `process.env.INPUT_FILE_PATH` && `process.env.OUTPUT_FILE_PATH` are required. Default values are provided in `./env.sh` to get started._
4. `npm test` is also available to run unit tests

