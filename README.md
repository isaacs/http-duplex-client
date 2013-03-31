# http-duplex-client

Duplex API for making an HTTP request (write the req, read the response)

## Usage

```javascript
// vim: set softtabstop=3 shiftwidth=3:
var HttpDuplex = require ('./client.js')
var fs = require ('fs')
var input = fs . createReadStream (__filename)
var http = require ('http')
var assert = require ('assert')

var server = http . createServer (function (req, res) {
   req . pipe (res)
   server . close ()
})

server . listen (1337, function () {
   var req = HttpDuplex ({ port: 1337, method: 'POST' })
   input . pipe (req)
   var result = ''
   req . setEncoding ('utf8')
   req . on ('data', function (c) {
      result += c
   })
   req . on ('end', function () {
      assert . equal (result, fs . readFileSync (__filename, 'utf8'))
      console . log ('ok')
   })
})
```

You can do anything to it that you can do with a normal http request
or response in Node.

If you're using Node v0.8, it'll try to load `readable-stream`.  Make
sure you install that.  In node 0.10, it doesn't do that.
