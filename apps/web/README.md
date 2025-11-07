# KeChat Web App

Progressive Web Application (PWA) for KeChat - Built with Next.js 14.

## Features

- 🔐 End-to-end encrypted messaging
- 💰 Integrated mobile money payments (M-Pesa, Airtel)
- 📞 WebRTC voice and video calls
- 🏪 SME marketplace
- 👥 Community channels
- 📱 Progressive Web App (offline support)
- 🌍 Multi-language support (English, Swahili)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State**: React Query + Zustand
- **Real-time**: WebSocket client
- **Encryption**: Signal Protocol (@signalapp/libsignal-client)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# From repository root
pnpm install

# Run web app in development
pnpm --filter @kechat/web dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_WS_URL` - WebSocket server URL
- `NEXT_PUBLIC_LIVEKIT_HOST` - LiveKit server for calls

## Project Structure

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Main app routes
│   ├── messages/          # Messaging interface
│   ├── payments/          # Payment flows
│   ├── marketplace/       # Product browsing
│   └── settings/          # User settings
├── components/            # React components
│   ├── chat/             # Chat UI components
│   ├── payment/          # Payment components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## Key Features

### Messaging
- Real-time message delivery via WebSocket
- E2E encrypted using Signal protocol
- Typing indicators and read receipts
- Media attachments (images, videos, documents)
- Voice messages
- Group chats

### Payments
- M-Pesa STK Push integration
- P2P transfers
- Merchant payments
- Transaction history
- Payment receipts

### Calls
- 1:1 voice calls
- 1:1 video calls
- Group calls (up to 8 participants)
- Screen sharing

## Development

### Run Development Server

```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

### Run Production Build

```bash
pnpm start
```

### Linting

```bash
pnpm lint
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```bash
docker build -t kechat-web .
docker run -p 3000:3000 kechat-web
```

### Self-hosted

```bash
pnpm build
pnpm start
```

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle size: < 500KB (gzipped)

## Accessibility

- WCAG AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for development guidelines.

## License

MIT License - See [LICENSE](../../LICENSE)
