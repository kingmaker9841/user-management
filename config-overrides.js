// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useBabelRc, override } = require('customize-cra')

// eslint-disable-next-line no-undef
module.exports = override(useBabelRc())
