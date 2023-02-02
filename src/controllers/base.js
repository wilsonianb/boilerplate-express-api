import config from '../config';
const Client = require('kubernetes-client').Client
const K8sConfig = require('kubernetes-client').config

const deploy = {
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "nginx-untrusted",
    "annotations": {
      "io.kubernetes.cri.untrusted-workload": "true"
    }
  },
  "spec": {
    "containers": [
      {
        "name": "nginx",
        "image": "nginx"
      }
    ]
  }
}

exports.get = async (req, res) => {
	// const client = new Client({ config: K8sConfig.fromKubeconfig(), version: '1.9' })
	console.log(K8sConfig.getInCluster())
	const client = new Client({ config: K8sConfig.getInCluster(), version: '1.9' })
// console.log(await client.api.v1.namespaces.get())
	const create = await client.api.v1.namespaces('default').pods.post({ body: deploy })
	console.log(await client.api.v1.namespaces('default').pods(deploy.metadata.name).get())
	res.json({ status: 'OK', code: 200 });
};
