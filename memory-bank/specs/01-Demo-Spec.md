----
id: 1
title: Demo Spec
summary: A basic structure for a spec.
author: dotfortun
created: 2026/11/09
updated: 2026/11/09
state: draft
----

# 01 Demo Spec

Project planners want a well-structured spec so that they can build out features knowing all the requirements ahead of time.

## Functional Requirements

- [ ] As a project planner, I want a well-structured spec template, so that I can build features knowing requirements ahead of time.
  - **Acceptance:** the spec contains an explicit who, what, and why for each functional requirement, verifiable by a reader at a glance.
- [ ] Functional requirements.
    - **Acceptance:** Functional requirements must contain detailed descriptions of how a feature works.
- [ ] Safety requirements if there are any.
    - **Acceptance:** Safety requirements should reference specific safety risks.
- [ ] Regulatory requirements if relevant.
    - **Acceptance:** Regulatory requirements should be relatively granular and reference regulations.
- [ ] Customer preference if relevant.
    - **Acceptance:** Customer preference must not override safety or regulatory requirements.

### Data Models

```typescript
interface Spec {
    id: number;
    title: string;
    summary: string;
    author: string;
    created: datetime;
    updated: datetime;
    state: "draft" | "accepted" | "in progress" | "finished";
}
```

## Safety Requirements

- [ ] Don't leak private information.
- [ ] Don't build a [CPU-heating feature](https://xkcd.com/1172/) because that is a hazard to end-users.

## Regulatory Requirements

- [ ] This must comply with GDPR, no personal data may be stored or transmitted; any personal data must be deletable on request.

## Customer Preference

The customer prefers that this spec be viewable as a markdown file.

## Out Of Scope

- Unnecessary work on related features.
    - e.g.: This Demo Spec only defines specs, not the content of decisions.
