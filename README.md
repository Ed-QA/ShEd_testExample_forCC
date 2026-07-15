# ShEdSQA Automation test example

Playwright + TypeScript QA automation example. The project is structured as a SQA portfolio sample: page models, API checks, a coverage matrix, parallel execution, cross-browser/responsive smoke coverage, Playwright report.

## Possible Future Improvements

| Possible Improvement | When It Helps | Value |
|---|---|---|
| API smoke checks | Before UI flows depend on backend data | Confirms required test data and key endpoints are available. |
| Passive ZAP scan | After main UI flows are stable | Adds basic security/configuration visibility. |
| k6 smoke load test | After critical flows are automated | Tracks response times and failure rate under light traffic. |
| Grafana dashboard | When performance checks run repeatedly | Makes trends easier to compare over time. |

## Structure

| Path | Purpose |
|---|---|
| `src/pages` | Page models and reusable UI actions |
| `src/api` | API helper used to support UI tests |
| `src/fixtures` | Test data, payment data, issue collector |
| `tests/e2e` | Full valid user journey |
| `tests/auth` | Registration, login, validation |
| `tests/catalog` | Search, filters, language, product detail |
| `tests/cart` | Add, remove, reload/persistence checks |
| `tests/checkout` | Guest checkout, billing, payment validation |
| `tests/api` | API status/schema/search contract checks |
| `tests/smoke` | Cross-browser/responsive page visibility checks |
| `docs/coverage-matrix.md` | Requirement/risk coverage table |
| `docs/locator-strategy.md` | Locator choices and Playwright guidance |

## Run

```powershell
npm test
npm run test:chrome
npm run test:headed
npm run test:smoke
npm run test:responsive
npm run test:intentional-fails
npm run report
```

`tests/intentional-fails` is included in the normal full run on purpose. It intentionally fails three tests to demonstrate that Playwright continues running the rest of the suite and saves readable failure messages, screenshots, traces, videos, and error context. Use the focused scripts such as `test:chrome`, `test:smoke`, or `test:responsive` when you want only the passing functional/smoke layers.

Playwright creates isolated browser contexts by default, so tests run with fresh browser state unless a test explicitly reuses state inside its own flow.

## Evidence

Failures are visible in the Playwright HTML report. The configuration keeps:

- screenshots on failure
- traces on failure
- videos on failure
- JSON result output
- step-by-step HTML report

