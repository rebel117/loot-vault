# 🎮 Batch 5: Advanced Features & Protocol Enhancements
**Gamification, Reputation, and Advanced Escrow**

---

## Issue #41: Tiered Yield Pools (Risk/Reward Brackets)

**Complexity: 200 Points**

### Description
Add support for multiple yield pool tiers (Conservative, Moderate, Aggressive) with different risk profiles and reward multipliers. Users choose their tier when depositing.

### Requirements and context

**Why this matters:**  
Not all users have the same risk tolerance. Tiered pools make the protocol more inclusive and increase TVL by attracting diverse investor profiles.

**What "done" looks like:**
- Smart contract: Support for 3 pool tiers with configurable multipliers (1x, 1.5x, 2x)
- Frontend: UI to select tier before deposit, display tier info (risk, expected yield)
- TypeScript types for pool tier metadata
- Tests: E2E tests for cross-tier payouts
- Demo showing all three tiers on dashboard

**Design constraints:**
- Conservative tier: guaranteed minimum yield, lower variance
- Aggressive tier: higher volatility, higher potential rewards
- Separate winner draws per tier (or single cross-tier draw with tier multipliers)

### Suggested execution

1. Fork and create: `git checkout -b feature/tiered-yield-pools`
2. Files to touch:
   - `contracts/src/lib.rs` — add `PoolTier` enum and tier logic
   - `frontend/src/components/PoolSelector.tsx` — tier selection UI
   - `frontend/src/types/index.ts` — add `PoolTier` type
   - `contracts/src/test.rs` — test cross-tier scenarios

3. Implementation:
   - Extend contract state to track tier balances separately
   - Calculate yield multipliers based on tier
   - Update deposit/withdrawal functions to accept tier parameter

### Test and commit

- Verify each tier can accumulate yield independently
- Test winner draw across tiers (or per-tier)
- Commit: `feat: add tiered yield pools with risk/reward multipliers`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #41`

---

## Issue #42: Freelancer Reputation System (Ratings & Badges)

**Complexity: 200 Points**

### Description
Build a reputation system for freelancers on the Mercenary Board. Track completion rates, ratings from clients, and award visual badges for milestones.

### Requirements and context

**Why this matters:**  
Freelancers with proven track records should be visibly credible. Badges and ratings build trust, increase job acquisition, and create healthy competition around quality.

**What "done" looks like:**
- Smart contract: Store freelancer reputation data (completed jobs, average rating, badge tiers)
- Frontend: Display freelancer profile with reputation card (badges, % completed, avg rating)
- Badge tiers: Bronze (10 completed), Silver (50), Gold (100), Platinum (500)
- Ratings stored on-chain (1-5 stars from clients)
- TypeScript types for freelancer profile
- Demo showing 3 freelancer profiles with different reputation levels

**Design constraints:**
- Reputation is immutable once awarded
- Badges display as visual icons with hover tooltips
- Average rating: weighted by recency (recent jobs matter more)
- Mobile-friendly reputation card

### Suggested execution

1. Fork and create: `git checkout -b feature/freelancer-reputation-system`
2. Files to touch:
   - `contracts/src/lib.rs` — add `Reputation` struct and update escrow
   - `frontend/src/components/FreelancerProfile.tsx` — reputation card
   - `frontend/src/components/BadgeIcon.tsx` — reusable badge component
   - `frontend/src/types/index.ts` — add `Reputation`, `BadgeTier` types
   - `contracts/src/test.rs` — test reputation calculations

3. Implementation:
   - Store completed job count, rating sum, rating count on-chain
   - Calculate average rating and badge tier in contract
   - Display badges with LitRPG styling (glowing icons)

### Test and commit

- Verify badge tier calculation at each threshold
- Test rating average after multiple jobs
- Commit: `feat: add freelancer reputation system with badges`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #42`

---

## Issue #43: Multi-Signature Escrow (Approval Gate)

**Complexity: 200 Points**

### Description
Add multi-signature support to escrow jobs. Require approval from 2-of-3 signers (client, arbiter, freelancer) before funds release for high-value jobs.

### Requirements and context

**Why this matters:**  
High-value jobs need extra security. Multi-sig ensures no single party can unilaterally release funds, reducing fraud risk and building trust in the protocol.

**What "done" looks like:**
- Smart contract: Support `required_approvers` field in Escrow struct
- Allow jobs to specify 2-of-3 multi-sig requirement
- Implement approval tracking and threshold checks
- Frontend: Show approval status for multi-sig jobs (e.g., "1 of 2 approved")
- Update job creation flow to optionally enable multi-sig
- E2E tests for multi-sig approval scenarios
- Accessible UI for approval flow

**Design constraints:**
- Multi-sig is opt-in (standard jobs don't require it)
- Approval timeout: 30 days or job is refunded to client
- Each signer can approve only once
- Arbitrary authority (third-party arbiter) must be set at job creation

### Suggested execution

1. Fork and create: `git checkout -b feature/multisig-escrow`
2. Files to touch:
   - `contracts/src/lib.rs` — add `MultiSigConfig` and approval logic
   - `frontend/src/components/MultiSigApprovalUI.tsx` — approval status/actions
   - `frontend/src/hooks/useMultiSigApproval.ts` — approval state
   - `contracts/src/test.rs` — comprehensive multi-sig tests

3. Implementation:
   - Track approvals as a map of `{signer: approved_at}`
   - Check threshold when release is attempted
   - Emit event when threshold is reached

### Test and commit

- Test 1-of-3, 2-of-3 scenarios
- Test approval timeout (refund after 30 days)
- Test duplicate approval attempts (should fail)
- Commit: `feat: add multi-signature escrow approval gate`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #43`

---

## Issue #44: Dispute Resolution & Arbitration UI

**Complexity: 150 Points**

### Description
Build a dispute UI where clients can initiate refund claims, freelancers can respond, and arbiters (if multi-sig) can resolve conflicts.

### Requirements and context

**Why this matters:**  
A transparent dispute flow gives users confidence that conflicts will be fairly resolved. It also reduces on-chain disputes by providing a clear, documented process.

**What "done" looks like:**
- React component for initiating disputes (form with reason, evidence upload placeholder)
- Display dispute status on job details page
- Timeline view showing: opened → responded → resolved
- Arbiter panel for reviewing disputes and voting to resolve
- Status badges: "Dispute Pending", "Arbiter Review", "Resolved"
- TypeScript-typed dispute data structure
- Demo showing full dispute lifecycle

**Design constraints:**
- Dispute can only be opened within 7 days of job approval
- Evidence field is text-based (file upload is future work)
- Arbiter must respond within 14 days or refund goes to freelancer
- Final decision is immutable

### Suggested execution

1. Fork and create: `git checkout -b feature/dispute-resolution-ui`
2. Files to touch:
   - `frontend/src/components/DisputeForm.tsx` — initiate dispute
   - `frontend/src/components/DisputeTimeline.tsx` — show dispute history
   - `frontend/src/components/ArbiterPanel.tsx` — arbiter review interface
   - `frontend/src/types/index.ts` — add `Dispute`, `DisputeStatus` types
   - `frontend/src/app/page.tsx` — demo

3. Implementation:
   - Use modal for dispute initiation
   - Timeline component with status badges
   - Connect to mock dispute data (contract calls come later)

### Test and commit

- Verify dispute form validation (reason required, min length)
- Test timeline rendering with various statuses
- Test mobile responsiveness of timeline
- Commit: `feat: build dispute resolution and arbitration UI`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #44`

---

## Issue #45: Social Features – Leaderboards & Achievement Badges

**Complexity: 150 Points**

### Description
Add a leaderboard showing top freelancers and top-earning vault participants, plus an achievements system with visual badges and social sharing.

### Requirements and context

**Why this matters:**  
Gamification drives engagement. Leaderboards create friendly competition, and achievements give users milestones to celebrate and share, increasing community participation.

**What "done" looks like:**
- Freelancer leaderboard: sorted by earnings, completion rate, or reputation
- Vault participant leaderboard: sorted by wins, total yield earned
- Achievement types: "First Win", "10 Jobs Completed", "Million XLM Wagered", etc.
- Achievement cards with unlock criteria and visual icons
- "Share Achievement" button that generates a social-shareable link/image
- Fully responsive leaderboard tables with pagination
- TypeScript-typed achievement data

**Design constraints:**
- Leaderboard refreshes every hour (no real-time)
- Top 100 visible on main leaderboard
- Achievements are client-side calculated from on-chain data
- Social share generates a simple image with badge + username

### Suggested execution

1. Fork and create: `git checkout -b feature/leaderboards-achievements`
2. Files to touch:
   - `frontend/src/components/Leaderboard.tsx` — leaderboard table
   - `frontend/src/components/AchievementCard.tsx` — achievement display
   - `frontend/src/lib/achievements.ts` — achievement definitions and logic
   - `frontend/src/app/page.tsx` — demo
   - `frontend/src/types/index.ts` — `Achievement`, `LeaderboardEntry` types

3. Implementation:
   - Pull mock leaderboard data (real contract data later)
   - Define achievement criteria as functions
   - Generate share images with Canvas API

### Test and commit

- Verify leaderboard sorting (multiple columns)
- Test achievement unlock conditions with mock data
- Test social share image generation
- Commit: `feat: add leaderboards and achievement system`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #45`

---

## Issue #46: Freelancer Job Specialization Tags & Filtering

**Complexity: 100 Points**

### Description
Add specialization tags (Frontend, Smart Contracts, DevOps, Writing, etc.) to freelancer profiles. Allow clients to filter job applicants by specialization.

### Requirements and context

**Why this matters:**  
Job matching improves when clients can find specialists. This increases quality of hires and reduces back-and-forth on mismatched skill sets.

**What "done" looks like:**
- Freelancer can add up to 5 specialization tags from a predefined list
- Tags displayed on freelancer profile with visual badges
- Client can filter job applicants by tag
- UI for adding/removing tags (tag management page)
- Search/autocomplete for tag selection
- TypeScript types for specialization system

**Design constraints:**
- Predefined list of ~20 tags (no custom tags initially)
- Tags are immutable once added (can be removed, then re-added)
- Filter shows freelancers matching ANY selected tag (OR logic)
- Mobile-friendly tag selection

### Suggested execution

1. Fork and create: `git checkout -b feature/freelancer-specialization-tags`
2. Files to touch:
   - `frontend/src/components/SpecializationTagSelector.tsx` — tag picker
   - `frontend/src/components/FreelancerFilter.tsx` — client-side filter UI
   - `frontend/src/lib/specializations.ts` — list of predefined tags
   - `frontend/src/types/index.ts` — `Specialization` type
   - `frontend/src/app/page.tsx` — demo

3. Implementation:
   - Define specialization constants
   - Tag selector with checkboxes
   - Filter logic on client side (or mock API later)

### Test and commit

- Verify tag selection/deselection works
- Test filter shows correct freelancers
- Test tag display on profile
- Commit: `feat: add freelancer specialization tags and filtering`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #46`

---

## Summary: Batch 5 (Advanced Features)

| Issue | Title | Points |
|-------|-------|--------|
| #41 | Tiered Yield Pools | 200 |
| #42 | Freelancer Reputation System | 200 |
| #43 | Multi-Signature Escrow | 200 |
| #44 | Dispute Resolution UI | 150 |
| #45 | Leaderboards & Achievements | 150 |
| #46 | Freelancer Specialization Tags | 100 |

**Batch 5 Total: 1,000 Points** (6 issues)

---

