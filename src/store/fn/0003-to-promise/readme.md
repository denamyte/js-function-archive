# `toPromise` function

Function `toPromise` accepts an initial function and returns a wrapper function.
The wrapper function receives `args` and returns a Promise which resolves by
calling the initial function with `args` arguments.
