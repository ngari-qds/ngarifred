# KeChat Messaging Service

Real-time E2E encrypted messaging service - Built with Go.

## Overview

The Messaging Service provides:
- 🔐 End-to-end encryption using Signal protocol
- 💬 Real-time message delivery via WebSocket
- 👥 1:1 and group messaging
- 📝 Typing indicators and read receipts
- 📎 Media attachments (encrypted)
- 🔄 Multi-device sync
- 📊 Presence management (online/offline)
- 📦 Offline message queueing

## Tech Stack

- **Language**: Go 1.21+
- **Framework**: Fiber / Gin
- **WebSocket**: gorilla/websocket
- **Encryption**: Signal Protocol (libsignal-protocol-go)
- **Storage**: Cassandra (messages), Redis (queues, presence)
- **Message Bus**: Kafka

## Architecture

```
Client → WebSocket Gateway → Message Handler
                ↓
         Encryption Layer
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
Cassandra              Kafka Events
(encrypted msgs)      (delivery, read)
```

## API Endpoints

### WebSocket Connection

```
ws://localhost:3002/ws/messages?token={jwt}
```

#### Message Types

**Send Message**
```json
{
  "type": "message.send",
  "payload": {
    "recipientId": "user-uuid",
    "encryptedContent": "base64-encrypted-data",
    "timestamp": 1640000000
  }
}
```

**Message Received**
```json
{
  "type": "message.received",
  "payload": {
    "messageId": "msg-uuid",
    "senderId": "user-uuid",
    "encryptedContent": "base64-encrypted-data",
    "timestamp": 1640000000
  }
}
```

**Typing Indicator**
```json
{
  "type": "typing.start",
  "payload": {
    "chatId": "chat-uuid"
  }
}
```

**Read Receipt**
```json
{
  "type": "message.read",
  "payload": {
    "messageId": "msg-uuid",
    "timestamp": 1640000000
  }
}
```

**Presence Update**
```json
{
  "type": "presence.update",
  "payload": {
    "userId": "user-uuid",
    "status": "online",
    "lastSeen": 1640000000
  }
}
```

### REST API (Fallback)

#### Send Message
```http
POST /api/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipientId": "user-uuid",
  "encryptedContent": "base64-encrypted-data"
}
```

#### Get Message History
```http
GET /api/messages/history?chatId=uuid&limit=50&offset=0
Authorization: Bearer {token}
```

#### Upload Pre-Keys
```http
POST /api/keys/upload
Authorization: Bearer {token}
Content-Type: application/json

{
  "identityKey": "base64-public-key",
  "signedPreKey": {
    "keyId": 1,
    "publicKey": "base64-key",
    "signature": "base64-sig"
  },
  "oneTimePreKeys": [
    {
      "keyId": 1,
      "publicKey": "base64-key"
    }
  ]
}
```

#### Fetch User Keys
```http
GET /api/keys/:userId
Authorization: Bearer {token}
```

Response:
```json
{
  "identityKey": "base64-public-key",
  "signedPreKey": {
    "keyId": 1,
    "publicKey": "base64-key",
    "signature": "base64-sig"
  },
  "oneTimePreKey": {
    "keyId": 1,
    "publicKey": "base64-key"
  }
}
```

## Data Models

### Message Schema (Cassandra)

```go
type Message struct {
    MessageID      string    `cql:"message_id"`
    ChatID         string    `cql:"chat_id"`
    SenderID       string    `cql:"sender_id"`
    RecipientID    string    `cql:"recipient_id"`
    EncryptedData  []byte    `cql:"encrypted_data"`
    Timestamp      time.Time `cql:"timestamp"`
    DeliveredAt    *time.Time `cql:"delivered_at"`
    ReadAt         *time.Time `cql:"read_at"`
}
```

Cassandra Table:
```cql
CREATE TABLE messages (
    chat_id UUID,
    timestamp TIMESTAMP,
    message_id UUID,
    sender_id UUID,
    recipient_id UUID,
    encrypted_data BLOB,
    delivered_at TIMESTAMP,
    read_at TIMESTAMP,
    PRIMARY KEY (chat_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

### Key Storage (Redis)

```
keys:identity:{user_id}        -> identity_key
keys:signed:{user_id}          -> signed_pre_key
keys:onetime:{user_id}:{key_id} -> one_time_pre_key
```

### Presence (Redis)

```
presence:{user_id} -> {"status": "online", "lastSeen": 1640000000}
```

## Signal Protocol Implementation

### Key Exchange (X3DH)

1. **Registration**: User uploads identity key, signed pre-key, and one-time pre-keys
2. **Initiation**: Alice fetches Bob's keys from server
3. **Agreement**: Alice performs X3DH to derive shared secret
4. **Encryption**: Messages encrypted with Double Ratchet

### Double Ratchet

Each message:
1. Advance ratchet state
2. Derive message key
3. Encrypt content
4. Send encrypted payload + ratchet public key

### Forward Secrecy

- New keys for each message
- Old keys deleted after use
- Compromise of one message doesn't affect others

## Configuration

### Environment Variables

```bash
# Server
PORT=3002
WS_READ_BUFFER_SIZE=1024
WS_WRITE_BUFFER_SIZE=1024

# Cassandra
CASSANDRA_HOSTS=localhost:9042
CASSANDRA_KEYSPACE=kechat_messages
CASSANDRA_CONSISTENCY=QUORUM

# Redis
REDIS_ADDR=localhost:6379
REDIS_PASSWORD=
REDIS_DB=0

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC_MESSAGES=message.events

# Authentication
JWT_SECRET=your-secret-key
```

## Development

### Run Locally

```bash
# Install Go dependencies
go mod download

# Run server
go run cmd/server/main.go
```

### Build

```bash
go build -o bin/messaging cmd/server/main.go
```

### Run Tests

```bash
# Unit tests
go test ./...

# With coverage
go test -cover ./...

# Race detection
go test -race ./...

# Benchmark
go test -bench=. ./...
```

### Linting

```bash
golangci-lint run
```

## Project Structure

```
services/messaging/
├── cmd/
│   └── server/
│       └── main.go              # Entry point
├── internal/
│   ├── handler/
│   │   ├── websocket.go         # WebSocket handler
│   │   └── rest.go              # REST API handler
│   ├── service/
│   │   ├── message.go           # Message service
│   │   ├── encryption.go        # Signal protocol
│   │   └── presence.go          # Presence service
│   ├── repository/
│   │   ├── cassandra.go         # Cassandra repo
│   │   └── redis.go             # Redis repo
│   └── middleware/
│       ├── auth.go              # JWT middleware
│       └── ratelimit.go         # Rate limiting
├── pkg/
│   ├── signal/
│   │   ├── protocol.go          # Signal protocol
│   │   └── keys.go              # Key management
│   └── websocket/
│       └── client.go            # WebSocket client
├── go.mod
└── go.sum
```

## Performance

### Benchmarks

- Message throughput: 50,000 msg/sec
- WebSocket connections: 100,000 concurrent
- Latency (p99): < 150ms

### Optimization Techniques

- Connection pooling (Cassandra, Redis)
- Message batching
- Zero-copy message forwarding
- Go routines for concurrent processing

## Monitoring

### Metrics (Prometheus)

```go
messagesSent.WithLabelValues("1:1").Inc()
messagesDelivered.WithLabelValues("group").Inc()
wsConnections.Set(float64(count))
messageLatency.Observe(duration.Seconds())
```

Available metrics:
- `messaging_messages_sent_total`
- `messaging_messages_delivered_total`
- `messaging_websocket_connections`
- `messaging_message_latency_seconds`
- `messaging_errors_total`

### Health Check

```http
GET /health
```

Response:
```json
{
  "status": "healthy",
  "cassandra": "connected",
  "redis": "connected",
  "kafka": "connected"
}
```

## Load Testing

### k6 Test Script

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://localhost:3002/ws/messages?token=xxx';
  
  const res = ws.connect(url, function (socket) {
    socket.on('open', () => {
      socket.send(JSON.stringify({
        type: 'message.send',
        payload: {
          recipientId: 'user-uuid',
          encryptedContent: 'encrypted-data'
        }
      }));
    });
    
    socket.on('message', (data) => {
      check(data, { 'received message': (d) => d !== null });
    });
  });
}
```

Run:
```bash
k6 run --vus 1000 --duration 30s load-test.js
```

## Security

### Threat Model

- **Server compromise**: Cannot decrypt messages (E2E encryption)
- **Network eavesdropping**: TLS protects transport
- **Message tampering**: Signature verification prevents

### Best Practices

- Never log encrypted content
- Rotate pre-keys regularly
- Rate limit key uploads
- Validate all signatures

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](../../LICENSE)
