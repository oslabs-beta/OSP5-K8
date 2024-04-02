import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const metricServerController = {};

const metricsClient = new k8s.Metrics(kc);

metricServerController.getTopPods = async (req, res, next) => {
  try {
    const data = await k8s.topPods(k8sApi, metricsClient, '');
    const totalUsage = data.reduce(
      (acc, pod) => {
        acc.totalCpu += parseFloat(pod.CPU.CurrentUsage);
        acc.totalMemory += parseFloat(Number(pod.Memory.CurrentUsage));
        return acc;
      },
      { totalCpu: 0, totalMemory: 0 }
    );
    const topPods = data.map((pod) => {
      return {
        NODE_NAME: pod.Pod.spec.nodeName,
        POD_NAME: pod.Pod.metadata.name,
        UID: pod.Pod.metadata.uid,
        CREATED_AT: pod.Pod.metadata.creationTimestamp,
        CPU_USAGE_CORES: pod.CPU.CurrentUsage,
        CPU_PERCENTAGE: (
          (parseFloat(pod.CPU.CurrentUsage) / totalUsage.totalCpu) *
          100
        ).toFixed(3),
        // number is provided as bigInt by api
        MEMORY_USAGE_BYTES: Number(pod.Memory.CurrentUsage),
        MEMORY_PERCENTAGE: (
          (parseFloat(Number(pod.Memory.CurrentUsage)) /
            totalUsage.totalMemory) *
          100
        ).toFixed(3),
        CONTAINER_COUNT: pod.Containers.length,
        CONDITIONS: pod.Pod.status.conditions,
      };
    });
    res.locals.topPods = topPods;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getTopPods: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getTopPods. Check server logs.',
      },
    });
  }
};

metricServerController.getTopNodes = async (req, res, next) => {
  try {
    const data = await k8s.topNodes(k8sApi);
    const topNodes = data.map((node) => {
      return {
        NODE_NAME: node.Node.metadata.name,
        UID: node.Node.metadata.uid,
        CREATED_AT: node.Node.metadata.creationTimestamp,
        IP_ADDRESSES: node.Node.status.addresses,
        RESOURCE_CAPACITY: node.Node.status.capacity,
        ALLOCATABLE_RESOURCES: node.Node.status.allocatable,
        NODE_INFO: node.Node.status.nodeInfo,
        CONDITIONS: node.Node.status.conditions,
        CPU_CAPACITY: node.CPU.Capacity,
        CPU_REQUEST_TOTAL: node.CPU.RequestTotal,
        CPU_LIMIT_TOTAL: node.CPU.LimitTotal,
        MEMORY_CAPACITY: Number(node.Memory.Capacity),
        MEMORY_REQUEST_TOTAL: Number(node.Memory.RequestTotal),
        MEMORY_LIMIT_TOTAL: Number(node.Memory.LimitTotal),
      };
    });
    res.locals.topNodes = topNodes;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getTopNodes: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getTopNodes. Check server logs.',
      },
    });
  }
};

export default metricServerController;
