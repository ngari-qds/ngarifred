# KeChat Architecture Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Service Architecture](#service-architecture)
4. [Data Architecture](#data-architecture)
5. [Security Architecture](#security-architecture)
6. [Deployment Architecture](#deployment-architecture)
7. [Scalability & Performance](#scalability--performance)

---

## System Overview

KeChat is a **secure, locally-resident super-app** designed specifically for the Kenyan market, combining:
- **Messaging-first platform** with Signal-grade end-to-end encryption
- **Integrated mobile money** (M-Pesa, Airtel Money, T-Kash)
- **Mini-apps ecosystem** for commerce, e-government, and SME services
- **WebRTC-based** voice and video calling
- **Data residency** compliant with Kenya Data Protection Act 2019

### Core Design Principles
1. **Privacy by Default**: End-to-end encryption, minimal metadata
2. **Local-First**: Data stored in Kenyan data centers
3. **Mobile-First**: Optimized for Kenya's mobile-dominant internet usage
4. **Extensible**: Plugin architecture for mini-apps
5. **Resilient**: Offline-first sync, graceful degradation

---

## Technology Stack

### Frontend Layer

#### Web Application (`apps/web`)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.5+
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Real-time**: WebSocket client + React hooks
- **PWA**: Service Workers for offline support

#### Mobile Application (`apps/mobile`)
- **Framework**: React Native 0.73+ (Expo)
- **Language**: TypeScript 5.5+
- **Navigation**: React Navigation 6
- **State Management**: Zustand + React Query
- **E2E Crypto**: @signalapp/libsignal-client
- **Notifications**: Expo Push Notifications

#### Admin Dashboard (`apps/admin`)
- **Framework**: React + Vite
- **UI**: TailwindCSS + Recharts for analytics
- **Auth**: Auth0 / Keycloak integration

### Backend Services

#### Messaging Service (`services/messaging`)
- **Language**: Go 1.21+
- **Framework**: Fiber / Gin
- **Protocol**: WebSocket (gorilla/websocket)
- **Encryption**: Signal Protocol (Go implementation)
- **Queue**: Kafka consumer for async processing

**Responsibilities**:
- Real-time message delivery
- E2E encrypted message storage
- Message sync across devices
- Presence management
- Read receipts & delivery confirmations

#### Authentication Service (`services/auth`)
- **Language**: TypeScript (NestJS)
- **Database**: PostgreSQL (user accounts, devices)
- **Secret Management**: HashiCorp Vault
- **Features**:
  - Phone number + SMS OTP
  - eCitizen OIDC integration
  - Multi-factor authentication (TOTP)
  - Device management & revocation
  - QR code + passphrase recovery

#### Payments Service (`services/payments`)
- **Language**: TypeScript (NestJS)
- **Database**: PostgreSQL (double-entry ledger)
- **Queue**: Kafka for async settlement
- **Features**:
  - P2P transfers
  - Merchant payments
  - Wallet management
  - Transaction history
  - Idempotency keys for safety

#### Call Service (`services/calls`)
- **Language**: Go 1.21+
- **SFU**: LiveKit / Mediasoup
- **Signaling**: WebSocket
- **TURN/STUN**: Coturn
- **Features**:
  - 1:1 voice/video calls
  - Group calls (up to 8 participants)
  - Screen sharing
  - Recording (opt-in)

#### Integration Service (`services/integrations`)
- **Language**: TypeScript (NestJS)
- **M-Pesa**: Daraja API v2
- **Airtel Money**: REST API
- **eCitizen**: OIDC + REST
- **Features**:
  - Telco adapter abstraction
  - Webhook verification
  - Reconciliation jobs
  - Rate limiting & retry logic

#### Marketplace Service (`services/marketplace`)
- **Language**: TypeScript (NestJS)
- **Database**: PostgreSQL
- **Search**: OpenSearch
- **Features**:
  - Product catalog
  - Order management
  - Merchant onboarding
  - Payout scheduling

#### Mini-apps Platform (`services/miniapps`)
- **Runtime**: Knative / Cloud Run
- **Language**: Multi-language support (Node.js, Python, Go)
- **Sandbox**: gVisor for isolation
- **API**: GraphQL/REST gateway with scoped permissions

---

## Service Architecture

### Communication Patterns

#### Synchronous (REST/gRPC)
- **Client ↔ Gateway**: REST + GraphQL
- **Service ↔ Service**: gRPC (internal)

#### Asynchronous (Event-Driven)
- **Message Bus**: Apache Kafka
- **Event Store**: PostgreSQL (Outbox pattern)
- **Topics**:
  - `user.events` - Authentication, profile changes
  - `message.events` - Message sent, delivered, read
  - `payment.events` - Transaction lifecycle
  - `call.events` - Call started, ended

### API Gateway

```
┌─────────────────────────────────────┐
│         API Gateway (Envoy)         │
├─────────────────────────────────────┤
│  - TLS Termination                  │
│  - Rate Limiting                    │
│  - JWT Validation                   │
│  - Request Routing                  │
│  - Circuit Breaking                 │
│  - Observability (Tracing, Metrics) │
└─────────────────────────────────────┘
         │         │         │
    ┌────┴────┐    │    ┌────┴─────┐
    │  Auth   │    │    │ Payments │
    │ Service │    │    │  Service │
    └─────────┘    │    └──────────┘
              ┌────▼────┐
              │Messaging│
              │ Service │
              └─────────┘
```

---

## Data Architecture

### Databases

#### PostgreSQL (Primary Relational Store)
- **Users & Authentication**: User profiles, devices, sessions
- **Payments Ledger**: Double-entry accounting
- **Marketplace**: Products, orders, merchants
- **Version**: PostgreSQL 15+
- **High Availability**: Streaming replication (primary + standby)

**Schema Design**:
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  ecitizen_id VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments ledger (double-entry)
CREATE TABLE ledger_entries (
  id BIGSERIAL PRIMARY KEY,
  transaction_id UUID NOT NULL,
  account_id UUID NOT NULL,
  amount BIGINT NOT NULL, -- in cents
  balance_after BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Cassandra (Message Archive)
- **Use Case**: Long-term storage of encrypted messages
- **Partition Key**: `user_id`
- **Clustering Key**: `timestamp DESC`
- **Retention**: Configurable (default: 2 years)
- **Replication**: RF=3 in Nairobi DC

#### Redis (Caching & Ephemeral State)
- **Use Cases**:
  - Session caching
  - Presence information
  - Rate limiting counters
  - Message delivery queues
- **Configuration**: Redis Cluster (6 nodes)

#### MinIO / S3 (Object Storage)
- **Use Cases**:
  - Media files (images, videos, documents)
  - Voice message recordings
  - User avatars
- **Region**: Kenya (Nairobi)
- **Encryption**: AES-256 at rest

### Data Flow Examples

#### Message Delivery Flow
```
1. Client → Gateway → Messaging Service
2. Messaging Service encrypts metadata, stores in Cassandra
3. Publishes to Kafka: message.sent
4. WebSocket gateway delivers to recipient (if online)
5. If offline, queues in Redis for later delivery
6. On delivery, publishes: message.delivered
```

#### Payment Flow
```
1. Client → Gateway → Payments Service
2. Idempotency check (prevent duplicates)
3. KYC validation (if needed)
4. Lock funds in ledger (BEGIN TRANSACTION)
5. Call Integration Service → M-Pesa API
6. Await webhook confirmation
7. Settle transaction (COMMIT)
8. Publish payment.completed event
```

---

## Security Architecture

### End-to-End Encryption (Signal Protocol)

**Key Components**:
1. **Identity Keys**: Long-term EdDSA keypair
2. **Signed Pre-Keys**: Medium-term rotation
3. **One-Time Pre-Keys**: Single-use ephemeral keys
4. **Ratcheting**: Forward secrecy via Double Ratchet

**Key Exchange**:
- Client generates keys locally
- Public keys uploaded to key server
- Private keys never leave device
- Server facilitates key distribution but cannot decrypt

### Authentication & Authorization

**Phone Number Auth**:
```
User → [Enter Phone] → [Send OTP via SMS] → [Verify OTP]
     → [Generate Device Keys] → [Register Device] → [Issue JWT]
```

**JWT Structure**:
```json
{
  "sub": "user_id",
  "device_id": "device_uuid",
  "scope": ["messaging", "payments"],
  "exp": 1234567890
}
```

**Refresh Token Rotation**: Short-lived access tokens (15min), long-lived refresh tokens (30 days) with rotation.

### Network Security

- **mTLS**: All service-to-service communication
- **WAF**: ModSecurity ruleset for edge protection
- **DDoS Mitigation**: Cloudflare / local scrubbing
- **Rate Limiting**: Per-user, per-IP, per-endpoint

### Secrets Management

- **HashiCorp Vault**: Dynamic secrets for DB credentials
- **HSM**: Hardware Security Module for payment signing
- **KMS**: Cloud KMS for data-at-rest encryption keys

---

## Deployment Architecture

### Kubernetes Cluster (Nairobi Region)

```
┌──────────────────────────────────────────────┐
│            Load Balancer (L7)                │
└────────────────┬─────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────┐
│         Ingress Controller (NGINX)           │
└────────┬─────────────────┬───────────────────┘
         │                 │
    ┌────▼─────┐      ┌────▼─────┐
    │ Web Pods │      │ API Pods │
    └──────────┘      └─────┬────┘
                            │
                ┌───────────┼──────────┐
                │           │          │
          ┌─────▼──┐   ┌────▼──┐  ┌───▼────┐
          │  Auth  │   │  Msg  │  │Payment │
          │  Pods  │   │ Pods  │  │  Pods  │
          └────────┘   └───────┘  └────────┘
```

**Node Pools**:
- **Web**: 3 nodes (n2-standard-4)
- **Services**: 5 nodes (n2-standard-8)
- **Stateful**: 3 nodes (n2-highmem-4) with local SSDs

### CI/CD Pipeline

```
[GitHub Push] → [GitHub Actions]
       │
       ├─ Lint & Type Check
       ├─ Unit Tests
       ├─ Build Docker Images
       ├─ Security Scan (Trivy)
       ├─ Push to Registry (GHCR)
       └─ Deploy to K8s
           ├─ Staging (auto)
           └─ Production (manual approval)
```

### Monitoring Stack

- **Metrics**: Prometheus → Grafana
- **Logs**: Loki → Grafana
- **Traces**: Jaeger (OpenTelemetry)
- **Errors**: Sentry
- **Uptime**: Pingdom / UptimeRobot

---

## Scalability & Performance

### Horizontal Scaling

| Service     | Min Pods | Max Pods | Scale Metric          |
|-------------|----------|----------|-----------------------|
| Auth        | 3        | 10       | CPU > 70%             |
| Messaging   | 5        | 20       | Queue length > 1000   |
| Payments    | 3        | 15       | Request rate          |
| Calls (SFU) | 2        | 10       | Active sessions       |

### Caching Strategy

- **CDN**: Static assets (images, JS, CSS)
- **Redis**: User sessions, presence
- **Application**: In-memory LRU for hot data

### Database Optimization

- **Read Replicas**: PostgreSQL read-only replicas for analytics
- **Connection Pooling**: PgBouncer (transaction mode)
- **Partitioning**: Time-based partitions for ledger table

### Performance Targets

| Metric                  | Target    |
|-------------------------|-----------|
| Message delivery (p99)  | < 150ms   |
| Payment processing      | < 2s      |
| Call setup time         | < 3s      |
| API response (p95)      | < 200ms   |
| Availability            | 99.95%    |

---

## Disaster Recovery

### Backup Strategy

- **Database**: Daily full + hourly incremental
- **Object Storage**: Cross-zone replication
- **Retention**: 30 days (hot), 1 year (cold)

### RTO/RPO Targets

- **RTO** (Recovery Time Objective): 4 hours
- **RPO** (Recovery Point Objective): 15 minutes

### Incident Response

1. **Detection**: Automated alerting
2. **Triage**: On-call engineer paged
3. **Mitigation**: Runbook execution
4. **Resolution**: Root cause analysis
5. **Post-Mortem**: Blameless retrospective

---

## Future Enhancements

- **Multi-region deployment** for East Africa
- **Edge computing** for mini-apps
- **AI-powered moderation** improvements
- **Blockchain integration** for payment settlements
- **Satellite connectivity** for rural areas

---

*Last Updated: 2025-11-07*
