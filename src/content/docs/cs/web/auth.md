---
title: auth
description: "身份验证 (Authentication) 是一种安全机制, 用于验证用户的身份"
lastUpdated: 2025-04-02T05:59:58Z
tags: [web,auth]
---

## Authentication

- 密码
- 一次性验证码 (OTP, One-Time Password), (短信, 邮件, 应用)
- 魔法链接（Magic Link）

```rest
POST /api/auth/login
POST /api/auth/register
POST /api/auth/access_token
```

### schema

**user**
| field name | type | key | description |
|    ---     | --- | ---  | --- |
| id | string | PK | Unique identifier for each user |
| name | string |  | User's chosen display name |
| email | string |  | User's email address for communication and login |
| emailVerified | boolean |  | 是否已验证邮箱 |
| image | string | `?` | User's image url |

**session**
| field name | type | key | description |
|    ---     | --- | ---  | --- |
| id | string | PK | Unique identifier for each session |
| userId | string | FK | User's id |
| token | string |  | unique session token |
| expiresAt | Date |  | The time when the session expires |
| ipAddress | string | `?` | IP address of the device |
| userAgent | string | `?` | User agent of the device |

**account**
| field name | type | key | description |
|    ---     | --- | ---  | --- |
| id | string | PK | Unique identifier for each account |
| userId | string | FK | User's id |
| accountId | string |  | 提供者 的 user.id |
| providerId | string | | 提供者 来源, 如 credential， google, github |
| accessToken | string | `?` | 提供者 返回 的 access token |
| refreshToken | string | `?` | 提供者 返回 的 refresh token |
| accessTokenExpiresAt | Date | `?` | The time when the access token expires |
| refreshTokenExpiresAt | Date | `?` | The time when the refresh token expires |
| scope | string | `?` | 提供者返回的 scope |
| idToken | string | `?` | 提供者返回的 id token |
| password | string | `?` | Mainly used for email and password authentication |

**verification**
| field name | type | key | description |
|    ---     | --- | ---  | --- |
| id | string | PK | Unique identifier for each verification |
| identifier | string |  | 用于验证请求的标识符, 如 email, phone number |
| value | string |  | 用于验证的值, 如 短信验证码 |
| expiresAt | Date |  | 过期时间 |

## OAuth

### OAuth 2.1
- OAuth 2.1 是对 OAuth 2.0 的改进，简化了规范，移除了不安全的功能（如隐式授权）
- 更加注重安全性，推荐使用授权码模式（Authorization Code Flow）并结合 PKCE（Proof Key for Code Exchange）

### OpenID Connect (OIDC)

- 基于 OAuth 2.0 的身份层协议，提供用户身份验证功能。
- 广泛用于单点登录（SSO）和用户信息共享。

## Passwordless Authentication

### 基于生物

### 基于设备
- 使用设备的公钥加密（如 FIDO2/WebAuthn）进行认证。
- 用户只需通过设备（如手机或硬件密钥）完成登录，无需记住密码

## Decentralized Authentication

### Decentralized Identity (DID)

### Self-Sovereign Identity (SSI)
