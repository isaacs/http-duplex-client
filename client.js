module.exports = HTTPDuplex

var http = require('http')
  , https = require('https')
  , util = require('util')
  , stream = require('stream')
if (process.version.match(/^\v0\.8/)) stream = require('readable-stream')

util.inherits(HTTPDuplex, stream.Duplex)
function HTTPDuplex(req, options) {
  var self = this

  if (! (self instanceof HTTPDuplex)) return new HTTPDuplex(req, options)

  stream.Duplex.call(self, options)
  self._resp = null

  if (req.https) self.http = https
  else self.http = http

  self.makeRequest(req)
}
HTTPDuplex.prototype.makeRequest = function (req) {
  var self = this
  self.req = self.http.request(req)
  self.req.on('response', function (resp) {
    self._resp = resp
    self.emit('response', resp)

    resp.on('data', function (c) {
      if (!self.push(c)) self._resp.pause()
    })
    resp.on('end', function() {
      self.push(null)
    })
  })
}

HTTPDuplex.prototype._read = function (n) {
  if (this._resp) this._resp.resume()
}

HTTPDuplex.prototype._write = function (chunk, encoding, cb) {
  return this.req.write(chunk, encoding, cb)
}

HTTPDuplex.prototype.end = function (chunk, encoding, cb) {
  return this.req.end(chunk, encoding, cb)
}
