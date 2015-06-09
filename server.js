const http = require('http')
const ecstatic = require('ecstatic')(__dirname)
const port = 8080


function delayed (req, res) {
  const start = 500
  const end = 2000
  const ms = Math.floor(start + Math.random() * (end - start))
  setTimeout(function() {
    console.log('%s delayed %sms', req.url, ms)
    ecstatic(req, res)
  }, ms)
}


http.createServer(function (req, res) {
  if (/(json|png)$/i.test(req.url)) delayed(req, res)
    else ecstatic(req, res)
  }
).listen(port, function() {
  console.log('http://localhost:%s', port)
})
