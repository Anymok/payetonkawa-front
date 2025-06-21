
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('app-engine-log'); 

function writeLog(severity, message) {
    const metadata = {
        resource: { type: 'gae_app', labels: { module_id: process.env.GAE_SERVICE || 'default' } },
        severity: severity,
    };
    const entry = log.entry(metadata, message);
    log.write(entry).catch(err => console.error('Error writing log entry:', err));
}

module.exports = {
    writeLog,
  };