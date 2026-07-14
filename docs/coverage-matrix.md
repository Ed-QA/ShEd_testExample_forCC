# Coverage Matrix

| Area | Requirement / Risk | Test Type | Covered By | Priority |
|---|---|---|---|---|
| Full user flow | Register, login, browse, add to cart, checkout path | E2E | `tests/e2e/full-user-journey.spec.ts` | Critical |
| Registration | Required fields, invalid email/password, successful unique user | UI | `tests/auth/registration.spec.ts` | High |
| Login | Required fields, invalid credentials, generated account login | UI | `tests/auth/login.spec.ts` | High |
| Product listing | Product grid loads and searchable content is visible | UI + API | `tests/catalog/catalog.spec.ts` | High |
| Product detail | Listing-to-detail navigation and product information | UI | `tests/catalog/product-detail.spec.ts` | High |
| Cart | Add product, remove product, empty state, reload behavior | UI | `tests/cart/cart.spec.ts` | Critical |
| Guest checkout | Guest can proceed through checkout form gates | UI | `tests/checkout/guest-checkout.spec.ts` | High |
| Billing address | Required billing fields and valid address entry | UI | `tests/checkout/guest-checkout.spec.ts` | High |
| Payment | Payment method dropdown and method-specific fields | UI | `tests/checkout/payment-validation.spec.ts` | High |
| API products | Products list, product detail, and search contract | API | `tests/api/api-contract.spec.ts` | High |
| API taxonomy | Category tree and brands contract | API | `tests/api/api-contract.spec.ts` | Medium |
| Validation/errors | Required fields and malformed input errors | UI | `tests/auth/*.spec.ts`, `tests/checkout/*.spec.ts` | High |
| Language selector | Language switch does not break navigation | UI | `tests/catalog/language.spec.ts` | Medium |
| All main pages | Main routes render visible content | Smoke | `tests/smoke/all-pages.smoke.spec.ts` | Medium |
| Browser/device sanity | Core UI visible/clickable in desktop/mobile/tablet projects | Smoke | `tests/smoke/*.spec.ts` | Medium |
| Failure evidence | Screenshots, traces, video, JSON, HTML report | Tooling | `playwright.config.ts` | High |
