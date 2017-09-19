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
    key: value
});
m.once('key:change', (value, previousValue) => {

});
```
