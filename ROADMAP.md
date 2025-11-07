# KeChat Roadmap

Product roadmap for the KeChat super-app platform.

## Vision

Build a **secure, locally-resident, modular super-app** for Kenya that combines:
- Signal-grade end-to-end encrypted messaging
- Integrated mobile money (M-Pesa, Airtel, T-Kash)
- SME marketplace
- E-government integration
- Mini-apps developer platform

## Timeline Overview

```
Month 0-1: Foundation
Month 2-3: Core Messaging
Month 3-4: Payments & Commerce
Month 4-5: Calls & Community
Month 5-6: Integration & Launch
```

---

## Phase 1: Foundation (Month 0-1)

**Goal**: Establish core infrastructure and tooling

### Week 1-2: Infrastructure
- [x] Monorepo setup (Turborepo + pnpm)
- [x] Docker Compose for local development
- [ ] Terraform modules for cloud infrastructure
- [ ] Kubernetes cluster setup (Nairobi region)
- [ ] CI/CD pipelines (GitHub Actions)

### Week 3-4: Design & Auth
- [ ] Design system (@kechat/ui package)
- [ ] Component library (10 core components)
- [ ] Auth service (phone OTP)
- [ ] JWT token management
- [ ] Device registration

**Deliverables**:
- ✅ Complete monorepo structure
- ✅ Local development environment
- ⏳ Auth service MVP
- ⏳ Design system

**KPIs**:
- Infrastructure provisioned
- CI/CD green
- 10 core UI components
- Auth endpoints operational

---

## Phase 2: Core Messaging (Month 2-3)

**Goal**: Build secure messaging foundation

### Week 5-8: Messaging Core
- [ ] Signal protocol implementation
- [ ] WebSocket server (Go)
- [ ] Message storage (Cassandra)
- [ ] Key management system
- [ ] 1:1 messaging
- [ ] Group messaging
- [ ] Message sync across devices

### Week 9-10: Client Apps
- [ ] Web app messaging UI
- [ ] Mobile app messaging UI
- [ ] Message list and composer
- [ ] Media attachments
- [ ] Push notifications

**Deliverables**:
- Messaging service (Go)
- Web and mobile messaging clients
- E2E encryption working
- Message delivery < 150ms p99

**KPIs**:
- 1:1 messaging functional
- Group chats (up to 50 members)
- 10k concurrent WebSocket connections
- Message delivery success rate > 99.9%

---

## Phase 3: Payments & Commerce (Month 3-4)

**Goal**: Enable mobile money and marketplace

### Week 11-12: Mobile Money Integration
- [ ] M-Pesa Daraja API integration
- [ ] Airtel Money integration
- [ ] Webhook handlers
- [ ] Transaction reconciliation
- [ ] Payment adapter layer

### Week 13-14: Payments Service
- [ ] Wallet creation
- [ ] P2P transfers
- [ ] Double-entry ledger
- [ ] Transaction history
- [ ] KYC tier management

### Week 15-16: Marketplace
- [ ] Merchant onboarding
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Order management
- [ ] Payout scheduling

**Deliverables**:
- Payments service with ledger
- M-Pesa and Airtel integrations
- Marketplace MVP
- Merchant dashboard

**KPIs**:
- Payment success rate > 99%
- P2P transfer time < 2s
- 100 merchants onboarded (pilot)
- 1,000 transactions processed

---

## Phase 4: Calls & Community (Month 4-5)

**Goal**: Add voice/video and social features

### Week 17-18: Voice & Video Calls
- [ ] LiveKit SFU deployment
- [ ] WebRTC signaling service
- [ ] 1:1 voice calls
- [ ] 1:1 video calls
- [ ] Group calls (up to 8)
- [ ] TURN/STUN server

### Week 19-20: Community Features
- [ ] Channel creation
- [ ] Channel discovery
- [ ] Moderator roles
- [ ] Content moderation queue
- [ ] Verified badges
- [ ] AI-assisted moderation

**Deliverables**:
- Call service operational
- Community channels
- Moderation system

**KPIs**:
- Call setup time < 3s
- Call quality (jitter < 50ms p99)
- 50 active community channels
- 500 MAU in communities

---

## Phase 5: Integration & Launch (Month 5-6)

**Goal**: Finalize integrations and launch MVP

### Week 21-22: eCitizen Integration
- [ ] eCitizen OIDC flow
- [ ] Identity verification
- [ ] Verified badge issuance
- [ ] Document fetch (pilot)

### Week 23: Testing & Security
- [ ] Load testing (100k connections)
- [ ] Security audit
- [ ] Penetration testing
- [ ] Bug bounty launch (private)
- [ ] Performance optimization

### Week 24: Soft Launch
- [ ] Pilot launch (Nairobi)
- [ ] Limited user onboarding (1,000 users)
- [ ] Monitor metrics
- [ ] Gather feedback
- [ ] Fix critical issues

**Deliverables**:
- eCitizen integration live
- Security audit report
- MVP launched to pilot users

**Launch KPIs**:
- 100k registered users
- 10k daily active users
- Payment success rate > 99%
- Message delivery p95 < 300ms
- App Store rating > 4.5

---

## Post-MVP (Month 6+)

### Phase 6: Mini-Apps Platform (Month 7-8)
- [ ] Serverless runtime (Knative)
- [ ] Developer portal
- [ ] API key management
- [ ] SDK documentation
- [ ] Sample mini-apps
- [ ] Mini-app marketplace

### Phase 7: Scale & Optimize (Month 9-10)
- [ ] Multi-zone deployment
- [ ] Horizontal scaling
- [ ] Database sharding
- [ ] CDN integration
- [ ] Performance optimization

### Phase 8: Expansion (Month 11-12)
- [ ] Additional telco integrations (T-Kash)
- [ ] More e-gov services
- [ ] Business analytics
- [ ] Revenue optimization
- [ ] Regional expansion (Mombasa, Kisumu)

---

## Success Metrics

### Product Metrics

**Messaging**:
- Daily active users: 10k → 100k
- Messages sent per day: 100k → 1M
- Message delivery success: > 99.9%

**Payments**:
- Transaction volume: 10k KES → 10M KES per month
- Transaction success rate: > 99%
- Average transaction value: 500 KES

**Marketplace**:
- Active merchants: 100 → 1,000
- Orders per day: 50 → 500
- GMV (Gross Merchandise Value): 1M KES → 10M KES per month

**Calls**:
- Calls per day: 100 → 1,000
- Average call duration: 5 minutes
- Call quality rating: > 4.0/5.0

### Technical Metrics

- **Availability**: 99.95%
- **Message latency (p99)**: < 150ms
- **Payment processing**: < 2s
- **API response time (p95)**: < 200ms
- **Error rate**: < 0.1%

### Business Metrics

- **Revenue**: 0 → 100k KES per month
- **Burn rate**: < 500k KES per month
- **Customer acquisition cost**: < 50 KES
- **Lifetime value**: > 500 KES

---

## Risk Mitigation

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| E2E encryption bugs | High | Extensive testing, security audit |
| Payment reconciliation errors | Critical | Daily reconciliation jobs, alerts |
| Scalability issues | High | Load testing, horizontal scaling |
| Data loss | Critical | Multi-zone replication, backups |

### Business Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Slow user adoption | High | Marketing campaign, referral program |
| Telco API downtime | Medium | Retry logic, circuit breakers |
| Regulatory changes | Medium | Legal counsel, compliance monitoring |
| Competition | Medium | Unique features, network effects |

### Operational Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Team bandwidth | Medium | Phased rollout, prioritization |
| Infrastructure costs | Medium | Cost monitoring, optimization |
| Security breach | Critical | Security audits, bug bounty |
| Vendor lock-in | Low | Multi-cloud strategy |

---

## Team Structure

### Engineering (5 people)

- **Tech Lead** (1): Architecture, code review, mentorship
- **Backend Engineers** (2): Go/NestJS services, APIs
- **Frontend Engineers** (1.5): Web + Mobile apps
- **DevOps Engineer** (0.5): Infrastructure, CI/CD

### Product & Design (2 people)

- **Product Manager** (1): Roadmap, priorities, stakeholders
- **Product Designer** (1): UI/UX, design system

### Operations (1 person)

- **Operations Manager** (1): Support, community, partnerships

**Total**: 8 people

---

## Budget (6 months)

### Infrastructure (~$18k)
- Cloud hosting: $3k/month × 6 = $18k
- Domains, SSL, CDN: $500
- Third-party services: $2k

### Personnel (~$120k)
- Engineering: $60k
- Product & Design: $30k
- Operations: $15k
- Contingency: $15k

### Marketing (~$10k)
- Launch campaign: $5k
- Content creation: $3k
- Community building: $2k

### Legal & Compliance (~$5k)
- DPA compliance: $2k
- Terms of service: $1k
- Partnerships (MoUs): $2k

**Total Budget**: ~$153k USD for 6-month MVP

---

## Dependencies

### External Dependencies

- ✅ M-Pesa Daraja API access
- ⏳ Airtel Money API access
- ⏳ eCitizen OIDC integration approval
- ✅ SMS provider (Africa's Talking)
- ✅ Cloud provider (AWS/GCP)

### Internal Dependencies

- Repository setup → All services
- Auth service → Messaging, Payments
- Messaging service → Calls, Community
- Payments service → Marketplace

---

## Communication Plan

### Internal Updates
- **Daily Standups**: 15 min, async on Slack
- **Weekly Team Meeting**: 1 hour, roadmap review
- **Monthly All-Hands**: 1 hour, metrics + demos

### External Updates
- **Monthly Blog Post**: Product updates
- **Quarterly Town Hall**: Community feedback
- **Developer Newsletter**: API changes, new features

---

## Success Criteria for MVP Launch

✅ **Must Have**:
- [ ] 100k registered users
- [ ] 10k daily active users
- [ ] 99% payment success rate
- [ ] < 300ms message delivery (p95)
- [ ] Security audit passed
- [ ] DPIA approved

⭐ **Nice to Have**:
- [ ] 1,000 merchants on marketplace
- [ ] 50 active community channels
- [ ] 4.5+ app store rating
- [ ] Media coverage (3 articles)

---

## Long-Term Vision (12-24 months)

### Product Evolution
- Multi-country expansion (East Africa)
- Advanced mini-apps ecosystem
- AI-powered features (assistant, moderation)
- Blockchain integration for settlements

### Business Model
- Transaction fees (0.5% - 2%)
- Merchant subscriptions (5k - 50k KES/month)
- Premium features (verified badges, analytics)
- API platform revenue share (30%)

### Exit Strategy
- Acquisition by regional telco
- Strategic partnership with bank
- IPO (long-term)

---

*Last Updated: 2025-11-07*
