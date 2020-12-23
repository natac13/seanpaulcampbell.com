const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  target: 'serverless',
  assetPrefix: !debug ? 'seanpaulcampbell.com/' : '',
}
