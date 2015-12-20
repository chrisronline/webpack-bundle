## Summary
Example project of combining two, separate webpack bundles

## Installation
1. Install dependencies: `npm install`
2. Compile library bundle: `webpack --config library/webpack.config.js`
3. Compile app bundle: `webpack --config app/webpack.config.js`
4. Load `app/index.html` in a browser and see the navbar appear

## History
This is an exploratory concept of building two separate webpack bundles and allowing them to use components from each other. For the first pass, it focuses on a single direction under the concept of one bundle representing a shared library and the other representing an application