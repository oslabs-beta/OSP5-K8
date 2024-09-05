<div align="center">
  <img src="client/src/assets/nemo-final-logo2.png" alt="Logo">
</div>

<br/>

<div align='center'>

[![JavaScript](https://img.shields.io/badge/javascript-yellow?style=for-the-badge&logo=javascript&logoColor=white)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/React-343434?style=for-the-badge&logo=react&logoColor=00FFFF)](https://react.dev/)
[![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Kubernetes](https://img.shields.io/badge/kubernetes-%23326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white)](Tailwind-url)
[![D3.js](https://img.shields.io/badge/D3.js-363636?style=for-the-badge&logo=d3.js&logoColor=orange)](https://d3js.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=Chai&logoColor=white)](Chai-url)
[![Webpack](https://img.shields.io/badge/Webpack-grey?style=for-the-badge&logo=webpack&logoColor=7DF9FF)](https://jestjs.io/)

</div>

<p align="center">
Nemo provides Kubernetes cluster monitoring and data visualization in a simple and easy to understand user interface.<br/>Check out our website <a href="http://www.nemomonitoring.com/">here</a>!
</p>

<details>
  <summary><strong>Table of Contents</strong></summary>
  <ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#how-to-contribute">How to Contribute</a></li>
    <li><a href="#meet-the-team">Meet the Team</a></li>
  </ul>
</details>

## Features

- Health monitoring solution focusing on CPU and memory consumption
- Delivers insights in accesible formats, such as tables and graphs
- Provides real-time data from the GKE hosted cluster
- Includes a visualization of cluster structure with color-coded severity indicators

## Demo

<div align="center">
  <img alt="Demo" src="./client/src/assets/final-gif.gif">
</div>
  
## Getting Started

- [ ] Step 1A: Ensure that you are connected to a Kubernetes cluster and that you have a valid kubeconfig file. Kubectl should be installed as well.
- [ ] Step 1B: To see available Kubernetes clusters, one can run `kubectl config get-contexts` from the command line. To change the active cluster, one can run `kubectl config use-context <name>`, where `<name>` represents the name of the cluster you want to monitor.
- [ ] Step 2: Clone this repository in order to access the manifests locally

```
git clone https://github.com/oslabs-beta/nemo.git
```

<!-- - [ ] Step 3: Install all the necessary dependencies in the server and client directories
```
npm install
```
- [ ] Step 4: Run npm start in server and client directories:
```
npm start
``` -->

- [ ] Step 3: Navigate to the nemo directory on your local machine & apply the YAML files found in the server/manifests directory of this repo by running the following commands in the "nemo" directory from the terminal :

```
kubectl apply -f ./server/manifests/nemo-service-account.yaml
kubectl apply -f ./server/manifests/nemo-role.yaml
kubectl apply -f ./server/manifests/nemo-role-binding.yaml
kubectl apply -f ./server/manifests/nemo-deployment.yaml

kubectl apply -f ./server/manifests/nemo-service-account-secret.yaml
kubectl apply -f ./server/manifests/nemo-service.yaml
kubectl apply -f ./server/manifests/nemo-rbac.yaml
```

- [ ] Step 4: Once all YAML files are applied to the cluster, run
      `kubectl get svc` to find the external IP address of `nemo-app`
- [ ] Step 5: Insert the external IP address into the search box of the nemo dashboard to view the usage metrics of your cluster.

## How To Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b NewFeature`)
3. Commit your Changes (`git commit -m 'Added a NewFeature'`)
4. Push to the Branch (`git push origin NewFeature`)
5. Open a Pull Request

Features yet to be added:

- Test compatability with clusters hosted on AKS and EKS
- Cost Analysis
- Implement end to end testing
- Implement React Testing Library
- Add historical data as graphs
- Create a notification that alerts the user when parts of their cluster is being overly taxed

## Meet the Team

| Name              | GitHub                                                                                                                                       | LinkedIn                                                                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ari Benkov        | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/abenkov2)         | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/ari-benkov-787b25139/) |
| Paul Burger       | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/pvburger)         | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/pvburger/)             |
| Anthony Chaiditya | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/AnthonyChaiditya) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/anthony-chaiditya/)    |
| Trevor Hilz       | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/Maelstrom116)     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/trevor-hilz/)          |
| Callum Miles      | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/callummiles)      | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/callum-miles/)         |

## License

Nemo is an open source product licensed under the MIT license, and is accelerated by [OSLabs](https://www.opensourcelabs.io/).
