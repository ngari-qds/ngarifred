# KeChat Authentication Service

Identity and authentication service for KeChat - Built with NestJS.

## Overview

The Auth Service handles:
- 📱 Phone number authentication with SMS OTP
- 🔐 JWT token generation and refresh
- 🇰🇪 eCitizen OIDC integration for verified identity
- 🔑 Multi-factor authentication (TOTP)
- 📱 Device management and revocation
- 🔄 Account recovery (QR code + passphrase)
- 🔒 HashiCorp Vault integration for secrets

## Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **Cache**: Redis
- **Secrets**: HashiCorp Vault
- **SMS**: Africa's Talking / Twilio
- **Auth**: JWT, Passport.js

## API Endpoints

### Phone Authentication

#### Request OTP
```http
POST /auth/otp/request
Content-Type: application/json

{
  "phoneNumber": "+254712345678"
}
```

Response:
```json
{
  "success": true,
  "expiresIn": 300
}
```

#### Verify OTP
```http
POST /auth/otp/verify
Content-Type: application/json

{
  "phoneNumber": "+254712345678",
  "otp": "123456"
}
```

Response:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 900,
  "user": {
    "id": "uuid",
    "phoneNumber": "+254712345678",
    "verified": false
  }
}
```

### Token Management

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

### eCitizen Integration

#### Start OIDC Flow
```http
GET /auth/oidc/authorize?redirect_uri=https://app.kechat.ke/callback
```

#### Handle Callback
```http
GET /auth/oidc/callback?code=xxx&state=xxx
```

### Device Management

#### Register Device
```http
POST /auth/device/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "deviceName": "iPhone 14",
  "deviceId": "device-fingerprint",
  "pushToken": "fcm-token"
}
```

#### List Devices
```http
GET /auth/devices
Authorization: Bearer {token}
```

#### Revoke Device
```http
DELETE /auth/device/:deviceId
Authorization: Bearer {token}
```

### Multi-Factor Authentication

#### Setup TOTP
```http
POST /auth/mfa/setup
Authorization: Bearer {token}
```

Response:
```json
{
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCode": "data:image/png;base64,..."
}
```

#### Verify TOTP
```http
POST /auth/mfa/verify
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "123456"
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  phone_verified BOOLEAN DEFAULT false,
  ecitizen_id VARCHAR(50),
  ecitizen_verified BOOLEAN DEFAULT false,
  mfa_enabled BOOLEAN DEFAULT false,
  mfa_secret VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Devices Table
```sql
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(100),
  device_fingerprint VARCHAR(255) UNIQUE NOT NULL,
  push_token VARCHAR(255),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  refresh_token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### OTP Table
```sql
CREATE TABLE otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) NOT NULL,
  otp_hash VARCHAR(255) NOT NULL,
  attempts INT DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_otps_phone_expires ON otps(phone_number, expires_at);
```

## Configuration

### Environment Variables

```bash
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=kechat
POSTGRES_PASSWORD=secret
POSTGRES_DB=kechat

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d

# SMS Provider
SMS_PROVIDER=africas-talking
SMS_API_KEY=your-api-key
SMS_USERNAME=sandbox

# eCitizen
ECITIZEN_CLIENT_ID=your-client-id
ECITIZEN_CLIENT_SECRET=your-client-secret
ECITIZEN_REDIRECT_URI=https://api.kechat.ke/auth/oidc/callback

# Vault
VAULT_ADDR=http://localhost:8200
VAULT_TOKEN=your-vault-token
```

## Development

### Run in Development

```bash
# From repository root
pnpm --filter @kechat/service-auth dev
```

### Build

```bash
pnpm --filter @kechat/service-auth build
```

### Run Tests

```bash
# Unit tests
pnpm --filter @kechat/service-auth test

# E2E tests
pnpm --filter @kechat/service-auth test:e2e

# Test coverage
pnpm --filter @kechat/service-auth test:cov
```

### Database Migration

```bash
# Create migration
npm run migration:create -- AddMfaSupport

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

## Security Features

### Rate Limiting

- OTP requests: 3 per phone number per 15 minutes
- Login attempts: 5 per IP per 15 minutes
- API calls: 100 per user per minute

### Token Security

- Access tokens: 15-minute expiration
- Refresh tokens: Single-use with rotation
- Device binding prevents token theft

### Password Hashing

- bcrypt with cost factor 12
- OTP hashes salted and hashed

### Secrets Management

- All secrets stored in HashiCorp Vault
- Dynamic database credentials
- Automatic secret rotation

## Monitoring

### Health Check

```http
GET /auth/health
```

### Metrics

Available at `/auth/metrics` (Prometheus format):

- `auth_otp_requests_total` - Total OTP requests
- `auth_otp_verifications_total` - Total OTP verifications
- `auth_login_attempts_total` - Total login attempts
- `auth_token_refreshes_total` - Total token refreshes

## Error Handling

### Common Error Codes

- `AUTH_001` - Invalid phone number format
- `AUTH_002` - OTP expired
- `AUTH_003` - Invalid OTP
- `AUTH_004` - Too many OTP attempts
- `AUTH_005` - Invalid token
- `AUTH_006` - Token expired
- `AUTH_007` - Device not found
- `AUTH_008` - MFA required

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](../../LICENSE)
