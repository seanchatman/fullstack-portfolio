const health = require('@cloudnative/health-connect')

// Set up container health for K8
let healthCheck = new health.HealthChecker()
let readyCheck = new health.PingCheck('google.com')
healthCheck.registerReadinessCheck(readyCheck)

const express = require('express'),
  serveStatic = require('serve-static'),
  // history = require('connect-history-api-fallback'),
  port = process.env.PORT || 8080

const app = express()

// app.use(history())
app.use(serveStatic(__dirname + '/dist'))

app.use('/ready', health.ReadinessEndpoint(healthCheck))
app.use('/live', health.LivenessEndpoint(healthCheck))
app.use('/health', health.HealthEndpoint(healthCheck))

console.log('k8-image/server.js: start listening')

app.listen(port, () => {
  console.log('k8-image/server.js: listening on port:', port)
})
