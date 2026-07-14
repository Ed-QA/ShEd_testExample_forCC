# Locator Strategy

The tests follow Playwright's locator guidance:

| Locator Type | Used For | Why |
|---|---|---|
| `getByRole()` | Buttons, links, headings, navigation checks | Closest to how users and assistive technology perceive the page. |
| `getByLabel()` / `getByPlaceholder()` | Form fallback locators | Good for user-facing form controls when labels/placeholders are reliable. |
| `getByTestId()` | Stable app contracts such as checkout steps, product controls, cart fields | The app exposes `data-test` attributes, so the config maps Playwright test ids to `data-test`. |
| Short CSS with `:visible` | Wizard steps with hidden duplicate controls | Used only where the Angular wizard keeps previous/next step controls in the DOM but hidden. |

Long CSS chains and XPath are avoided because they are more likely to break when the DOM structure changes.
