/*
Copyright 2020 Splunk Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { wrap } from 'shimmer';

export function generateId(bits: number): string {
  const xes = 'x'.repeat(bits/4);
  return xes.replace(/x/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  });
}

export const cookieStore = {
  set: (value: string): void => { document.cookie = value; },
  get: (): string => document.cookie,
};

export function findCookieValue(cookieName: string): string | undefined {
  const decodedCookie = decodeURIComponent(cookieStore.get());
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.indexOf(cookieName + '=') === 0) {
      return c.substring((cookieName + '=').length, c.length);
    }
  }
  return undefined;
}

export function limitLen(s: string, cap: number): string {
  if (s.length > cap) {
    return s.substring(0, cap);
  } else {
    return s;
  }
}

/**
 * Get plugin config from user provided value
 *
 * @template {Object|undefined} T
 * @param value Value given by user
 * @param defaults Default value
 * @param defaultDisable If undefined by user should mean false
 */
export function getPluginConfig<T>(
  value: T | boolean | undefined,
  defaults?: T,
  defaultDisable?: T | boolean,
): false | T {
  if (value === false) {
    return value;
  }

  if (value === undefined && defaultDisable) {
    return false;
  }

  return Object.assign({}, defaults, value);
}

/**
 * Type guard that checks if value is function (and acts as user-defined type guard)
 *
 * @param value Value to check
 * @returns is function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

export function isIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

/**
 * Wrap function while keeping the toString calling the original as some frameworks
 * use it to determine if the function's native or polyfilled
 *
 * Example:
 * https://github.com/vuejs/vue/blob/0603ff695d2f41286239298210113cbe2b209e28/src/core/util/env.js#L58
 * https://github.com/vuejs/vue/blob/0603ff695d2f41286239298210113cbe2b209e28/src/core/util/next-tick.js#L42
 *
 * @param nodule Target object
 * @param name Property to patch
 * @param wrapper Wrapper
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function wrapNatively<Nodule extends Object, FieldName extends keyof Nodule>(
  nodule: Nodule,
  name: FieldName,
  wrapper: (original: Nodule[FieldName]) => Nodule[FieldName]
): void {
  const orig = nodule[name];
  wrap(nodule, name, wrapper) as unknown as CallableFunction;
  const wrapped = nodule[name];
  wrapped.toString = orig.toString.bind(orig);
}

/**
 * Get the original version of function (without all of the shimmer wrappings)
 */
export function getOriginalFunction<T extends CallableFunction>(func: T): T {
  // @ts-expect-error __original isn't mentioned in types
  while (func.__original && func.__original !== func) {
    // @ts-expect-error same
    func = func.__original as T;
  }

  return func;
}

/**
 * Wait for a variable to be set globally
 * 
 * @param {string} identifier Name of the variable (window[identifier])
 * @param {function} callback Fired when such value is available
 * @returns {function} cleanup to call in disable (in case not defined before instrumentation is disabled)
 */
export function waitForGlobal(identifier: string, callback: (value: unknown) => void): () => void {
  if (window[identifier]) {
    callback(window[identifier]);
    return () => {};
  }

  const value = window[identifier]; // most cases undefined
  let used = false;
  Object.defineProperty(window, identifier, {
    get() {
      return value;
    },
    set(newVal) {
      delete window[identifier];
      used = true;
      window[identifier] = newVal;
      callback(newVal);
    },
    configurable: true,
    enumerable: false,
  });

  return () => {
    // Don't touch if value is used or another defineProperty used it
    if (used || window[identifier] !== value) {
      return;
    }

    delete window[identifier];
    if (value !== undefined) {
      window[identifier] = value;
    }
  };
}

// See link below for regex patterns
// https://github.com/getsentry/sentry-javascript/blob/e6861cfd08addb1bd1b661067af539fec9e699f9/packages/browser/src/stack-parsers.ts#L53

// Useful link for captured error examples:
// https://github.com/csnover/TraceKit/blob/master/spec/fixtures/captured-errors.js

// This regex matches frames that have no function name (ie. are at the top level of a module).
// For example "at http://localhost:5000//script.js:1:126"
// Frames _with_ function names usually look as follows: "at commitLayoutEffects (react-dom.development.js:23426:1)"
const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;

// This regex matches all the frames that have a function name.
const chromeRegex =
    /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;

// This regex is for the eval case in the filepath. It ignores the eval portion and gets only the filepath/etc.
// Example:  (eval at <anonymous> (http://domain.com/script.js:1:11764)
const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;

// If we only care about grabbing the filepath/filename, can we simplify the above regexes? Or does that decrease the performance (as it has to search the entire string versus line by line)

// Scenarios for filepath/filenames:
//


// Returns the filepath of a string, given 1 line out of a stackframe.
export function chromeStackParserFn(line: string) {
  // This regex has 3 potential matching groups to it, first one is full match
  const noFnParts = chromeRegexNoFnName.exec(line)
  if (noFnParts) {
    // Retrieve full match, 3 matching groups?
    // Only really care about url/filepath though for our project
    // 0: full, 1: filepath, 2: line, 3: col
    // Note: filepath seems pretty generic; though it should be fine?
    const noFnFilepath = noFnParts[1]
    return noFnFilepath;
  }

  // parts should be:
  // 0: full, 1: function name, 2: filename (is it full url?), 3: line, 4: col
  // 1: captures the function name/method, also any debug info like [native code], anon fns. Address at/async are non-capturing
  // 2: Filepath/filename; can check for anon, file protocols, bundles, unix paths
  // 3/4: line/col optional
  const parts = chromeRegex.exec(line)
  if (parts) {
    // Check eval in the stackframe if it exists
    //
    const isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
    if (isEval) {
      // This regex further splits up the "eval" filepath into 4 parts
      // 0: full, 1: filepath/url, 2: line, 3: col
      const subMatch = chromeEvalRegex.exec(parts[2])
      if (subMatch) {
        parts[2] = subMatch[1];
      }
    }
    return parts[2]
  }
}


// Regex for gecko based browsers (mostly firefox). Goes line by line.
// 0: full, 1: function, (1a: noncapturing group for parameters in function), (1b: noncapturing for beginning of line or @?)
// 2: filepath (protocol, [native code] check, bundle/.js file check up to an @, unix file path check
// 3: line, 4: col,
const geckoRegex =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;

// Regex for eval portion in filepath?
// 0: full, 1: filepath, 2: linenumber
// https://example.com/app.js line 100 > eval -> https://example.com/app.js and 100
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

export function geckoStackParserFn(line: string) {
  const parts = geckoRegex.exec(line)

  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(' > eval') > -1
    if (isEval) {
      // See example of geckEvalRegex; its formatted weirdly with the < eval part at the end. In anycase, we only care about the
      // first capturing group
      const subMatch = geckoEvalRegex.exec(parts[3])

      if (subMatch) {
        parts[3] = subMatch[1]
      }
    }
  }
  return parts[3]
}

// Skipping opera 10/11 and below; old browsers from 2009
// Opera 15+ uses chromium v8; assume chrome regex works for that

// best practices for stack trace parsing:
// https://github.com/getsentry/sentry-javascript/blob/a8e5f593b3341f90cf9aafaaa1f6eb1e0da7545e/packages/utils/src/stacktrace.ts

// Other browsers: Safari (newer versions copy chrome style stack traces?), but w/ an exception for web-extensions???
// Need logic for deducing browser type to match w/ proper regex filter

// User Agent data (and getHighEntropyValues)
// Naive (?) approach using user agent data? Or feature detection? Tracekit just tests all regex filters 1 by 1 (until something matches the filter?)

export function computeStackTrace() {

}









