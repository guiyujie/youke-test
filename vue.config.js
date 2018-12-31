// vue.config.js
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
    ? '/youke-test.github.io/dist/'
    : '/'
}