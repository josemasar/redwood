#!/usr/bin/env node
/**
 * A proxy for running bins via `yarn <bin>` or `yarn run <bin>`.
 *
 * @remarks
 * The ideas here was to generalize the strategy used in `./redwood.js`.
 *
 * In doing so, we're relying on two things...
 * - the name of the bin is in `process.argv`
 * - the name of the bin is the same as the name of the package
 *
 * The second assumption is sometimes correct, and can be dealt with on a case-by-case basis,
 * but it looks like the first assumption isn't.
 *
 * For example, after running `yarn eslint` or `yarn run eslint`, process.argv looks like...
 *
 * ```js
 * ```
 *
 * Basically, yarn's already substituted the bin's name for its file path
 * and we don't know which bin was run anymore.
 */
import { createRequire } from 'module'

const command = process.argv[2]

const requireFromPackage = createRequire(
  require.resolve(`${command}/package.json`)
)

const bins = requireFromPackage('./package.json')['bin']

requireFromPackage(bins[command])
