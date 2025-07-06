# Contributing to Delete Profile Worker

Thank you for your interest in contributing to the Delete Profile Worker project! We welcome contributions from the community and are pleased to have you aboard.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Security Considerations](#security-considerations)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- **Be respectful** and inclusive
- **Be constructive** in discussions and feedback
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Cloudflare account (for deployment)
- Basic understanding of JavaScript/ES6+
- Familiarity with Cloudflare Workers

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/deleteprofileworker.git
   cd deleteprofileworker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy configuration**
   ```bash
   cp wrangler.toml.example wrangler.toml
   ```

4. **Set up environment variables**
   ```bash
   wrangler secret put BACKEND_DELETE_URL
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## How to Contribute

### Reporting Bugs

When filing an issue, please include:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (Node.js version, OS, etc.)
- **Error messages** or logs if applicable

Use the bug report template:

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Send request to '...'
2. With parameters '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Environment**
- OS: [e.g. Windows 11]
- Node.js version: [e.g. 18.17.0]
- Wrangler version: [e.g. 3.22.0]
```

### Suggesting Features

For feature requests, please include:

- **Clear use case** for the feature
- **Detailed description** of the proposed functionality
- **Examples** of how it would be used
- **Consideration of alternatives**

### Code Contributions

1. **Check existing issues** to avoid duplicating work
2. **Create an issue** to discuss major changes before implementation
3. **Fork the repository** and create a feature branch
4. **Write tests** for new functionality
5. **Follow coding standards** outlined below
6. **Submit a pull request** with clear description

## Development Setup

### Local Development

```bash
# Start local development server
npm run dev

# Test with the included test interface
open test.html
```

### Environment Variables

Required for testing:
- `BACKEND_DELETE_URL`: Your test backend API endpoint

Set via Wrangler:
```bash
wrangler secret put BACKEND_DELETE_URL
```

## Coding Standards

### JavaScript Style

- Use **ES6+ features** and modern JavaScript
- Follow **ESLint** configuration provided
- Use **Prettier** for code formatting
- Prefer **const/let** over var
- Use **async/await** over Promise chains

### Code Organization

- **Single responsibility** principle for functions
- **Clear, descriptive** variable and function names
- **Comments** for complex logic
- **Error handling** for all async operations

### Example Code Style

```javascript
// Good
async function deleteUserProfile(userId, authToken, backendUrl) {
    if (!userId || !authToken || !backendUrl) {
        throw new Error('Missing required parameters');
    }
    
    try {
        const response = await fetch(`${backendUrl}?user_id=${encodeURIComponent(userId)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend error: ${errorText}`);
        }
        
        return true;
    } catch (error) {
        console.error('Profile deletion failed:', error);
        throw error;
    }
}
```

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Examples:
```
feat: add rate limiting support
fix: handle empty user_id parameter
docs: update API documentation
test: add unit tests for auth validation
```

## Testing

### Manual Testing

Use the provided test interface:
1. Open `test.html` in your browser
2. Configure local worker URL
3. Test various scenarios:
   - Valid deletion requests
   - Missing parameters
   - Invalid auth tokens
   - Backend errors

### Test Cases to Cover

- ✅ Valid DELETE request with auth token
- ❌ GET/POST/PUT requests (should return 405)
- ❌ Missing user_id parameter
- ❌ Missing Authorization header
- ❌ Invalid Bearer token format
- ❌ Backend URL not configured
- ❌ Backend API errors

### Writing Tests

```javascript
// Example test structure
describe('deleteUserProfile', () => {
    it('should successfully delete profile with valid parameters', async () => {
        // Test implementation
    });
    
    it('should throw error for missing user_id', async () => {
        // Test implementation
    });
});
```

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Clear title and description
   - Reference related issues
   - Include testing information

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Local testing completed
- [ ] Manual testing with test.html
- [ ] All existing tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings introduced
```

## Security Considerations

### Security Guidelines

- **Never commit** sensitive data (tokens, URLs, credentials)
- **Validate all inputs** from requests
- **Use environment variables** for configuration
- **Follow principle of least privilege**
- **Sanitize error messages** to prevent information disclosure

### Reporting Security Issues

For security vulnerabilities:
1. **DO NOT** create public issues
2. **Email** security@yourproject.com
3. **Include** detailed description and reproduction steps
4. **Allow time** for fix before public disclosure

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check README.md first
- **Examples**: Use test.html as reference implementation

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing! 🎉