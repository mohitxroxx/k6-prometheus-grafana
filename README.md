# Node.js Server with Prometheus, Grafana, and k6 Load Testing

This repository provides a simple Node.js server that integrates Prometheus for monitoring, Grafana for visualization, and k6 for load testing. This setup allows you to track the performance and resource usage of your Node.js application under load.

## Overview

- **Node.js/Express Server**: A simple server built using Node.js to handle HTTP requests.
- **Prometheus**: A monitoring tool that collects metrics from the Node.js server.
- **Grafana**: A data visualization platform to display the metrics collected by Prometheus.
- **k6**: A load testing tool to simulate user traffic on the Node.js server.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js**
- **Docker** (for running Prometheus and Grafana containers)
- **k6** (for load testing)
