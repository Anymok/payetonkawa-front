const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

async function getSecret() {
  const [version] = await client.accessSecretVersion({
    name: `projects/407867033210/secrets/inventory_service_env/versions/latest`,
  });

  return version.payload.data.toString('utf8');
}

module.exports = {
  getSecret,
};
