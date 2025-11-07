# Contributing to KeChat

Thank you for your interest in contributing to KeChat! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards
✅ **Do**:
- Be respectful and inclusive
- Provide constructive feedback
- Accept criticism gracefully
- Focus on what's best for the community

❌ **Don't**:
- Use sexualized language or imagery
- Make personal attacks or trolling
- Publish private information without consent
- Engage in unprofessional conduct

---

## Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (required for monorepo)
- **Go** >= 1.21 (for backend services)
- **Docker** & **Docker Compose** (for local development)
- **Git** >= 2.30

### Initial Setup

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ngarifred.git
cd ngarifred

# Add upstream remote
git remote add upstream https://github.com/ngari-qds/ngarifred.git

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Start development services (Docker Compose)
docker-compose up -d

# Run all apps and services in dev mode
pnpm dev
```

### Project Structure

```
kechat/
├── apps/           # User-facing applications
├── services/       # Backend microservices
├── packages/       # Shared libraries
├── infra/          # Infrastructure as Code
└── ci/             # CI/CD configurations
```

---

## Development Workflow

### Branch Naming Convention

```
feature/[issue-number]-short-description
bugfix/[issue-number]-short-description
hotfix/[issue-number]-short-description
docs/short-description
refactor/short-description
```

**Examples**:
- `feature/42-add-m-pesa-integration`
- `bugfix/123-fix-message-delivery`
- `docs/update-api-reference`

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(messaging): implement E2E encryption with Signal protocol

- Add Signal protocol library integration
- Generate and store device keys
- Implement key exchange flow

Closes #42
```

### Development Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/123-your-feature
   ```

2. **Make Changes**
   - Write code following our [coding standards](#coding-standards)
   - Write tests for new functionality
   - Update documentation as needed

3. **Test Locally**
   ```bash
   # Run linting
   pnpm lint
   
   # Run tests
   pnpm test
   
   # Build all packages
   pnpm build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/123-your-feature
   ```

6. **Open a Pull Request**
   - Go to GitHub and create a PR
   - Fill out the PR template
   - Link related issues
   - Request reviews

---

## Coding Standards

### TypeScript / JavaScript

**Style Guide**: We use ESLint + Prettier

```typescript
// ✅ Good
export const getUserById = async (userId: string): Promise<User> => {
  const user = await db.users.findOne({ id: userId });
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }
  return user;
};

// ❌ Bad
export const getUserById = async (userId: string) => {
  let user = await db.users.findOne({ id: userId });
  if (!user) throw new Error("User not found");
  return user;
};
```

**Rules**:
- Use TypeScript strict mode
- Prefer `const` over `let`, never use `var`
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Use async/await over callbacks
- Handle errors explicitly

### Go

**Style Guide**: We follow [Effective Go](https://go.dev/doc/effective_go)

```go
// ✅ Good
func GetUserByID(ctx context.Context, userID string) (*User, error) {
    user, err := db.FindUserByID(ctx, userID)
    if err != nil {
        return nil, fmt.Errorf("failed to find user %s: %w", userID, err)
    }
    return user, nil
}

// ❌ Bad
func GetUserById(userid string) *User {
    user, _ := db.FindUserByID(userid)
    return user
}
```

**Rules**:
- Use `gofmt` and `golint`
- Follow idiomatic Go conventions
- Use context for cancellation
- Always handle errors (no `_` ignore)
- Use structured logging (zerolog)

### React / React Native

```tsx
// ✅ Good
interface MessageProps {
  content: string;
  timestamp: Date;
  sender: User;
}

export const Message: React.FC<MessageProps> = ({ content, timestamp, sender }) => {
  const formattedTime = useMemo(
    () => formatTimestamp(timestamp),
    [timestamp]
  );

  return (
    <div className="message">
      <span className="sender">{sender.name}</span>
      <p>{content}</p>
      <time>{formattedTime}</time>
    </div>
  );
};

// ❌ Bad
export const Message = (props: any) => {
  return (
    <div>
      <span>{props.sender.name}</span>
      <p>{props.content}</p>
    </div>
  );
};
```

**Rules**:
- Use functional components with hooks
- Type all props with TypeScript
- Use `useMemo` and `useCallback` for optimization
- Follow accessibility best practices (WCAG AA)
- Use semantic HTML

### CSS / Styling

We use **TailwindCSS** for styling:

```tsx
// ✅ Good - Semantic class names with Tailwind
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
  Send Message
</button>

// ❌ Bad - Inline styles
<button style={{ padding: '8px 16px', backgroundColor: '#007bff' }}>
  Send Message
</button>
```

---

## Testing Guidelines

### Unit Tests

**Coverage Target**: 80% minimum

```typescript
// services/auth/src/auth.service.spec.ts
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('verifyOTP', () => {
    it('should return JWT for valid OTP', async () => {
      const result = await service.verifyOTP('+254712345678', '123456');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw error for invalid OTP', async () => {
      await expect(
        service.verifyOTP('+254712345678', '000000')
      ).rejects.toThrow('Invalid OTP');
    });
  });
});
```

### Integration Tests

```typescript
// apps/web/tests/integration/messaging.test.ts
describe('Messaging API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should send message successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/messages')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        recipientId: 'user-123',
        content: 'Hello!',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('messageId');
  });
});
```

### End-to-End Tests

```typescript
// apps/mobile/e2e/login.e2e.ts
describe('Login Flow', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should login with phone number', async () => {
    await element(by.id('phone-input')).typeText('+254712345678');
    await element(by.id('send-otp-button')).tap();
    
    await waitFor(element(by.id('otp-input')))
      .toBeVisible()
      .withTimeout(5000);
    
    await element(by.id('otp-input')).typeText('123456');
    await element(by.id('verify-button')).tap();
    
    await expect(element(by.id('chat-list'))).toBeVisible();
  });
});
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with `main`

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tests pass locally
```

### Review Process

1. **Automated Checks**: CI/CD runs tests, linting, security scans
2. **Code Review**: At least 1 approval required
3. **Security Review**: For sensitive changes (auth, payments)
4. **Merge**: Squash and merge to `main`

---

## Issue Guidelines

### Reporting Bugs

**Template**:
```markdown
**Describe the bug**
Clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable.

**Environment**
- OS: [e.g., iOS 17]
- App Version: [e.g., 1.0.0]
- Device: [e.g., iPhone 14]

**Additional context**
Any other information.
```

### Feature Requests

**Template**:
```markdown
**Is your feature request related to a problem?**
Clear description of the problem.

**Describe the solution you'd like**
Clear description of the desired solution.

**Describe alternatives you've considered**
Alternative solutions or features.

**Additional context**
Any other information, mockups, etc.
```

---

## Development Environment

### Recommended Tools

- **IDE**: VS Code with extensions:
  - ESLint
  - Prettier
  - Go
  - Docker
  - GitLens
- **API Testing**: Postman / Insomnia
- **Database**: DBeaver (for PostgreSQL)
- **Git Client**: GitKraken / SourceTree (optional)

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "go.formatTool": "gofmt",
  "go.lintTool": "golangci-lint"
}
```

---

## Security

### Reporting Vulnerabilities

**DO NOT** open a public issue for security vulnerabilities.

Instead, email: **security@kechat.ke**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We aim to respond within 48 hours.

---

## Questions?

- **GitHub Discussions**: For general questions
- **Slack**: Join our [community Slack](#) (coming soon)
- **Email**: dev@kechat.ke

---

## License

By contributing to KeChat, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

*Thank you for contributing to KeChat! 🚀*
