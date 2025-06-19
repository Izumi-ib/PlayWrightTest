Project Architecture Guidelines (Playwright UI Automation)


📁 1. components/
Contains reusable UI components, representing parts of the UI (not entire pages).

Example: ProductCard.ts, Header.ts, FilterPanel.ts

Used inside Page Object Models

Follow the SRP (Single Responsibility Principle)

📁 2. pages/
Implements the Page Object Model (POM) for high-level page actions.

One class per page

Used directly in tests or in e2e flows

Abstracts common behaviors: navigation, actions, state

📁 3. support/
Contains test infrastructure code.

hooks/: Playwright hooks (beforeEach, afterEach), log attachments, etc.

utils/: Logger, random generators, date helpers

fixtures.ts: Custom test fixtures (if used)

📁 4. scripts/
One-time or utility scripts (e.g., preparing Allure metadata, seeding test data)

Example: prepare-allure-meta.ts

Not directly tied to test execution

📁 5. test-data/ 
Holds static test data such as product lists, mock users, or order JSONs.

Example: products.json, users.json

Useful to avoid hardcoded values in tests

📁 6. tests/
Contains all test files. Structured by features, not pages or test types.

✅ Naming convention:
Group tests by feature: auth/, products/, cart/, checkout/, recommendations/

File name should describe feature behavior, not pages:

Good: filtering.spec.ts, add-to-cart.spec.ts

Bad: homepage.spec.ts, category-page.spec.ts

✅ Test tagging:
Use tags to define test roles:
test('@smoke user can login', async () => {});
test('@regression filtering by brand works', async () => {});
test('@e2e full purchase flow', async () => {});

✅ Running tagged tests:
npx playwright test --grep @smoke
npx playwright test --grep @e2e

📁 7. tests/e2e/
Contains full user flows from start to finish.

Structure by flow:
guest-checkout.spec.ts
login-checkout.spec.ts
return-product-flow.spec.ts

Each test should be tagged with @e2e

🔥 What to AVOID:
❌ Anti-pattern	✅ Instead
Grouping tests by page	Group by feature
One big smoke.spec.ts or e2e.spec.ts	Use tags and separate flows
Naming tests like homepage.spec.ts	Use names like recommendations.spec.ts

📂 Folder activity expectations
Folder	Usage Frequency	Notes
tests/	Daily	Most active folder
pages/	Often	Update when pages change
components/	Often	Update for new UI parts
support/	Occasionally	Infrastructure, logging, etc.
scripts/	Rare	Only when needed
test-data/	Occasionally	Static mock/test data