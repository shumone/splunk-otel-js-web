const chromeStackTraceEval = `Error: Something went wrong
    at eval (eval at <anonymous> (http://example.com/scripts/main.js:10:20), <anonymous>:1:1)
    at Object.functionName (http://example.com/scripts/utils.js:15:25)
    at http://example.com/scripts/app.js:20:30
    at new ConstructorName (http://example.com/scripts/controller.js:25:35)
    at http://example.com/scripts/main.js:30:40`;

const chromeStackTraceAnonymous = `TypeError: undefined is not a function
    at http://example.com/js/anonymous.js:10:5
    at <anonymous>:15:10
    at Object.functionName (http://example.com/js/utils.js:20:15)
    at new ConstructorName (http://example.com/js/app.js:25:20)
    at <anonymous>:30:25`;

const chromeStackTraceNamedFunc = `ReferenceError: variable is not defined
    at functionName (http://example.com/app/entry.js:10:15)
    at anotherFunctionName (http://example.com/app/components/header.js:20:25)
    at Object.functionName (http://example.com/app/components/footer.js:30:35)
    at new ConstructorName (http://example.com/app/services/auth.js:40:45)
    at http://example.com/app/main.js:50:55`;

const chromeStackTraceAsync = `Error: Asynchronous error
    at async functionName (http://example.com/js/promises.js:10:15)
    at async anotherFunctionName (http://example.com/js/network.js:20:25)
    at async http://example.com/js/app.js:30:35
    at async new ConstructorName (http://example.com/js/services.js:40:45)
    at async http://example.com/js/utils.js:50:55`;

const chromeStackTracePromise = `Error: Promise rejected
    at Object.<anonymous> (http://example.com/js/promises.js:10:15)
    at process._tickCallback (internal/process/next_tick.js:68:7)
    at Function.processImmediate [as _immediateCallback] (timers.js:705:5)
    at http://example.com/js/app.js:20:25
    at new ConstructorName (http://example.com/js/main.js:30:35)`;

const chromeStackTraceNative = `Error: Native error
    at functionName (http://example.com/app/scripts/utils.js:10:20)
    at HTMLButtonElement.onclick (http://example.com/app/index.html:100:5)
    at Object.<anonymous> (http://example.com/app/scripts/main.js:110:10)
    at new ConstructorName (http://example.com/app/scripts/controller.js:120:15)
    at http://example.com/app/scripts/services.js:130:20`;

const chromeStackTraceInline = `Error: Inline script error
    at inlineFunction (http://example.com/:1:5)
    at http://example.com/:10:10
    at Object.<anonymous> (http://example.com/js/main.js:15:20)
    at new ConstructorName (http://example.com/js/controller.js:20:25)
    at http://example.com/js/app.js:30:30`;

const chromeStackTraceModule = `Error: Module loading error
    at __webpack_require__ (http://example.com/dist/bundle.js:10:15)
    at module.exports (http://example.com/dist/modules/auth.js:20:25)
    at Object.<anonymous> (http://example.com/dist/modules/app.js:30:35)
    at new ConstructorName (http://example.com/dist/controller.js:40:45)
    at http://example.com/dist/main.js:50:55`;

const chromeStackTraceRecursion = `RangeError: Maximum call stack size exceeded
    at recursiveFunction (http://example.com/app/scripts/recursion.js:10:20)
    at recursiveFunction (http://example.com/app/scripts/recursion.js:10:20)
    at recursiveFunction (http://example.com/app/scripts/recursion.js:10:20)
    at recursiveFunction (http://example.com/app/scripts/recursion.js:10:20)
    at recursiveFunction (http://example.com/app/scripts/recursion.js:10:20)
    at recursiveFunction (http://example.com/app/scripts/recursion.js:10:20)`;

const chromeStackTraceOtherProtocol = `Error: Testing error
    at myFunction (file://Users/user/project/app.js:12:8)
    at anotherFunction (blob:http://example.com/098f6bcd-4621-3373-8ade-4e832627b4f6:20:12)
    at Worker.myWorkerFunction (blob:http://example.com/1234abcd-5678-efgh-ijkl-9012mnopqrst:8:5)`;

const geckoStackTraceEval = `Error: Something went wrong
    @http://example.com/scripts/main.js:10:20
    @eval (eval at <anonymous>:1:1)
    functionName@http://example.com/scripts/utils.js:15:25
    @http://example.com/scripts/app.js:20:30
    ConstructorName@http://example.com/scripts/controller.js:25:35
    @http://example.com/scripts/main.js:30:40`;

const geckoStackTraceAnonymous = `TypeError: undefined is not a function
    @http://example.com/js/anonymous.js:10:5
    @<anonymous>:15:10
    functionName@http://example.com/js/utils.js:20:15
    ConstructorName@http://example.com/js/app.js:25:20
    @<anonymous>:30:25`;

const geckoStackTraceNamedFunc = `ReferenceError: variable is not defined
    functionName@http://example.com/app/entry.js:10:15
    anotherFunctionName@http://example.com/app/components/header.js:20:25
    functionName@http://example.com/app/components/footer.js:30:35
    ConstructorName@http://example.com/app/services/auth.js:40:45
    @http://example.com/app/main.js:50:55`;

const geckoStackTraceAsync = `Error: Asynchronous error
    async functionName@http://example.com/js/promises.js:10:15
    async anotherFunctionName@http://example.com/js/network.js:20:25
    async @http://example.com/js/app.js:30:35
    async ConstructorName@http://example.com/js/services.js:40:45
    async @http://example.com/js/utils.js:50:55`;

const geckoStackTracePromise = `Error: Promise rejected
    @http://example.com/js/promises.js:10:15
    @http://example.com/js/app.js:20:25
    ConstructorName@http://example.com/js/main.js:30:35
    @http://example.com/js/utils.js:40:45`;

const geckoStackTraceNative = `Error: Native error
    functionName@http://example.com/app/scripts/utils.js:10:20
    onclick@http://example.com/app/index.html:100:5
    @http://example.com/app/scripts/main.js:110:10
    ConstructorName@http://example.com/app/scripts/controller.js:120:15
    @http://example.com/app/scripts/services.js:130:20`;

const geckoStackTraceInline = `Error: Inline script error
    inlineFunction@http://example.com/:1:5
    @http://example.com/:10:10
    @http://example.com/js/main.js:15:20
    ConstructorName@http://example.com/js/controller.js:20:25
    @http://example.com/js/app.js:30:30`;

const geckoStackTraceModule = `Error: Module loading error
    __webpack_require__@http://example.com/dist/bundle.js:10:15
    module.exports@http://example.com/dist/modules/auth.js:20:25
    @http://example.com/dist/modules/app.js:30:35
    ConstructorName@http://example.com/dist/controller.js:40:45
    @http://example.com/dist/main.js:50:55`;

const geckoStackTraceRecursion = `RangeError: Maximum call stack size exceeded
    recursiveFunction@http://example.com/app/scripts/recursion.js:10:20
    recursiveFunction@http://example.com/app/scripts/recursion.js:10:20
    recursiveFunction@http://example.com/app/scripts/recursion.js:10:20
    recursiveFunction@http://example.com/app/scripts/recursion.js:10:20
    recursiveFunction@http://example.com/app/scripts/recursion.js:10:20
    recursiveFunction@http://example.com/app/scripts/recursion.js:10:20`;


const chromeStackTraceEvalExpected = [
    "http://example.com/scripts/main.js",
    "http://example.com/scripts/utils.js",
    "http://example.com/scripts/app.js",
    "http://example.com/scripts/controller.js",
];

const chromeStackTraceAnonymousExpected = [
    "http://example.com/js/anonymous.js",
    "<anonymous>",
    "http://example.com/js/utils.js",
    "http://example.com/js/app.js",
];

const chromeStackTraceNamedFuncExpected = [
    "http://example.com/app/entry.js",
    "http://example.com/app/components/header.js",
    "http://example.com/app/components/footer.js",
    "http://example.com/app/services/auth.js",
    "http://example.com/app/main.js"
];

const chromeStackTraceAsyncExpected = [
    "http://example.com/js/promises.js",
    "http://example.com/js/network.js",
    "http://example.com/js/app.js",
    "http://example.com/js/services.js",
    "http://example.com/js/utils.js"
];

const chromeStackTracePromiseExpected = [
    "http://example.com/js/promises.js",
    "internal/process/next_tick.js",
    "timers.js",
    "http://example.com/js/app.js",
    "http://example.com/js/main.js"
];

const chromeStackTraceNativeExpected = [
    "http://example.com/app/scripts/utils.js",
    "http://example.com/app/index.html",
    "http://example.com/app/scripts/main.js",
    "http://example.com/app/scripts/controller.js",
    "http://example.com/app/scripts/services.js"
];

const chromeStackTraceInlineExpected = [
    "http://example.com/",
    "http://example.com/js/main.js",
    "http://example.com/js/controller.js",
    "http://example.com/js/app.js"
];

const chromeStackTraceModuleExpected = [
    "http://example.com/dist/bundle.js",
    "http://example.com/dist/modules/auth.js",
    "http://example.com/dist/modules/app.js",
    "http://example.com/dist/controller.js",
    "http://example.com/dist/main.js"
];

const chromeStackTraceRecursionExpected = [
    "http://example.com/app/scripts/recursion.js"
];

const chromeStackTraceOtherProtocolExpected = [
    "file://Users/user/project/app.js",
    "blob:http://example.com/098f6bcd-4621-3373-8ade-4e832627b4f6",
    "blob:http://example.com/1234abcd-5678-efgh-ijkl-9012mnopqrst"
];

const geckoStackTraceEvalExpected = [
    "http://example.com/scripts/main.js",
    "http://example.com/scripts/utils.js",
    "http://example.com/scripts/app.js",
    "http://example.com/scripts/controller.js",
];

const geckoStackTraceAnonymousExpected = [
    "http://example.com/js/anonymous.js",
    "http://example.com/js/utils.js",
    "http://example.com/js/app.js"
];

const geckoStackTraceNamedFuncExpected = [
    "http://example.com/app/entry.js",
    "http://example.com/app/components/header.js",
    "http://example.com/app/components/footer.js",
    "http://example.com/app/services/auth.js",
    "http://example.com/app/main.js"
];

const geckoStackTraceAsyncExpected = [
    "http://example.com/js/promises.js",
    "http://example.com/js/network.js",
    "http://example.com/js/app.js",
    "http://example.com/js/services.js",
    "http://example.com/js/utils.js"
];

const geckoStackTracePromiseExpected = [
    "http://example.com/js/promises.js",
    "http://example.com/js/app.js",
    "http://example.com/js/main.js",
    "http://example.com/js/utils.js"
];

const geckoStackTraceNativeExpected = [
    "http://example.com/app/scripts/utils.js",
    "http://example.com/app/index.html",
    "http://example.com/app/scripts/main.js",
    "http://example.com/app/scripts/controller.js",
    "http://example.com/app/scripts/services.js"
];

const geckoStackTraceInlineExpected = [
    "http://example.com/",
    "http://example.com/js/main.js",
    "http://example.com/js/controller.js",
    "http://example.com/js/app.js"
];

const geckoStackTraceModuleExpected = [
    "http://example.com/dist/bundle.js",
    "http://example.com/dist/modules/auth.js",
    "http://example.com/dist/modules/app.js",
    "http://example.com/dist/controller.js",
    "http://example.com/dist/main.js"
];

const geckoStackTraceRecursionExpected = [
    "http://example.com/app/scripts/recursion.js"
];


const names = [
    "chromeStackTraceEval", "chromeStackTraceAnonymous", "chromeStackTraceNamedFunc", "chromeStackTraceAsync",
    "chromeStackTracePromise", "chromeStackTraceNative", "chromeStackTraceInline",
    "chromeStackTraceModule", "chromeStackTraceRecursion", "chromeStackTraceOtherProtocol",
    "geckoStackTraceEval", "geckoStackTraceAnonymous", "geckoStackTraceNamedFunc", "geckoStackTraceAsync",
    "geckoStackTracePromise", "geckoStackTraceNative", "geckoStackTraceInline",
    "geckoStackTraceModule", "geckoStackTraceRecursion"
];

const stackTraceNames = [
    chromeStackTraceEval, chromeStackTraceAnonymous, chromeStackTraceNamedFunc, chromeStackTraceAsync,
    chromeStackTracePromise, chromeStackTraceNative, chromeStackTraceInline,
    chromeStackTraceModule, chromeStackTraceRecursion, chromeStackTraceOtherProtocol,
    geckoStackTraceEval, geckoStackTraceAnonymous, geckoStackTraceNamedFunc, geckoStackTraceAsync,
    geckoStackTracePromise, geckoStackTraceNative, geckoStackTraceInline,
    geckoStackTraceModule, geckoStackTraceRecursion
];

const stackTraceExpectedNames = [
    chromeStackTraceEvalExpected, chromeStackTraceAnonymousExpected, chromeStackTraceNamedFuncExpected, chromeStackTraceAsyncExpected,
    chromeStackTracePromiseExpected, chromeStackTraceNativeExpected, chromeStackTraceInlineExpected,
    chromeStackTraceModuleExpected, chromeStackTraceRecursionExpected, chromeStackTraceOtherProtocolExpected,
    geckoStackTraceEvalExpected, geckoStackTraceAnonymousExpected, geckoStackTraceNamedFuncExpected, geckoStackTraceAsyncExpected,
    geckoStackTracePromiseExpected, geckoStackTraceNativeExpected, geckoStackTraceInlineExpected,
    geckoStackTraceModuleExpected, geckoStackTraceRecursionExpected
];

// const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
//
// const chromeRegex =
//     /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
//
// const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
//
// const geckoRegex =
//     /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
//
// const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

// function chromeStackParserFn(line) {
//     // This regex has 3 potential matching groups to it, first one is full match
//     const noFnParts = chromeRegexNoFnName.exec(line)
//     if (noFnParts) {
//         // Retrieve full match, 3 matching groups?
//         // Only really care about url/filepath though for our project
//         // 0: full, 1: filepath, 2: line, 3: col
//         // Note: filepath seems pretty generic; though it should be fine?
//         const noFnFilepath = noFnParts[1]
//         return noFnFilepath;
//     }
//
//     // parts should be:
//     // 0: full, 1: function name, 2: filename (is it full url?), 3: line, 4: col
//     // 1: captures the function name/method, also any debug info like [native code], anon fns. Address at/async are non-capturing
//     // 2: Filepath/filename; can check for anon, file protocols, bundles, unix paths
//     // 3/4: line/col optional
//     const parts = chromeRegex.exec(line)
//     if (parts) {
//         // Check eval in the stackframe if it exists
//         //
//         const isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
//         if (isEval) {
//             // This regex further splits up the "eval" filepath into 4 parts
//             // 0: full, 1: filepath/url, 2: line, 3: col
//             const subMatch = chromeEvalRegex.exec(parts[2])
//             if (subMatch) {
//                 parts[2] = subMatch[1];
//             }
//         }
//         return parts[2]
//     }
// }

// function geckoStackParserFn(line) {
//     const parts = geckoRegex.exec(line)
//
//     if (parts) {
//         const isEval = parts[3] && parts[3].indexOf(' > eval') > -1
//         if (isEval) {
//             const subMatch = geckoEvalRegex.exec(parts[3])
//
//             if (subMatch) {
//                 parts[3] = subMatch[1]
//             }
//         }
//         return parts[3]
//     }
// }


// function parseStackTrace(stack, isChrome) {
//     const filepaths = new Set();
//     const stacktrace = stack;
//     const stackFrames = stacktrace.split('\n');
//     const parsedFrames = stackFrames
//         .map(frame=> frame.trim())
//         .filter(frame => frame.length > 0)
//     parsedFrames.forEach((value, index) => {
//         let result;
//         if (isChrome) {
//             result = chromeStackParserFn(value);
//         } else {
//             result = geckoStackParserFn(value);
//         }
//         if (result) {
//             filepaths.add(result)
//         }
//     })
//     return [...filepaths];
// }
function parseStackTrace(stack) {
    const urls = new Set();
    const regex  = /(https?:\/\/[^\s]+\/[^\s:]+|\/[^\s:]+)/g;
    let match;
    while ((match = regex.exec(stack)) !== null) {
        urls.add(match[0]);
    }
    return [...urls];
}

function testStackTraceParser(stack, expected, isChrome) {
    const parsedUrls = parseStackTrace(stack, isChrome);
    const results = expected.every(url => parsedUrls.includes(url)) && parsedUrls.length === expected.length;
    if (!results) {
        console.log("failed:",  parsedUrls, expected);
    }
    return results
}

function runTests() {
    // for (let i = 0; i < 19; i++) {
    //     if (i < 10) {
    //         const chromeResult = testStackTraceParser(stackTraceNames[i], stackTraceExpectedNames[i], true);
    //         console.log(names[i] + ":", chromeResult);
    //     } else {
    //         const geckoResult = testStackTraceParser(stackTraceNames[i], stackTraceExpectedNames[i], false);
    //         console.log(names[i] + ":", geckoResult);
    //     }
    // }
    names.forEach((name, index) => {
        const result = testStackTraceParser(stackTraceNames[index], stackTraceExpectedNames[index]);
        console.log(name + ":", result)
    })
}

runTests();