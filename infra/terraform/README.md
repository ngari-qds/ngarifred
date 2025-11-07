# KeChat Infrastructure - Terraform Configuration

This directory contains Terraform modules for provisioning KeChat infrastructure.

## Structure

```
terraform/
├── modules/
│   ├── kubernetes/      # K8s cluster
│   ├── database/        # PostgreSQL, Cassandra
│   ├── cache/           # Redis
│   ├── messaging/       # Kafka
│   ├── storage/         # Object storage (S3/MinIO)
│   ├── monitoring/      # Prometheus, Grafana
│   └── networking/      # VPC, subnets, load balancers
├── environments/
│   ├── dev/            # Development environment
│   ├── staging/        # Staging environment
│   └── production/     # Production environment
└── README.md
```

## Prerequisites

- Terraform >= 1.5.0
- Cloud provider CLI (AWS CLI / gcloud / az)
- kubectl
- helm

## Usage

### Development Environment

```bash
cd environments/dev
terraform init
terraform plan
terraform apply
```

### Staging Environment

```bash
cd environments/staging
terraform init
terraform plan
terraform apply
```

### Production Environment

```bash
cd environments/production
terraform init
terraform plan
terraform apply
```

## Variables

Key variables for each environment:

- `region` - Cloud provider region (e.g., "af-south-1" for AWS Kenya)
- `environment` - Environment name (dev, staging, production)
- `cluster_name` - Kubernetes cluster name
- `node_count` - Number of K8s nodes
- `database_instance_type` - Database instance size
- `enable_backup` - Enable automated backups (true for production)

## Modules

### Kubernetes Module

Provisions a managed Kubernetes cluster (AKS/GKE/EKS) in the Kenya region.

**Inputs**:
- `cluster_name` - Name of the cluster
- `node_count` - Number of worker nodes
- `node_instance_type` - Instance type for nodes

**Outputs**:
- `cluster_endpoint` - K8s API server endpoint
- `kubeconfig` - kubeconfig file content

### Database Module

Provisions PostgreSQL and Cassandra clusters with encryption at rest.

**Inputs**:
- `instance_type` - Database instance size
- `storage_size` - Storage in GB
- `backup_retention` - Backup retention in days

**Outputs**:
- `postgres_endpoint` - PostgreSQL connection string
- `cassandra_endpoints` - Cassandra node endpoints

### Cache Module

Provisions Redis cluster for caching and session management.

**Inputs**:
- `node_count` - Number of Redis nodes
- `instance_type` - Instance type

**Outputs**:
- `redis_endpoint` - Redis connection endpoint

## Security

- All resources deployed in private subnets
- Encryption at rest enabled for all data stores
- TLS 1.3 enforced for all connections
- Secrets managed via HashiCorp Vault
- Network policies restrict inter-service communication

## Data Residency

All infrastructure must be deployed in **Kenya** to comply with data residency requirements:

- **AWS**: Africa (Cape Town) - af-south-1 region + Kenya local zones (when available)
- **GCP**: africa-south1 (Johannesburg) + Kenya interconnect
- **Azure**: South Africa North (Johannesburg) + Kenya edge zones

## Cost Estimation

### Development (~$500/month)
- K8s cluster: 3 nodes (small)
- PostgreSQL: Single instance
- Redis: Single node
- Storage: 100 GB

### Production (~$3,000/month)
- K8s cluster: 10 nodes (medium)
- PostgreSQL: Multi-AZ, read replicas
- Cassandra: 3-node cluster
- Redis: Cluster mode (3 nodes)
- Storage: 1 TB
- Backups: 30-day retention

## Disaster Recovery

Production infrastructure includes:
- Multi-zone deployment
- Automated daily backups
- Cross-region replication (within Kenya zones)
- RTO: 4 hours
- RPO: 15 minutes

## Monitoring

Terraform provisions monitoring stack:
- Prometheus for metrics
- Grafana for dashboards
- Loki for logs
- Alertmanager for alerts

## Support

For infrastructure questions: devops@kechat.ke
