# Analysing the behavior of event emitter

I have an assumption that this [event emitter](./eventEmitter-3.js)
looses links in its `wrapped` field when 
- a wrapped function is invoked
and deletes itself here
```javascript
  const g = (...a) => {
    ee.remove(name, g);
    f(...a);
  };
```
- a `clear` function is invoked when there are any wrapped functions
 stored in the `wrapped` field.
 
 
 
 