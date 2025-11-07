# KeChat Quick Start Guide

Get up and running with KeChat development in 5 minutes.

## Prerequisites

Before you begin, ensure you have:
- ✅ **Node.js** 18.0.0 or higher
- ✅ **pnpm** 8.0.0 or higher (recommended) or npm
- ✅ **Docker** & **Docker Compose** (for local services)
- ✅ **Git** 2.30 or higher

Optional (for backend services):
- **Go** 1.21+ (for messaging and calls services)
- **kubectl** (for Kubernetes deployments)

## Step 1: Clone the Repository

```bash
git clone https://github.com/ngari-qds/ngarifred.git
cd ngarifred
```

## Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

This will install all dependencies for the monorepo workspaces.

## Step 3: Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and configure the following essential variables:
```bash
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=kechat
POSTGRES_PASSWORD=kechat_dev_password
POSTGRES_DB=kechat

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
```

## Step 4: Start Local Services

Start all backing services (PostgreSQL, Redis, Cassandra, Kafka, etc.):

```bash
docker-compose up -d
```

Verify services are running:
```bash
docker-compose ps
```

You should see all services with status "Up".

## Step 5: Run the Application

### Option A: Run All Services (Recommended for Full Stack)

```bash
pnpm dev
```

This starts all apps and services in development mode using Turborepo.

### Option B: Run Specific Workspace

Run just the web app:
```bash
pnpm --filter @kechat/web dev
```

Run just the auth service:
```bash
pnpm --filter @kechat/service-auth dev
```

### Option C: Run Legacy Portfolio (Original Site)

```bash
npm run legacy:dev
```

## Step 6: Access Applications

Once running, access the applications:

- **Web App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **Auth Service**: http://localhost:3001/api/auth
- **Messaging Service**: http://localhost:3002
- **Grafana (Monitoring)**: http://localhost:3001 (admin/admin)
- **MinIO (Storage)**: http://localhost:9001 (kechat/kechat_dev_password)

## Step 7: Verify Setup

Run the health check:
```bash
curl http://localhost:3001/health
```

You should see:
```json
{
  "status": "healthy",
  "services": {
    "postgres": "connected",
    "redis": "connected"
  }
}
```

## Common Commands

### Development

```bash
# Run all in dev mode
pnpm dev

# Build all packages
pnpm build

# Lint all code
pnpm lint

# Run all tests
pnpm test

# Clean all build artifacts
pnpm clean
```

### Docker Services

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart postgres
```

### Workspace-Specific Commands

```bash
# Work with specific app/service
pnpm --filter @kechat/web [command]
pnpm --filter @kechat/service-auth [command]

# Examples:
pnpm --filter @kechat/web build
pnpm --filter @kechat/service-auth test
```

## Troubleshooting

### Port Already in Use

If ports are already in use, modify the ports in `docker-compose.yml` or kill the conflicting processes:

```bash
# Find process using port 5432
lsof -i :5432

# Kill process
kill -9 <PID>
```

### Services Not Starting

Check Docker logs:
```bash
docker-compose logs postgres
docker-compose logs redis
```

### Database Connection Errors

Ensure PostgreSQL is running and accessible:
```bash
docker-compose ps postgres
psql -h localhost -U kechat -d kechat
```

### pnpm Install Errors

Clear cache and reinstall:
```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

### Build Errors

Clean and rebuild:
```bash
pnpm clean
pnpm install
pnpm build
```

## Project Structure Quick Reference

```
ngarifred/
├── apps/                  # User-facing applications
│   ├── web/              # Next.js web app
│   ├── mobile/           # React Native app
│   └── admin/            # Admin dashboard
├── services/             # Backend microservices
│   ├── auth/             # Authentication (NestJS)
│   ├── messaging/        # Messaging (Go)
│   ├── payments/         # Payments (NestJS)
│   ├── calls/            # Calls (Go)
│   ├── marketplace/      # Marketplace (NestJS)
│   ├── integrations/     # Telco adapters (NestJS)
│   └── miniapps/         # Mini-apps platform (NestJS)
├── packages/             # Shared libraries
│   ├── ui/               # Design system
│   ├── sdk-ts/           # TypeScript SDK
│   ├── types/            # Shared types
│   └── config/           # Configuration
├── infra/                # Infrastructure
│   ├── terraform/        # IaC
│   ├── kubernetes/       # K8s manifests
│   └── docker/           # Docker configs
└── .github/
    └── workflows/        # CI/CD
```

## Next Steps

1. **Read the Documentation**:
   - [Architecture](ARCHITECTURE.md) - System design
   - [Security](SECURITY.md) - Security & compliance
   - [Contributing](CONTRIBUTING.md) - Development guidelines
   - [Issues](ISSUES.md) - MVP deliverables

2. **Set Up Your IDE**:
   - Install ESLint extension
   - Install Prettier extension
   - Configure VS Code settings (see CONTRIBUTING.md)

3. **Pick a Task**:
   - Check [ISSUES.md](ISSUES.md) for available tasks
   - Start with simple tasks tagged `good-first-issue`
   - Join team discussions

4. **Run Tests**:
   ```bash
   pnpm test
   ```

5. **Make Your First Change**:
   - Create a feature branch
   - Make changes
   - Run linting and tests
   - Submit a PR

## Getting Help

- **Documentation**: Check docs in the repository
- **Issues**: Create a GitHub issue for bugs/features
- **Discussions**: Use GitHub Discussions for questions
- **Email**: dev@kechat.ke

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [pnpm Documentation](https://pnpm.io/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Go Documentation](https://go.dev/doc/)

---

**Welcome to KeChat! Let's build something amazing together. 🚀**
