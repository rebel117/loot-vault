# 🔗 Batch 2: Web3 Integration (Contract Bindings)

**Focus:** Create a robust abstraction layer over Stellar SDK contract bindings, making it easy for frontend developers to interact with Soroban contracts through type-safe, reusable utilities and React hooks.

**Total Issues:** 10  
**Total Points:** 1,500  
**Batch Status:** Ready

---

## Issue 1: Contract Types Export & Organization

**Points:** 100  
**Complexity:** Beginner  
**Labels:** `drips-wave`, `web3-integration`, `typescript`, `100-points`

**Objective:**  
Create a centralized TypeScript module that exports and organizes all types from the generated Soroban contract bindings. This serves as the single source of truth for contract-related types across the frontend.

**Requirements:**
- Export types from `frontend/src/contracts/loot_vault/src/index.ts` into a new file: `frontend/src/lib/types/lootVaultTypes.ts`
- Export types from `frontend/src/contracts/mercenary_board/src/index.ts` into: `frontend/src/lib/types/mercenaryBoardTypes.ts`
- Create `frontend/src/lib/types/index.ts` that aggregates and re-exports both contract type files
- Add JSDoc comments explaining each major type's purpose
- Ensure no circular dependencies

**Implementation Guidelines:**
- Use TypeScript's `export type` for type-only exports
- Organize exports alphabetically for readability
- Keep type organization in sync with contract source structure

**Testing:**
- TypeScript compilation passes with `npm run type-check`
- All exported types are used correctly in at least one location
- No unused type exports

**Definition of Done:**
- PR includes updated types index and all re-exports
- Type-checking passes
- No console warnings or linting errors

---

## Issue 2: useVaultContract Hook (Loot Vault)

**Points:** 150  
**Complexity:** Intermediate  
**Labels:** `drips-wave`, `web3-integration`, `react-hooks`, `150-points`

**Objective:**  
Create a custom React hook that abstracts all Loot Vault contract operations (deposit, check balance, get winner, claim yield). This hook manages contract client initialization, transaction state, and error handling.

**Requirements:**
- Hook signature: `useVaultContract(networkPassphrase?: string, rpcUrl?: string)`
- Methods on returned object:
  - `deposit(amount: bigint): Promise<Transaction>`
  - `getBalance(userAddress: string): Promise<bigint>`
  - `getCurrentYield(): Promise<bigint>`
  - `getLastWinner(): Promise<string | null>`
  - `claimYield(): Promise<Transaction>`
- Handle loading/error states internally
- Contract errors should be caught and re-thrown with human-readable messages
- Automatically reconnect on network failure (up to 3 retries)

**Implementation Guidelines:**
- Use `useEffect` for contract client initialization
- Memoize contract client to avoid unnecessary re-initialization
- Return object shape: `{ methods: { deposit, ... }, loading: bool, error: Error | null, isConnected: bool }`

**Testing:**
- Hook initializes correctly with custom network params
- Each method returns expected types
- Error messages are user-friendly
- Retry logic works on network errors

**Definition of Done:**
- Hook is documented with JSDoc
- Storybook story exists showing hook usage
- No TypeScript errors

---

## Issue 3: useMercenaryBoard Hook (Mercenary Board)

**Points:** 150  
**Complexity:** Intermediate  
**Labels:** `drips-wave`, `web3-integration`, `react-hooks`, `150-points`

**Objective:**  
Create a custom React hook that abstracts Mercenary Board contract operations (post job, submit work, release funds, dispute). Mirrors the pattern of `useVaultContract` for consistency.

**Requirements:**
- Hook signature: `useMercenaryBoard(networkPassphrase?: string, rpcUrl?: string)`
- Methods on returned object:
  - `postJob(title: string, description: string, bounty: bigint, milestones: Milestone[]): Promise<Transaction>`
  - `submitWork(jobId: string, evidence: string): Promise<Transaction>`
  - `releaseFunds(jobId: string, milestoneIndex: number): Promise<Transaction>`
  - `disputeJob(jobId: string, reason: string): Promise<Transaction>`
  - `getJobDetails(jobId: string): Promise<Job>`
  - `getFreelancerJobs(freelancerAddress: string): Promise<Job[]>`
- Return object shape matches `useVaultContract` pattern for consistency
- Implement retry logic and error handling like Vault hook

**Implementation Guidelines:**
- Reuse error handling patterns from `useVaultContract`
- Type all Milestone and Job structures from contract bindings
- Validate input parameters before submitting transactions

**Testing:**
- Hook initializes and fetches job details
- All CRUD operations work correctly
- Error handling for invalid jobId, insufficient permissions, etc.
- Output types match contract bindings

**Definition of Done:**
- Hook documented with JSDoc
- Storybook story provided
- No TypeScript or linting errors

---

## Issue 4: Contract Event Listener Utility

**Points:** 150  
**Complexity:** Intermediate  
**Labels:** `drips-wave`, `web3-integration`, `events`, `150-points`

**Objective:**  
Create a utility module that subscribes to real-time events emitted by Soroban contracts (e.g., YieldClaimed, JobCompleted, DisputeRaised). Events should be filterable and provide callbacks for UI updates.

**Requirements:**
- Export function: `subscribeToContractEvents(eventTypes: string[], callback: (event: ContractEvent) => void, unsubscribe?: () => void)`
- Support filtering by event type (e.g., `['YieldClaimed', 'JobCompleted']`)
- Handle connection to Stellar event stream
- Include automatic reconnection on disconnect
- Provide unsubscribe function to cleanup listeners
- Events include: timestamp, contract, event type, data

**Implementation Guidelines:**
- Use Stellar SDK's event stream API or polling fallback
- Debounce frequent events to avoid callback spam
- Type events based on contract bindings

**Testing:**
- Listener connects and receives events
- Callbacks fire with correct data
- Unsubscribe stops events
- Reconnection works after network drop

**Definition of Done:**
- Utility exported from `frontend/src/lib/contracts/`
- Example usage in Storybook
- No unhandled promise rejections

---

## Issue 5: Transaction Signer & Submitter Utility

**Points:** 150  
**Complexity:** Intermediate  
**Labels:** `drips-wave`, `web3-integration`, `transactions`, `150-points`

**Objective:**  
Create a utility that signs transactions with Freighter wallet and submits them to the Stellar network. Handle signing errors, submission confirmations, and timeout scenarios gracefully.

**Requirements:**
- Export function: `signAndSubmitTransaction(transactionBuilder: TransactionBuilder, waitsFor?: Horizon.TransactionRecord): Promise<{ txHash: string, status: string }>`
- Integrate with Freighter wallet (`window.freighterApi`)
- Check wallet connection before signing
- Timeout after 30 seconds if transaction not confirmed
- Provide detailed error messages (wallet locked, user rejected, insufficient balance, etc.)
- Return transaction hash and confirmation status

**Implementation Guidelines:**
- Validate TransactionBuilder before sending to Freighter
- Use Horizon API to poll for transaction confirmation
- Clear user-facing error messages

**Testing:**
- Signs transactions successfully with Freighter
- Handles wallet rejection gracefully
- Timeout and network error scenarios work
- Transaction hash returned correctly

**Definition of Done:**
- Utility is well-documented
- Error handling covers all major scenarios
- Works with both Loot Vault and Mercenary Board transactions

---

## Issue 6: Contract Error Handler & Response Parser

**Points:** 100  
**Complexity:** Beginner  
**Labels:** `drips-wave`, `web3-integration`, `error-handling`, `100-points`

**Objective:**  
Create a centralized error handler that parses Soroban contract errors and network errors, converting them into human-readable messages for display in the UI.

**Requirements:**
- Export function: `parseContractError(error: unknown): { code: string, message: string, recoverable: boolean }`
- Handle Soroban contract-specific error codes (e.g., `InsufficientBalance`, `Unauthorized`, `InvalidInput`)
- Handle Horizon/network errors
- Return `recoverable: true` for transient errors, `false` for permanent ones
- Provide i18n-ready message strings (no hardcoded UI text)

**Implementation Guidelines:**
- Map Soroban error codes to user-friendly descriptions
- Include error code in returned object for logging
- Add JSDoc with examples of each error type

**Testing:**
- Correctly parses known contract errors
- Falls back gracefully on unknown errors
- Distinguishes recoverable vs. permanent errors
- No thrown exceptions

**Definition of Done:**
- Exported from `frontend/src/lib/contracts/`
- Unit tests cover all major error types
- Used by both hooks

---

## Issue 7: Contract State Query Layer with Caching

**Points:** 150  
**Complexity:** Intermediate  
**Labels:** `drips-wave`, `web3-integration`, `caching`, `150-points`

**Objective:**  
Create a query layer that fetches and caches contract state (vault details, job listings, user balances). Implement cache invalidation strategies and background refresh.

**Requirements:**
- Export functions:
  - `queryVaultState(): Promise<VaultState>` (caches for 30 seconds)
  - `queryJobsByUser(address: string): Promise<Job[]>` (caches for 60 seconds)
  - `invalidateCache(key?: string): void`
- Cache key: contract address + query params
- Stale cache: serve stale data while refreshing in background
- Export hook: `useContractState(query: QueryType, params?: any)` that integrates caching with React
- Monitor cache hit/miss rates in console (dev mode only)

**Implementation Guidelines:**
- Use a simple in-memory Map for caching
- Separate cache keys for different queries
- Provide manual invalidation for UI updates

**Testing:**
- Queries return correct types
- Cache serves data within TTL
- Background refresh happens correctly
- Manual invalidation clears cache

**Definition of Done:**
- Caching layer documented
- React hook works in components
- Performance improvement measurable (hit rates logged)

---

## Issue 8: Wallet Balance Fetcher

**Points:** 100  
**Complexity:** Beginner  
**Labels:** `drips-wave`, `web3-integration`, `wallet`, `100-points`

**Objective:**  
Create a utility to fetch the connected user's XLM balance from the Stellar network using Freighter and Horizon API.

**Requirements:**
- Export function: `getWalletBalance(publicKey: string): Promise<{ balance: string, isNative: boolean }>`
- Accept Freighter-provided public key
- Query Horizon for account data
- Return balance as string (to avoid precision loss with bigint)
- Return `isNative: true` for XLM balance
- Handle account not found (return 0 balance)
- Cache result for 10 seconds

**Implementation Guidelines:**
- Use official Stellar Horizon client
- Graceful fallback if Horizon unreachable
- JSDoc with example usage

**Testing:**
- Returns correct balance for funded account
- Returns 0 for unfunded account
- Caching works (subsequent calls within 10s don't re-fetch)
- No errors on Horizon outage

**Definition of Done:**
- Function exported and used by UI components
- Works with Testnet and Mainnet
- Error handling in place

---

## Issue 9: Contract Client Initialization Helper

**Points:** 150  
**Complexity:** Intermediate  
**Labels:** `drips-wave`, `web3-integration`, `initialization`, `150-points`

**Objective:**  
Create a helper function that initializes Soroban contract clients with the correct network settings, RPC URL, and contract addresses. Centralize contract configuration.

**Requirements:**
- Export function: `initializeContractClients(config: ContractConfig): { vault: VaultClient, mercenaryBoard: MercenaryBoardClient }`
- Support multiple networks (testnet, mainnet, custom RPC)
- Read contract addresses from environment variables
- Validate RPC URL and contract addresses on initialization
- Memoize clients to avoid re-initialization
- Export type: `ContractConfig = { network: 'testnet' | 'mainnet', rpcUrl?: string }`

**Implementation Guidelines:**
- Create config file at `frontend/src/lib/contracts/config.ts` with default settings
- Use environment variables for contract addresses
- Handle missing/invalid contract addresses gracefully
- Provide clear error messages

**Testing:**
- Initializes with testnet config
- Initializes with custom RPC URL
- Clients are memoized (same reference on second call)
- Errors on invalid config

**Definition of Done:**
- Config documented in README
- Both hooks use this helper
- No re-initialization on component remounts

---

## Issue 10: Integration Tests for Contract Bindings

**Points:** 200  
**Complexity:** Advanced  
**Labels:** `drips-wave`, `web3-integration`, `testing`, `200-points`

**Objective:**  
Write comprehensive E2E tests that verify all contract binding utilities work correctly against the actual Soroban contracts deployed to Testnet.

**Requirements:**
- Test file: `frontend/src/lib/contracts/__tests__/bindings.integration.test.ts`
- Tests cover:
  - Hook initialization with contract clients
  - All Vault operations (deposit, getBalance, claimYield, etc.)
  - All Mercenary Board operations (postJob, submitWork, releaseFunds, etc.)
  - Event listener connection and callbacks
  - Error handling for permission denied, invalid input, etc.
  - Transaction signer with Freighter (mock if needed)
  - Cache invalidation and refresh
- Use Vitest or Jest with MSW for mocking where needed
- Skip tests that require Freighter signing (mock those)
- Tests should pass against Stellar Testnet

**Implementation Guidelines:**
- Use real contract deployments on Testnet
- Mock Freighter signing; test actual contract calls
- Organize tests by hook/utility
- Each test should be independent and fast

**Testing:**
- All tests pass locally and in CI
- Coverage > 80% for contract utilities
- Tests are maintainable and well-documented

**Definition of Done:**
- Tests pass in CI pipeline
- Coverage report generated
- Documentation on running tests locally

---

## Submission Checklist

Before marking issues complete:
- [ ] Code follows TypeScript/ESLint standards
- [ ] No `any` types unless absolutely necessary
- [ ] JSDoc comments on all exported functions
- [ ] Tests pass locally and in CI
- [ ] Performance is acceptable (no slow queries/renders)
- [ ] Error messages are user-friendly
- [ ] Changes are documented in PR description
