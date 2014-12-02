nightmare-uber
=================

[Nightmare](https://github.com/segmentio/nightmare) plugin for m.Uber.com

#### .login(email, password)

Login to Uber. Note that this must be called first.

#### .select(type)

Select the type of Uber: `uberpool`, `uberx`, `uberxl`, `blackcar`, `suv`, `taxi`. Note the type is a case insensitive string. Note that this should be called before the other functions, as you aren't able to change this option after `.setPickup()` or `.setDropoff()` are called.

#### .setPickup(location)

Set the pick up location. The `location` can either be an object with `lat` and `lng` properties (each a float value) or a string of an address. If `lat` and `lng` are passed, they will be resolved to an address via reverse geocoding.

This must be called prior to `.setDropoff()`.

#### .setDropoff(location)

Set the drop off location with similar methods applied in `.setPickup()`.

#### .getFare(cb)

Get fare estimates. Assumes that both `setPickup()` and `setDropoff()` have been called. Callback expression is `cb(fare)`.

#### .call()

Call the car. Note that `.setPickup()` must have been called; if you selected `uberpool`, then `.setDropoff()` must also have been called.

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

