var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as k8s from '@kubernetes/client-node';
// import type { RequestHandler } from 'express';
console.log('msc loaded');
var kc = new k8s.KubeConfig();
kc.loadFromCluster();
var k8sApi = kc.makeApiClient(k8s.CoreV1Api);
console.log(kc);
// const metricServerController = {};
var metricsClient = new k8s.Metrics(kc);
export default {
    getTopPods: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var data, totalUsage_1, topPods, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, k8s.topPods(k8sApi, metricsClient, '')];
                case 1:
                    data = _a.sent();
                    totalUsage_1 = data.reduce(function (acc, pod) {
                        // previously, had passed pod.CPU.CurrentUsage to parseFloat method in the following two lines
                        acc.totalCpu += Number(pod.CPU.CurrentUsage);
                        acc.totalMemory += Number(pod.Memory.CurrentUsage);
                        return acc;
                    }, { totalCpu: 0, totalMemory: 0 });
                    topPods = data.map(function (pod) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        return {
                            NODE_NAME: (_b = (_a = pod.Pod.spec) === null || _a === void 0 ? void 0 : _a.nodeName) !== null && _b !== void 0 ? _b : 'defaultNodeName',
                            POD_NAME: (_d = (_c = pod.Pod.metadata) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : 'defaultPodName',
                            UID: (_f = (_e = pod.Pod.metadata) === null || _e === void 0 ? void 0 : _e.uid) !== null && _f !== void 0 ? _f : 'defaultUIDName',
                            CREATED_AT: (_h = (_g = pod.Pod.metadata) === null || _g === void 0 ? void 0 : _g.creationTimestamp) !== null && _h !== void 0 ? _h : 'defaultTimeStamp',
                            CPU_USAGE_CORES: (_j = pod.CPU.CurrentUsage) !== null && _j !== void 0 ? _j : 0,
                            // previously, had passed pod.CPU.CurrentUsage to parseFloat method
                            CPU_PERCENTAGE: ((Number(pod.CPU.CurrentUsage) / totalUsage_1.totalCpu) *
                                100).toFixed(3),
                            // number is provided as bigInt by api
                            MEMORY_USAGE_BYTES: Number(pod.Memory.CurrentUsage),
                            // previously, had passed pod.CPU.CurrentUsage to parseFloat method
                            MEMORY_PERCENTAGE: ((Number(pod.Memory.CurrentUsage) / totalUsage_1.totalMemory) *
                                100).toFixed(3),
                            CONTAINER_COUNT: pod.Containers.length,
                            CONDITIONS: (_l = (_k = pod.Pod.status) === null || _k === void 0 ? void 0 : _k.conditions) !== null && _l !== void 0 ? _l : 'defaultCondition',
                        };
                    });
                    res.locals.topPods = topPods;
                    return [2 /*return*/, next()];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, next({
                            log: "metricServerController.getTopPods: ERROR ".concat(err_1),
                            status: 500,
                            message: {
                                err: 'Error occured in metricServerController.getTopPods. Check server logs.',
                            },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getTopNodes: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var data, topNodes, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, k8s.topNodes(k8sApi)];
                case 1:
                    data = _a.sent();
                    topNodes = data.map(function (node) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                        return {
                            NODE_NAME: (_b = (_a = node.Node.metadata) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'defaultNodeName',
                            UID: (_d = (_c = node.Node.metadata) === null || _c === void 0 ? void 0 : _c.uid) !== null && _d !== void 0 ? _d : 'defaultUID',
                            CREATED_AT: (_f = (_e = node.Node.metadata) === null || _e === void 0 ? void 0 : _e.creationTimestamp) !== null && _f !== void 0 ? _f : 'defaultTimeStamp',
                            IP_ADDRESSES: (_h = (_g = node.Node.status) === null || _g === void 0 ? void 0 : _g.addresses) !== null && _h !== void 0 ? _h : 'defaultIPAddress',
                            RESOURCE_CAPACITY: (_k = (_j = node.Node.status) === null || _j === void 0 ? void 0 : _j.capacity) !== null && _k !== void 0 ? _k : 'defaultCapacity',
                            ALLOCATABLE_RESOURCES: (_m = (_l = node.Node.status) === null || _l === void 0 ? void 0 : _l.allocatable) !== null && _m !== void 0 ? _m : 'defaultAllocatable',
                            NODE_INFO: (_p = (_o = node.Node.status) === null || _o === void 0 ? void 0 : _o.nodeInfo) !== null && _p !== void 0 ? _p : 'defaultNodeInfo',
                            CONDITIONS: (_r = (_q = node.Node.status) === null || _q === void 0 ? void 0 : _q.conditions) !== null && _r !== void 0 ? _r : 'defaultConditions',
                            CPU_CAPACITY: node.CPU.Capacity,
                            CPU_REQUEST_TOTAL: node.CPU.RequestTotal,
                            CPU_LIMIT_TOTAL: node.CPU.LimitTotal,
                            MEMORY_CAPACITY: Number(node.Memory.Capacity),
                            MEMORY_REQUEST_TOTAL: Number(node.Memory.RequestTotal),
                            MEMORY_LIMIT_TOTAL: Number(node.Memory.LimitTotal),
                        };
                    });
                    res.locals.topNodes = topNodes;
                    return [2 /*return*/, next()];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, next({
                            log: "metricServerController.getTopNodes: ERROR ".concat(err_2),
                            status: 500,
                            message: {
                                err: 'Error occured in metricServerController.getTopNodes. Check server logs.',
                            },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
// export default metricServerController;
