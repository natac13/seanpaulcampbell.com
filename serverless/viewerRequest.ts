import { CloudFrontRequestHandler } from 'aws-lambda'
import 'source-map-support/register'

const regex = /\.[A-Za-z0-9]+$/
const domainName = process.env.DOMAIN_NAME
const redirectDomainName = process.env.REDIRECT_DOMAIN_NAME
const indexDocument = 'index.html'

export const handler: CloudFrontRequestHandler = async (event, _context) => {
  const cf = event.Records[0].cf
  if (cf.request.headers.host[0].value.toLowerCase() === redirectDomainName) {
    return {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [
          {
            key: 'Location',
            value: `https://${!domainName}${!cf.request.uri}`,
          },
        ],
      },
    }
  }
  if (cf.request.uri.endsWith('/')) {
    return Object.assign({}, cf.request, {
      uri: `${!cf.request.uri}${!indexDocument}`,
    })
  }
  if (cf.request.uri.endsWith(`/${!indexDocument}`)) {
    return {
      status: '302',
      statusDescription: 'Found',
      headers: {
        location: [
          {
            key: 'Location',
            value: cf.request.uri.substr(
              0,
              cf.request.uri.length - indexDocument.length
            ),
          },
        ],
      },
    }
  }
  if (!regex.test(cf.request.uri)) {
    return {
      status: '302',
      statusDescription: 'Found',
      headers: {
        location: [
          {
            key: 'Location',
            value: `${!cf.request.uri}/`,
          },
        ],
      },
    }
  }
  return cf.request
}
