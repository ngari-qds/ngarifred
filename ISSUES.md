# KeChat MVP Deliverables - GitHub Issues

This document contains detailed specifications for all MVP deliverables. Each section should be created as a GitHub issue using the MVP Deliverable template.

---

## Issue 1: Monorepo Skeleton

**Title**: [MVP] Monorepo Skeleton - Turborepo + pnpm Workspace Setup

**Labels**: `mvp`, `infra`, `backend`, `frontend`

**Description**:
Set up the foundational monorepo structure for KeChat using Turborepo and pnpm workspaces. This includes directory structure, build configuration, and development tooling.

**Acceptance Criteria**:
- [x] Create `apps/`, `services/`, `packages/`, `infra/`, `ci/` directories
- [x] Configure Turborepo with `turbo.json`
- [x] Configure pnpm workspaces with `pnpm-workspace.yaml`
- [x] Add root `package.json` with workspace scripts
- [x] Create `.gitignore` for monorepo patterns
- [x] Add comprehensive README with run instructions
- [ ] All workspaces build successfully with `pnpm build`
- [ ] All workspaces lint successfully with `pnpm lint`

**Technical Details**:
- **Monorepo Tool**: Turborepo 1.11+
- **Package Manager**: pnpm 8.15+
- **Structure**: Apps (3), Services (7), Packages (6+)

**Story Points**: 3

**Milestone**: Month 0-1 (Infrastructure)

---

## Issue 2: Auth & Identity Service

**Title**: [MVP] Auth & Identity Service - Phone OTP + eCitizen OIDC

**Labels**: `mvp`, `backend`, `security`

**Description**:
Create the authentication and identity service handling phone-based authentication, eCitizen integration, multi-factor authentication, device management, and key recovery.

**Acceptance Criteria**:
- [ ] Phone number registration with SMS OTP (pluggable provider)
- [ ] OTP verification returns JWT + refresh token with rotation
- [ ] eCitizen OIDC integration (mock sandbox for development)
- [ ] Device registration and management (list, revoke)
- [ ] Multi-factor authentication (TOTP support)
- [ ] QR code + passphrase recovery mechanism
- [ ] HashiCorp Vault integration for secrets
- [ ] Rate limiting on auth endpoints
- [ ] Unit tests covering 80%+ of logic
- [ ] API documentation (OpenAPI/Swagger)

**API Endpoints**:
- `POST /auth/otp/request` - Request OTP
- `POST /auth/otp/verify` - Verify OTP and get tokens
- `POST /auth/refresh` - Refresh access token
- `GET /auth/oidc/authorize` - Start eCitizen OIDC flow
- `GET /auth/oidc/callback` - Handle OIDC callback
- `POST /auth/device/register` - Register new device
- `GET /auth/devices` - List user devices
- `DELETE /auth/device/:id` - Revoke device
- `POST /auth/mfa/setup` - Setup TOTP MFA
- `POST /auth/mfa/verify` - Verify MFA code
- `POST /auth/recovery/generate` - Generate recovery QR
- `POST /auth/recovery/restore` - Restore account with recovery

**Technical Details**:
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL (users, devices, sessions)
- **Dependencies**: @nestjs/jwt, @nestjs/passport, bcrypt, otplib
- **SMS Provider**: Africa's Talking / Twilio (configurable)
- **Secret Storage**: HashiCorp Vault

**Story Points**: 8

**Milestone**: Month 0-1 (Infrastructure)

**Dependencies**: Depends on Issue #1 (Monorepo Skeleton)

---

## Issue 3: Messaging Core - Real-time E2E Encrypted Messaging

**Title**: [MVP] Messaging Core - Signal Protocol + WebSocket Delivery

**Labels**: `mvp`, `backend`, `security`

**Description**:
Build the core messaging service with end-to-end encryption using Signal protocol, real-time WebSocket delivery, message sync, and delivery receipts.

**Acceptance Criteria**:
- [ ] Signal protocol implementation (key exchange, ratcheting)
- [ ] 1:1 messaging with E2E encryption
- [ ] Group messaging with Sender Key protocol
- [ ] WebSocket server for real-time delivery
- [ ] Message storage (encrypted blobs in Cassandra)
- [ ] Offline message queueing (Redis)
- [ ] Delivery receipts and read receipts
- [ ] Message sync across multiple devices
- [ ] Presence management (online/offline status)
- [ ] Media attachment support (encrypted)
- [ ] Message acking and retry logic
- [ ] Load test: 10k concurrent connections

**API Endpoints**:
- WebSocket `/ws/messages` - Real-time message stream
- `POST /messages/send` - Send message (fallback REST)
- `GET /messages/history` - Get message history
- `POST /messages/keys/upload` - Upload pre-keys
- `GET /messages/keys/:userId` - Fetch user's public keys
- `POST /messages/receipt` - Send delivery/read receipt

**Technical Details**:
- **Language**: Go 1.21+
- **Framework**: Fiber / Gin
- **WebSocket**: gorilla/websocket
- **Encryption**: Signal protocol (libsignal-protocol-go)
- **Storage**: Cassandra (messages), Redis (queues, presence)
- **Message Bus**: Kafka for event streaming

**Story Points**: 13

**Milestone**: Month 2-3 (Messaging & Auth)

**Dependencies**: Depends on Issue #2 (Auth Service for JWT validation)

---

## Issue 4: Voice/Video Call Service - WebRTC + SFU

**Title**: [MVP] Voice/Video Call Service - LiveKit SFU Integration

**Labels**: `mvp`, `backend`, `infra`

**Description**:
Implement voice and video calling using WebRTC with a Selective Forwarding Unit (SFU) for scalable media routing.

**Acceptance Criteria**:
- [ ] LiveKit SFU deployment (Docker/K8s)
- [ ] WebRTC signaling service (Go)
- [ ] 1:1 voice calls
- [ ] 1:1 video calls
- [ ] Group calls (up to 8 participants)
- [ ] TURN/STUN server configuration (Coturn)
- [ ] NAT traversal handling
- [ ] Reconnection logic for unstable networks
- [ ] Call recording opt-in feature
- [ ] Call quality metrics (jitter, packet loss)
- [ ] Integration with messaging service (call invites)

**API Endpoints**:
- WebSocket `/ws/calls` - Signaling channel
- `POST /calls/initiate` - Start a call
- `POST /calls/join` - Join existing call
- `POST /calls/leave` - Leave call
- `GET /calls/:id/participants` - List participants
- `POST /calls/:id/record` - Start recording (opt-in)

**Technical Details**:
- **Language**: Go 1.21+
- **SFU**: LiveKit or Mediasoup
- **TURN/STUN**: Coturn
- **Signaling**: WebSocket
- **Media**: VP8/VP9 video, Opus audio

**Story Points**: 13

**Milestone**: Month 4-5 (Calls & Community)

**Dependencies**: Depends on Issue #2 (Auth), Issue #3 (Messaging for call notifications)

---

## Issue 5: Mobile Money Adapters - M-Pesa, Airtel Money, T-Kash

**Title**: [MVP] Mobile Money Adapters - Telco Payment Integration

**Labels**: `mvp`, `integration`, `backend`

**Description**:
Create adapter layer for Kenyan mobile money providers (M-Pesa Daraja, Airtel Money, T-Kash) with webhook handling and reconciliation.

**Acceptance Criteria**:
- [ ] M-Pesa Daraja API v2 integration (sandbox)
- [ ] Airtel Money API integration (sandbox)
- [ ] T-Kash API integration (sandbox)
- [ ] Abstract adapter interface for all providers
- [ ] Webhook endpoint with signature verification
- [ ] Retry logic with exponential backoff
- [ ] Transaction reconciliation job (daily)
- [ ] Webhook replay mechanism for failures
- [ ] Rate limiting per provider
- [ ] Comprehensive error handling
- [ ] Sandbox payment flow tests

**API Endpoints**:
- `POST /integrations/mpesa/stk-push` - Initiate M-Pesa payment
- `POST /integrations/mpesa/webhook` - M-Pesa callback
- `POST /integrations/airtel/payment` - Initiate Airtel payment
- `POST /integrations/airtel/webhook` - Airtel callback
- `GET /integrations/transaction/:id/status` - Check status
- `POST /integrations/reconcile` - Trigger reconciliation

**Technical Details**:
- **Framework**: NestJS + TypeScript
- **APIs**: M-Pesa Daraja v2, Airtel Money REST, T-Kash
- **Webhook Security**: HMAC signature verification
- **Storage**: PostgreSQL (transactions, reconciliation logs)
- **Queue**: Kafka for async processing

**Story Points**: 10

**Milestone**: Month 3-4 (Payments)

**Dependencies**: Depends on Issue #1 (Monorepo)

---

## Issue 6: Payments & Wallet Service - P2P + Merchant Payments

**Title**: [MVP] Payments & Wallet Service - Double-Entry Ledger

**Labels**: `mvp`, `backend`, `security`

**Description**:
Build payments and wallet service with P2P transfers, merchant payments, double-entry accounting ledger, and idempotency.

**Acceptance Criteria**:
- [ ] Wallet creation and management
- [ ] P2P transfer API with atomic operations
- [ ] Merchant payment processing
- [ ] Double-entry ledger implementation
- [ ] Idempotency key support (prevent duplicates)
- [ ] KYC tier-based limits enforcement
- [ ] Transaction fee calculator
- [ ] Transaction history with pagination
- [ ] Balance reconciliation checks
- [ ] Fraud detection hooks
- [ ] Settlement reporting

**API Endpoints**:
- `POST /wallet/create` - Create wallet
- `GET /wallet/balance` - Get balance
- `POST /wallet/transfer` - P2P transfer
- `POST /wallet/pay` - Merchant payment
- `GET /wallet/transactions` - Transaction history
- `POST /wallet/withdraw` - Withdraw to mobile money
- `POST /wallet/deposit` - Deposit from mobile money

**Technical Details**:
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL (ledger with ACID transactions)
- **Ledger Schema**: Double-entry accounting
- **Idempotency**: Redis-backed idempotency keys (24h TTL)
- **KYC Tiers**: Tier 1 (50k), Tier 2 (250k), Tier 3 (unlimited)

**Ledger Schema**:
```sql
CREATE TABLE ledger_entries (
  id BIGSERIAL PRIMARY KEY,
  transaction_id UUID NOT NULL,
  account_id UUID NOT NULL,
  amount BIGINT NOT NULL, -- in cents
  balance_after BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Story Points**: 10

**Milestone**: Month 3-4 (Payments)

**Dependencies**: Depends on Issue #5 (Mobile Money Adapters)

---

## Issue 7: Marketplace & SME Storefront

**Title**: [MVP] Marketplace & SME Storefront - Product Catalog + Orders

**Labels**: `mvp`, `backend`, `frontend`

**Description**:
Create marketplace service for SME storefronts with product catalog, order management, and merchant payouts.

**Acceptance Criteria**:
- [ ] Merchant onboarding and KYC
- [ ] Product catalog CRUD operations
- [ ] Product search with OpenSearch
- [ ] Shopping cart and checkout flow
- [ ] Order lifecycle management
- [ ] Merchant payout scheduling
- [ ] Commission calculation
- [ ] Product media uploads
- [ ] Inventory tracking
- [ ] Order status notifications

**API Endpoints**:
- `POST /merchants/register` - Register merchant
- `POST /products` - Create product
- `GET /products` - List products (with search)
- `GET /products/:id` - Get product details
- `POST /cart/add` - Add to cart
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `POST /orders/:id/fulfill` - Mark order fulfilled
- `GET /merchants/:id/payouts` - View payouts

**Technical Details**:
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL (merchants, products, orders)
- **Search**: OpenSearch for product catalog
- **Storage**: MinIO/S3 for product images
- **Queue**: Kafka for order events

**Story Points**: 10

**Milestone**: Month 3-4 (Payments)

**Dependencies**: Depends on Issue #6 (Payments for checkout)

---

## Issue 8: E-Government Integration - eCitizen

**Title**: [MVP] E-Government Integration - eCitizen Auth + Document Fetch

**Labels**: `mvp`, `integration`, `legal`

**Description**:
Integrate with Kenya's eCitizen platform for identity verification and e-government services.

**Acceptance Criteria**:
- [ ] eCitizen OIDC authentication flow
- [ ] Sandbox environment setup
- [ ] Identity verification (fetch user data)
- [ ] Verified badge issuance
- [ ] Document fetch API (pilot: tax forms, licenses)
- [ ] Data privacy compliance (minimal data retention)
- [ ] User consent management
- [ ] API documentation

**API Endpoints**:
- `GET /ecitizen/auth/authorize` - Start auth flow
- `GET /ecitizen/auth/callback` - Handle callback
- `GET /ecitizen/profile` - Fetch user profile
- `POST /ecitizen/verify` - Verify identity
- `GET /ecitizen/documents` - List available documents

**Technical Details**:
- **Integration**: OIDC + REST API
- **Sandbox**: Mock eCitizen server for development
- **Compliance**: DPIA (Data Protection Impact Assessment)
- **Data Retention**: Minimal (ID, verification status only)

**Story Points**: 8

**Milestone**: Month 5-6 (Integration & Launch)

**Dependencies**: Depends on Issue #2 (Auth Service)

---

## Issue 9: Community Layer - Channels + Moderation

**Title**: [MVP] Community Layer - Channels, Roles, and Moderation

**Labels**: `mvp`, `backend`, `frontend`, `ml`

**Description**:
Build community features with localized channels, moderator roles, and AI-assisted content moderation.

**Acceptance Criteria**:
- [ ] Channel creation and management
- [ ] Channel membership (public, private, invite-only)
- [ ] Moderator role assignment
- [ ] Content moderation queue
- [ ] AI-assisted moderation (toxicity detection)
- [ ] Verified leader badge workflow
- [ ] Channel search and discovery
- [ ] Channel analytics for moderators

**API Endpoints**:
- `POST /channels` - Create channel
- `GET /channels` - List/search channels
- `POST /channels/:id/join` - Join channel
- `POST /channels/:id/moderate` - Submit moderation action
- `GET /channels/:id/members` - List members
- `POST /channels/:id/badge` - Request verified badge

**Technical Details**:
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL (channels, members, roles)
- **ML Moderation**: Perspective API or local model
- **Queue**: Kafka for moderation events

**Story Points**: 8

**Milestone**: Month 4-5 (Calls & Community)

**Dependencies**: Depends on Issue #3 (Messaging)

---

## Issue 10: Mini-apps / Developer Platform

**Title**: [MVP v2] Mini-apps Developer Platform - Serverless Sandbox

**Labels**: `mvp`, `api`, `security`, `backend`

**Description**:
Create a mini-apps platform where third-party developers can build and deploy sandboxed applications.

**Acceptance Criteria**:
- [ ] Developer registration and API key management
- [ ] Serverless runtime (Knative/Cloud Run)
- [ ] Sandbox environment (gVisor isolation)
- [ ] API gateway with scoped permissions
- [ ] Billing and metering system
- [ ] SDK for TypeScript, Python, Go
- [ ] Deploy "hello world" mini-app
- [ ] Mini-app discovery marketplace

**API Endpoints**:
- `POST /miniapps/register` - Register mini-app
- `POST /miniapps/deploy` - Deploy mini-app
- `GET /miniapps` - List mini-apps
- `POST /miniapps/invoke` - Invoke mini-app function
- `GET /miniapps/:id/logs` - View logs
- `GET /miniapps/billing` - View usage and billing

**Technical Details**:
- **Runtime**: Knative on Kubernetes
- **Isolation**: gVisor for security
- **Languages**: Node.js, Python, Go
- **Gateway**: GraphQL + REST with OAuth scopes

**Story Points**: 13

**Milestone**: Post-MVP

**Dependencies**: Depends on Issue #2 (Auth)

---

## Issue 11: Privacy, Compliance & Data Residency

**Title**: [MVP] Privacy, Compliance & Data Residency - Kenya DPA 2019

**Labels**: `mvp`, `legal`, `infra-prod`, `security`

**Description**:
Implement data residency, compliance with Kenya Data Protection Act 2019, and privacy controls.

**Acceptance Criteria**:
- [ ] All infrastructure deployed in Kenyan region
- [ ] Database encryption at rest (AES-256)
- [ ] Database encryption in transit (TLS 1.3)
- [ ] Data Protection Act 2019 compliance mapping
- [ ] DPIA (Data Protection Impact Assessment) document
- [ ] Consent management system
- [ ] Data export API (user right to data portability)
- [ ] Data deletion API (right to be forgotten)
- [ ] Audit logging for data access
- [ ] Privacy policy and terms of service

**Technical Details**:
- **Region**: Nairobi AWS/GCP/Azure
- **Encryption**: KMS-managed keys
- **Compliance**: Kenya DPA 2019, GDPR-equivalent
- **Audit**: Immutable audit logs (PostgreSQL)

**Story Points**: 8

**Milestone**: Month 0-1 (Infrastructure)

**Dependencies**: None (foundational)

---

## Issue 12: Ops - Monitoring, Observability & Security

**Title**: [MVP] Observability & Security - Prometheus, Grafana, SIEM

**Labels**: `mvp`, `infra-prod`, `security`

**Description**:
Set up comprehensive monitoring, observability, and security infrastructure.

**Acceptance Criteria**:
- [ ] Prometheus for metrics collection
- [ ] Grafana dashboards (message throughput, payment latency, errors)
- [ ] Loki for log aggregation
- [ ] Jaeger for distributed tracing
- [ ] Sentry for error tracking
- [ ] SIEM integration (Security Information and Event Management)
- [ ] WAF (Web Application Firewall) deployment
- [ ] DDoS mitigation plan
- [ ] Alerting rules (PagerDuty/Opsgenie)
- [ ] Runbook for common incidents

**Dashboards**:
- System health (CPU, memory, disk)
- Message delivery metrics (p50, p95, p99)
- Payment processing metrics
- Error rates by service
- Call quality metrics

**Technical Details**:
- **Metrics**: Prometheus + Grafana
- **Logs**: Loki
- **Traces**: Jaeger (OpenTelemetry)
- **Errors**: Sentry
- **WAF**: ModSecurity or Cloudflare

**Story Points**: 8

**Milestone**: Month 0-1 (Infrastructure)

**Dependencies**: Depends on Issue #1 (Monorepo)

---

## Issue 13: UX / Design System

**Title**: [MVP] Design System - React Component Library + Kenyan Identity

**Labels**: `mvp`, `design`, `frontend`

**Description**:
Create a comprehensive design system with React components, Tailwind tokens, and mobile UI kit reflecting modern Kenyan identity.

**Acceptance Criteria**:
- [ ] Design tokens (colors, typography, spacing)
- [ ] 10+ core components (Button, Nav, ChatBubble, Modal, List, Card, Avatar, Badge, Form, Header)
- [ ] Component documentation (Storybook)
- [ ] Accessibility (WCAG AA compliant)
- [ ] Dark mode support
- [ ] Localization support (English, Swahili)
- [ ] Mobile-first responsive design
- [ ] Pan-African color palette

**Components**:
1. Button (primary, secondary, danger)
2. Navigation (top nav, bottom nav, sidebar)
3. ChatBubble (sent, received, system)
4. Modal (confirmation, alert, form)
5. List (message list, transaction list)
6. Card (product card, profile card)
7. Avatar (user, group)
8. Badge (verified, moderator, status)
9. Form (input, textarea, select, checkbox)
10. Header (app header with logo, search)

**Technical Details**:
- **Framework**: React + TypeScript
- **Styling**: TailwindCSS + CSS variables
- **Components**: Radix UI primitives
- **Documentation**: Storybook
- **Package**: @kechat/ui

**Story Points**: 8

**Milestone**: Month 0-1 (Infrastructure)

**Dependencies**: None (can start immediately)

---

## Issue 14: Testing & Security Audits

**Title**: [MVP] Testing & Security - Unit, Integration, E2E, Pentest

**Labels**: `mvp`, `security`, `backend`, `infra`

**Description**:
Establish comprehensive testing strategy and security audit processes.

**Acceptance Criteria**:
- [ ] Unit tests (80% coverage minimum)
- [ ] Integration tests for all services
- [ ] E2E tests for critical user flows
- [ ] Load testing (k6) - 100k concurrent connections test plan
- [ ] Security fuzzing of payment endpoints
- [ ] Third-party penetration test
- [ ] CI gates for test coverage
- [ ] Automated security scanning (Snyk, Trivy)

**Test Scenarios**:
- User registration and login
- Send and receive messages
- P2P payment flow
- Merchant checkout
- Voice/video call setup

**Technical Details**:
- **Unit**: Jest (TS), Go testing package
- **Integration**: Supertest, Testcontainers
- **E2E**: Playwright (web), Detox (mobile)
- **Load**: k6, Artillery
- **Security**: OWASP ZAP, Burp Suite

**Story Points**: 10

**Milestone**: Month 5-6 (Integration & Launch)

**Dependencies**: All services (runs across entire stack)

---

## Issue 15: Deployment & Runbook

**Title**: [MVP] Deployment & Runbook - Terraform + GitHub Actions

**Labels**: `mvp`, `infra-prod`

**Description**:
Create deployment infrastructure with Terraform, GitHub Actions CI/CD, and incident runbooks.

**Acceptance Criteria**:
- [ ] Terraform modules for all infrastructure
- [ ] Kubernetes manifests (Helm charts)
- [ ] GitHub Actions workflows (lint, test, build, deploy)
- [ ] Blue/green deployment strategy
- [ ] Canary deployment support
- [ ] Rollback procedures
- [ ] Incident runbook (common scenarios)
- [ ] Disaster recovery plan

**Infrastructure Components**:
- Kubernetes cluster (AKS/GKE/EKS)
- PostgreSQL (managed)
- Cassandra cluster
- Redis cluster
- Kafka cluster
- Object storage (S3/MinIO)
- Load balancers

**CI/CD Pipeline**:
```
[Push] → [Lint] → [Test] → [Build] → [Scan] → [Deploy to Staging] → [Manual Approval] → [Deploy to Prod]
```

**Technical Details**:
- **IaC**: Terraform 1.5+
- **CI/CD**: GitHub Actions
- **Container Registry**: GHCR / ECR
- **Deployment**: Helm 3, ArgoCD
- **Regions**: Nairobi (primary), Mombasa (DR)

**Story Points**: 10

**Milestone**: Month 5-6 (Integration & Launch)

**Dependencies**: Depends on all services

---

## Summary

**Total Issues**: 15  
**Total Story Points**: 138  
**Timeline**: 6 months (MVP)

**Priorities**:
1. **Month 0-1**: Issues #1, #11, #12, #13 (Infrastructure)
2. **Month 2-3**: Issues #2, #3 (Auth + Messaging)
3. **Month 3-4**: Issues #5, #6, #7 (Payments + Marketplace)
4. **Month 4-5**: Issues #4, #9 (Calls + Community)
5. **Month 5-6**: Issues #8, #14, #15 (Integration, Testing, Deployment)
6. **Post-MVP**: Issue #10 (Mini-apps Platform)

---

*Each issue should be created in GitHub using the MVP Deliverable template and assigned appropriate labels, milestones, and story points.*
