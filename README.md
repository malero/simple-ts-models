# Simple Typescript models

[![Build Status](https://travis-ci.org/malero/simple-ts-models.svg?branch=master)](https://travis-ci.org/malero/simple-ts-models) [![codecov](https://codecov.io/gh/malero/simple-ts-models/branch/master/graph/badge.svg)](https://codecov.io/gh/malero/simple-ts-models)

## Installation

```
npm install simple-ts-models
```

## DataModel Usage

```

// Create a data model from a Javascript object
let m = new DataModel({
    foo: 1,
    bar: 'baz'
});

// Bind to changes once on foo field
m.once('change:foo', (value, previousValue) => {

});
m.foo = 5; // will call function above
m.foo = 3; // will not call function above

// Bind to changes on bar field
m.bind('change:bar', (value, previousValue) => {

});
m.bar = 5; // will call the function above
m.bar = 'foo'; // will also call the function above

// Bind to changes on bar field
m.bind('change', (value, previousValue) => {

});
m.foo = 100; // will call the function above
m.bar = 'bar'; // will also call the function above

```
