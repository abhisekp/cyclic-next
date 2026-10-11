# cyclic-next

[![npm](https://img.shields.io/npm/v/cyclic-next.svg)](https://www.npmjs.com/package/cyclic-next)
[![CI](https://github.com/abhisekp/cyclic-next/actions/workflows/ci.yml/badge.svg)](https://github.com/abhisekp/cyclic-next/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fabhisekp%2Fcyclic-next.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fabhisekp%2Fcyclic-next?ref=badge_shield)

**Move to the next index. Reach the end. Start again.**

A tiny, dependency-free JavaScript function for image carousels, repeating schedules, game turns, and round-robin queues. A cycle with five positions uses indexes **0–4**: after 4 comes 0.

**[Try the interactive playground →](https://abhisekp.github.io/cyclic-next/)** · [API](#api) · [Examples](#practical-examples) · [Release setup](#automatic-releases)

```sh
npm install cyclic-next
```

```js
// The callable CommonJS API from npm v1.0.1 is preserved.
const cyclicNext = require('cyclic-next');
cyclicNext(5, 4);    // 0
cyclicNext(5, 4, 3); // 2

// The repository's named API is supported too.
const { cyclicNext: next } = require('cyclic-next');
next(5, 0); // 1
```

With an ES module aware bundler:

```js
import cyclicNext, { cyclicNext as next } from 'cyclic-next';
cyclicNext(5, 4); // 0
next(5, 4, 3);   // 2
```

Native Node ES modules can import the explicit `.mjs` entry:

```js
import cyclicNext, { cyclicNext as next } from 'cyclic-next/dist/cyclic-next.mjs';
```

For a browser without a build step, pin a published version and load the UMD bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/cyclic-next@1.1.0/dist/cyclic-next.umd.js"></script>
<script>
  const { cyclicNext } = window.cyclicNext;
  console.log(cyclicNext(5, 4)); // 0
</script>
```

Browser URLs are available after their version is published. TypeScript declarations ship with the package. Runtime support remains **Node 4+**; building and developing the repository requires **Node 22.13+ or 24+** and npm.

## API

```text
cyclicNext(max: number, curr: number = 0, inc: number = 1): number
```

| Parameter | Meaning | Default |
| --- | --- | --- |
| `max` | Exclusive upper bound: the number of positions, not the last index | Required |
| `curr` | Current position | `0` |
| `inc` | Step size | `1` |

Returns `(curr + inc) % max`. For indexing arrays, use a positive integer `max` and non-negative integer positions and steps.

```js
cyclicNext(5);       // 1
cyclicNext(5, 0);    // 1
cyclicNext(5, 1);    // 2
cyclicNext(5, 2);    // 3
cyclicNext(5, 3);    // 4
cyclicNext(5, 4);    // 0
cyclicNext(5, 4, 3); // 2
cyclicNext(5, 2, 0); // 2
```

### Compatibility and edge cases

v1 deliberately preserves JavaScript **remainder** semantics and the published v1.0.1 behavior. It does not validate, clamp, or normalize inputs:

```js
cyclicNext(5, 0, -1); // -1, not 4
cyclicNext(0, 2);     // NaN
cyclicNext(5, 0.5);   // 1.5
cyclicNext(5, undefined, undefined); // 1
```

Guard empty arrays before indexing. To move backward with a non-negative index, use a positive equivalent step: `cyclicNext(5, 0, 4)` returns `4`. Negative zero, `NaN`, infinities, and JavaScript coercion behavior remain unchanged. The callable default, named export, existing `dist` paths, and published `lib/index.js` path remain available; there is no restrictive `exports` map.

## Practical examples

### Image carousel

```js
const cyclicNext = require('cyclic-next');
const slides = ['mountains.jpg', 'ocean.jpg', 'city.jpg'];
let index = 0;

function nextSlide() {
  if (!slides.length) return undefined;
  index = cyclicNext(slides.length, index);
  return slides[index];
}

nextSlide(); // 'ocean.jpg'
nextSlide(); // 'city.jpg'
nextSlide(); // 'mountains.jpg'
```

### Repeating weekday schedule

```js
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
days[cyclicNext(days.length, 6)];    // 'Mon': the day after Sunday
days[cyclicNext(days.length, 4, 3)]; // 'Mon': three days after Friday
```

### Round-robin turns

```js
const players = ['Ada', 'Lin', 'Sam'];
let turn = 0;
function nextPlayer() {
  if (!players.length) return undefined;
  turn = cyclicNext(players.length, turn);
  return players[turn];
}
nextPlayer(); // 'Lin'
nextPlayer(); // 'Sam'
nextPlayer(); // 'Ada'
```

## Development

```sh
npm ci
npm run validate
npm run dev
# Open http://127.0.0.1:4173
```

Validation includes linting, all original examples, 4,924 differential assertions against the published v1 behavior, a 100% coverage gate on the distributed core, browser-bundle checks, release-policy tests, TypeScript consumers, and installation from an actual npm tarball. GitHub Actions runs validation on Linux and Windows with Node 22 and 24, and runtime compatibility on Node 0.12, 4, 6, 8, 10, 12, 14, 16, 18, and 20. Old runtimes consume the prebuilt package; they do not run the development tools.

The playground runs the same UMD bundle that npm receives. Its ring is keyboard accessible, offers step and auto-play controls, three recipes, light/dark themes, and copyable snippets. All assets are local, so it works offline after loading. Its 1–24 cycle-size limit only applies to the visualization.

## Automatic releases

GitHub Actions replaces Travis CI. [publish.yml](.github/workflows/publish.yml) runs the full CI checks before publishing a **new version** pushed to a release branch. It uses npm trusted publishing (OIDC), with no stored npm token, then creates a GitHub release at the exact published commit. A version already present on npm is skipped; registry errors fail the release.

Configure the package's **Settings → Trusted Publisher** on npm ([package access page](https://www.npmjs.com/package/cyclic-next/access)):

| Setting | Value |
| --- | --- |
| Publisher | GitHub Actions |
| Organization or user | `abhisekp` |
| Repository | `cyclic-next` |
| Workflow filename | `publish.yml` (filename only) |
| Environment name | `npm` |
| Allowed actions | Enable **direct `npm publish`** for automatic release |

The workflow uses a GitHub-hosted runner, Node 24, npm 11.19.1, and `id-token: write`. Create the GitHub `npm` environment and allow only `master`, `1.x`, and `2.x` release branches; required reviewers are optional if you want unattended releases. Finish a first publication within the npm configuration's two-day activation window. After verifying OIDC publication, select **Require two-factor authentication and disallow tokens** in npm publishing access. OIDC remains supported with that setting. See [npm's trusted publishing instructions](https://docs.npmjs.com/trusted-publishers/).

To release a follow-up, update the package version and lockfile together (`npm version patch` or `npm version minor`), review the change, and push it to the appropriate release branch. CI publishes it automatically. **Do not** reuse an existing version or tag. A failed publish can be retried with the workflow's **Run workflow** button on the same release branch after fixing the cause.

### Maintaining v1 and a future v2 together

This upgrade stays on **v1**. No breaking v2 release is needed. Future breaking work must first preserve a `1.x` branch, then develop/release v2 on `2.x`:

| Branch | Required version | npm dist-tag |
| --- | --- | --- |
| `master` | `1.*` | `latest` (current release line) |
| `1.x` | `1.*` | `v1-latest` |
| `2.x` | `2.*` | `latest` |

When v2 becomes `latest`, stop releasing from `master`; use `1.x` for v1 fixes and `2.x` for v2 fixes. Both reuse the same publisher workflow and environment. Install `cyclic-next@1` or `cyclic-next@v1-latest` to stay on v1. The release policy rejects mismatched majors and feature branches.

## GitHub Pages

In repository **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**. [pages.yml](.github/workflows/pages.yml) validates and deploys `_site` from `master` to [abhisekp.github.io/cyclic-next](https://abhisekp.github.io/cyclic-next/). Pull requests produce a downloadable preview artifact in CI. Source files live in `docs/`; the old hand-maintained `gh-pages` content is replaced by the workflow deployment.

## Issues and pull requests

See [the maintenance review](MAINTENANCE.md) for the issue resolutions and a per-branch review of the legacy dependency PR backlog. Weekly grouped Dependabot updates now cover npm development tools and pinned GitHub Actions. Security alerts are addressed by upgrading or removing the affected tooling and checking the complete lockfile.

## Contributing and license

Open an issue or a pull request with a reproducible example. Keep v1 runtime behavior compatible and run `npm run validate` before submitting. MIT © [Abhisek Pattnaik](https://github.com/abhisekp); see [LICENSE](LICENSE).

The external FOSSA license report covers repository dependencies, including development tooling. The report badge identifies the analyzed commit; GitHub Actions validates the package separately. The published package has no runtime dependencies.

[![FOSSA license report](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fabhisekp%2Fcyclic-next.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fabhisekp%2Fcyclic-next?ref=badge_large)
