A simple module to synchronously write files to a directory and read them back.  It's purpose is to act as a minimalist filesystem cache. The scope of this is limited to NodeJS (not the browser) and the file system (not runtime memory). 
                                                                                      
## INSTALL

    npm install --save micro-cache

## USE
Have a directory that you want to read and write to

    mkdir cache

Now implement this module in your script.  See ``test/index.js`` for full implementation.  You can pass a Bunyan logger as the second param to the new ``MicroCache``.

```JavaScript
import MicroCache from 'micro-cache';

cache = new MicroCache('./cache');

// Write and overwrite existing
cache.write('validFileName', 'Any String Will Do');

// Write only if it doesn't exist
cache.write('anotherFileName', 'More data here', true);

// Read a file
let data = cache.read('anotherFileName');
console.log(data);

// Delete a file
cache.remove('filename');
```

## DEVELOPMENT
Pull requests are welcomed, but, if you want to add features simply just use one of the other many existing node modules that do caching.  

1. Clone the repo
2. Make your changes
3. ``npm run build``
4. ``npm run test``
