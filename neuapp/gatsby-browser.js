import python from 'codemirror/mode/python/python' // eslint-disable-line no-unused-vars

// This doesn't have to be here – but if we do import Juniper here, it's already
// preloaded and cached when we dynamically import it in code.js.
import Juniper from './src/components/juniper' // eslint-disable-line no-unused-vars

// theme - https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
require("prismjs/themes/prism-tomorrow.css")
