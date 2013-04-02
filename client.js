// vim: set softtabstop=3 shiftwidth=3:
module . exports = ZombieJesus

var http = require ('http')
var util = require ('util')
var stream = require ('stream')
if (process.version.match(/^\v0\.8/))
   stream = require ('readable-stream')

util . inherits (ZombieJesus, stream . Duplex)
function ZombieJesus (req, options) {
   var ΑΩ = this

   if (! (ΑΩ instanceof ZombieJesus))
      return new ZombieJesus (req, options)

   stream . Duplex.call (ΑΩ, options)
   ΑΩ . _α = http . request (req)
   ΑΩ . _α . on ('response', function (ω) {
      ΑΩ . _ω = ω
      ω . on ('data', function (c) {
         if (!ΑΩ . push (c))
            ΑΩ . _ω . pause ()
      })
      ω . on ('end', function() {
         ΑΩ . push (null)
      })
   })
   ΑΩ . _ω = null
}

ZombieJesus . prototype . _read = function (n) {
   if (this . _ω)
      this . _ω . resume ()
}

ZombieJesus . prototype . _write = function (chunk, encoding, cb) {
   return this . _α . write (chunk, encoding, cb)
}

ZombieJesus . prototype . end = function (chunk, encoding, cb) {
   return this . _α . end (chunk, encoding, cb)
}

//
//                               |
//                   \           |           /
//                    \          |          /
//                     \        _j_        /
//                      \    _ |✟✟✟| _    /
//                       \.-"  |✟✟✟|  "-./
//        `-._          .'_____|✟✟✟|_____`.          _.-'
//            `-._    .' |✟✟✟✟✟✟✟✟✟✟✟✟✟✟✟| `.    _.-'
//                `-./ | |✟✟✟✟✟✟✟✟✟✟✟✟✟✟✟|   \,-'
//                  /__|__"""""|✟✟✟|""""" _|_ \
//                 |   |  _..::|✟✟✟|::.._  |   |
//        ---------|..-|:::::::|✟✟✟|:::::::|-..|---------
//               .-::::|:::::::|✟✟✟|::::::::::::-.
//             .:::::::|:::::::|✟✟✟|:::::::::::::::.
//           .:::::::::::::::::|✟✟✟|:::::::::::::::::.
//          :::::::::::::::::::|✟✟✟|:::::::::::::::::::
//        .::::::::::::::::::::|✟✟✟|::::::::::::::::::::.
//       .::::::::::::::::::::::"""::::::::::::::::::::::.
//      _____ _____     _____     _______  _______  _____   _____
//       \ /   \ /      / _ \      \  __ \  \  __ \  \ /     \ /
//       | |   | |     / / \ \     | |  \ \ | |  \ \  \ \   / /
//       | |___| |    / /___\ \    | |__/ / | |__/ /   \ \_/ /
//       |  ___  |    |  ___  |    |  ___/  |  ___/     \   /
//       | |   | |    | |   | |    | |      | |          | |
//       | |   | |    | |   | |    | |      | |          | |
//      _/_\_ _/_\_  _/_\_ _/_\_  _/_\_    _/_\_        _/_\_
// _________      _____      ______   _________  _________  _______
//  \  ____ |     / _ \     / ____ | | __   __ |  \  ____ |  \  __ \
//  | |    \|    / / \ \   / /    \| |/  | |  \|  | |    \|  | |  \ \
//  | |__/|     / /___\ \  \ \____       | |      | |__/|    | |__/ /
//  |  __ |     |  ___  |   \____ \      | |      |  __ |    |  __ <
//  | |  \|     | |   | |        \ \     | |      | |  \|    | |  \ \
//  | |____/|   | |   | |  |\____/ /     | |      | |____/|  | |   | |
// _/_______|  _/_\_ _/_\_ |______/     _/_\_    _/_______| _/_\_ _/_\_
