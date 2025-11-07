# KeChat - Secure Messaging & Super-App Platform

<div align="center">
  <h3>🔒 Signal-grade E2E Encryption • 💰 M-Pesa Integration • 🚀 Mini-Apps Ecosystem</h3>
  <p><strong>A secure, locally-resident, modular super-app for Kenya</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Built%20with-Turborepo-EF4444?style=for-the-badge&logo=turborepo" alt="Turborepo" />
    <img src="https://img.shields.io/badge/Frontend-Next.js%20%2B%20React%20Native-000000?style=for-the-badge&logo=next.js" alt="Next.js + React Native" />
    <img src="https://img.shields.io/badge/Backend-Go%20%2B%20NestJS-00ADD8?style=for-the-badge&logo=go" alt="Go + NestJS" />
    <img src="https://img.shields.io/badge/Status-MVP%20Development-22c55e?style=for-the-badge" alt="Status: MVP Development" />
  </p>
</div>

---

## 🎯 Core Insight

Build a **secure, locally-resident, modular super-app** that launches as a **messaging-first platform** (Signal-grade E2E + WebRTC calls), quickly integrates **M-Pesa + Airtel connectors**, and opens an **extensible mini-app ecosystem** for commerce, e-gov, and SME services.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Clients (RN / Next.js)                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              API Gateway (Envoy + NGINX)                     │
└──────┬─────────────┬─────────────┬─────────────┬────────────┘
       │             │             │             │
┌──────▼──────┐ ┌───▼────┐ ┌──────▼──────┐ ┌───▼─────┐
│    Auth     │ │Messaging│ │  Payments   │ │  Calls  │
│  Service    │ │ Service │ │   Service   │ │ Service │
└──────┬──────┘ └───┬────┘ └──────┬──────┘ └───┬─────┘
       │            │              │             │
       └────────────┴──────┬───────┴─────────────┘
                           │
          ┌────────────────▼────────────────┐
          │    Event Bus (Kafka/Pulsar)     │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │   Storage Layer (PostgreSQL,    │
          │   Cassandra, Redis, S3/MinIO)   │
          └─────────────────────────────────┘
```

## 📦 Monorepo Structure

```
kechat/
├── apps/
│   ├── web/              # Next.js PWA (Web Client)
│   ├── mobile/           # React Native (iOS & Android)
│   └── admin/            # Admin Dashboard
├── services/
│   ├── auth/             # Authentication & Identity (NestJS)
│   ├── messaging/        # Real-time Messaging (Go)
│   ├── payments/         # Payments & Wallet (NestJS)
│   ├── calls/            # Voice/Video (Go + LiveKit)
│   ├── marketplace/      # SME Storefront (NestJS)
│   ├── integrations/     # Telco Adapters (M-Pesa, Airtel)
│   └── miniapps/         # Mini-apps Platform (Serverless)
├── packages/
│   ├── ui/               # Shared Design System
│   ├── sdk-ts/           # TypeScript SDK
│   ├── sdk-kotlin/       # Kotlin SDK
│   ├── sdk-swift/        # Swift SDK
│   ├── config/           # Shared Configuration
│   └── types/            # Shared TypeScript Types
├── infra/
│   ├── terraform/        # Infrastructure as Code
│   ├── kubernetes/       # K8s Manifests
│   └── docker/           # Docker Configurations
└── ci/
    └── .github/
        └── workflows/    # CI/CD Pipelines
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended) or npm
- **Docker** & **Docker Compose** (for local services)
- **Go** >= 1.21 (for backend services)

### Installation

```bash
# Clone the repository
git clone https://github.com/ngari-qds/ngarifred.git
cd ngarifred

# Install dependencies (using pnpm for optimal monorepo performance)
pnpm install

# Or using npm
npm install
```

### Development

```bash
# Run all services and apps in development mode
pnpm dev

# Run specific workspace
pnpm --filter @kechat/web dev
pnpm --filter @kechat/auth dev

# Build all packages
pnpm build

# Lint all code
pnpm lint

# Run tests
pnpm test
```

### Legacy Portfolio Site

The original Fred Mwaniki portfolio is preserved and can be run separately:

```bash
# Run legacy dev server
npm run legacy:dev

# Build legacy site
npm run legacy:build
```

## 🎨 Tech Stack

### Frontend
- **Web**: Next.js 14 + React + TypeScript + TailwindCSS
- **Mobile**: React Native (Expo) + TypeScript
- **UI**: Shared component library with shadcn/ui + Radix UI
- **3D/Effects**: Three.js + React Three Fiber

### Backend
- **Messaging & Media**: Go (Gin/Fiber) for low-latency services
- **Business Logic**: NestJS (TypeScript) for rapid development
- **Real-time**: WebSocket gateway, Redis Streams, Kafka/Pulsar
- **E2E Encryption**: Signal Protocol libraries

### Data Layer
- **Primary DB**: PostgreSQL (with logical replication)
- **Message Archive**: Cassandra (append-only)
- **Caching**: Redis
- **Object Storage**: MinIO / S3 (Kenya region)
- **Search**: OpenSearch

### Infrastructure
- **Orchestration**: Kubernetes (AKS/GKE in Nairobi)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Observability**: Prometheus, Grafana, Loki, Sentry
- **Security**: mTLS, WAF, HashiCorp Vault, HSM

## 🔐 Security & Privacy

- **End-to-End Encryption**: Signal protocol for all messages
- **Data Residency**: All data stored in Kenyan data centers
- **Compliance**: Kenya Data Protection Act 2019
- **Zero-Knowledge**: Server never accesses plaintext messages
- **Audit Logging**: Immutable audit trails for financial operations

## 📋 Key Features

### ✅ MVP Phase (Months 0-6)
- [x] Monorepo infrastructure setup
- [ ] Phone-based authentication + OTP
- [ ] 1:1 and group messaging (E2E encrypted)
- [ ] Voice & Video calls (WebRTC)
- [ ] M-Pesa integration (sandbox)
- [ ] P2P payments
- [ ] Basic marketplace
- [ ] eCitizen authentication integration

### 🔄 Phase 2 (Months 6-12)
- [ ] Mini-apps developer platform
- [ ] Advanced marketplace features
- [ ] Community channels & moderation
- [ ] Multi-telco support (Airtel, T-Kash)
- [ ] Analytics dashboard
- [ ] Advanced KYC flows

## 🌍 Localization

- **Languages**: English, Swahili, Kikuyu, Luo, Kalenjin
- **Currency**: KES (Kenyan Shilling)
- **Timezone**: EAT (East Africa Time)
- **Accessibility**: WCAG AA compliant

## 📊 Performance Targets

- **Message Delivery**: <150ms p99 in-region
- **Payment Processing**: <2s end-to-end
- **Availability**: 99.95% uptime
- **Call Quality**: <50ms p99 jitter

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Released under the [MIT License](LICENSE)

## 🔗 Links

- **Documentation**: [docs.kechat.ke](https://docs.kechat.ke) (Coming soon)
- **Developer Portal**: [developers.kechat.ke](https://developers.kechat.ke) (Coming soon)
- **Status Page**: [status.kechat.ke](https://status.kechat.ke) (Coming soon)

---

<div align="center">
  <p><em>"Connecting Kenya, one secure message at a time"</em></p>
  <p>Built with ❤️ in Nairobi</p>
</div>
