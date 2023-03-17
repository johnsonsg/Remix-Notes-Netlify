import { createRequestHandler } from '@remix-run/netlify'
import * as build from '@remix-run/dev/server-build'

/*
 * Returns a context object with at most 3 keys:
 *  - `netlifyGraphToken`: raw authentication token to use with Netlify Graph
 *  - `clientNetlifyGraphAccessToken`: For use with JWTs generated by
 *    `netlify-graph-auth`.
 *  - `netlifyGraphSignature`: a signature for subscription events. Will be
 *    present if a secret is set.
 */
function getLoadContext(event, context) {
  let rawAuthorizationString
  let netlifyGraphToken

  if (event.authlifyToken != null) {
    netlifyGraphToken = event.authlifyToken
  }

  const authHeader = event.headers['authorization']
  const graphSignatureHeader = event.headers['x-netlify-graph-signature']

  if (authHeader != null && /Bearer /gi.test(authHeader)) {
    rawAuthorizationString = authHeader.split(' ')[1]
  }

  const loadContext = {
    clientNetlifyGraphAccessToken: rawAuthorizationString,
    netlifyGraphToken: netlifyGraphToken,
    netlifyGraphSignature: graphSignatureHeader
  }

  // Remove keys with undefined values
  Object.keys(loadContext).forEach(key => {
    if (loadContext[key] == null) {
      delete loadContext[key]
    }
  })

  return loadContext
}

export const handler = createRequestHandler({
  build,
  getLoadContext,
  mode: process.env.NODE_ENV
})
