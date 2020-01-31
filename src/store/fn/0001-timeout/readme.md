# `timeout` function

Function `timeout` creates a wrapper over another function.
At the moment of the wrapper creation a timer is started.
If you call the wrapped function within the set period of time,
the initial function will be called, later - not.
