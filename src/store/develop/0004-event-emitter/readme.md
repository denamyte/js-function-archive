# Event Emitter

## API

### `on(eventName, f, timeout?): boolean`
This method creates a listener `f` on the event `eventName`. If `timeout`
parameter is set, the `f` listener remains subscribed only 
`timeout` milliseconds. It returns `true` the subscription was successful,
`false` otherwise.

### `times(eventName, f, callCount?, timeout?): boolean`
This method does the same as the `on(...)` method, but also allows
to set `callCount` - the maximum number of calls the listener `f` may
be called. When the listener `f` is called `callCount` times, it will 
be removed from subscriptions.

### `once(eventName, f, timeout?): boolean`
This method calls the `times(...)` method with the `callCount` parameter
set to 1.

### `emit(eventName, ...data?)`
This method calls all the listeners subscribed to `eventName` event 
and passes the `data` parameter as parameter list into functions being called.
 
### `remove(eventName, f): boolean`
This method removes the specified listener from the subscriptions 
to the `eventName` event. It returns `true` if the subscription is removed,
otherwise returns `false`.

### `clear(eventName?)`
This method clears either the subscription list of the `eventName` event, 
if the `eventName` specified, or all the listeners of all the events.
