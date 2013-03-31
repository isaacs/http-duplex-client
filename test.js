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
