# Security, RBAC, Privacy and Abuse Prevention

## Roles

STUDENT
MANAGER
MODERATOR
ADMIN
SUPER_ADMIN

## Student

Can:
- create feedback
- view own feedback
- create permitted community posts
- comment
- react
- vote
- report content

Cannot:
- access other students' private feedback
- access admin analytics
- access audit logs
- modify other users

## Manager

Can:
- view mess feedback
- view analytics
- view AI insights
- create/manage operational actions
- view permitted community data

## Moderator

Can:
- review reports
- moderate posts
- moderate comments
- manage moderation queues

## Admin

Can:
- manage students
- manage feedback
- review media
- manage community
- manage meals
- manage reports
- manage actions
- view analytics
- view AI insights
- view audit logs

## Super Admin

Full administrative control.

## Backend Enforcement

All permissions must be enforced server-side.

Never trust:
- role from React
- user ID from React
- ownership claim from React
- hidden UI controls as security

## Account Edge Cases

Handle:
- inactive account
- suspended account
- deleted account
- expired session
- revoked permissions
- role change while logged in

## Privacy

Do not expose:
- private feedback
- private media
- private student details
- authentication secrets

## Media Security

Validate:
- type
- size
- duration
- ownership

Do not trust filename extensions alone.

## Abuse Prevention

Consider:
- rate limits
- duplicate prevention
- spam detection
- moderation
- upload limits
- repeated reaction prevention

## Audit Logs

Log sensitive actions such as:
- account suspension
- role changes
- content deletion
- moderation decisions
- administrative feedback actions
- action changes
- important configuration changes

Audit logs should contain:
- actor
- action
- target
- timestamp
- reason where appropriate

Never log passwords, access tokens, or unnecessary sensitive payloads.
