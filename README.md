# Simple Typescript models

[![npm version](https://badge.fury.io/js/simple-ts-models.svg)](https://badge.fury.io/js/simple-ts-models) [![Build Status](https://travis-ci.org/malero/simple-ts-models.svg?branch=master)](https://travis-ci.org/malero/simple-ts-models) [![codecov](https://codecov.io/gh/malero/simple-ts-models/branch/master/graph/badge.svg)](https://codecov.io/gh/malero/simple-ts-models) [![npm](https://img.shields.io/npm/dw/simple-ts-models.svg)]()

## Installation

```
npm install simple-ts-models
```

## DataModel Usage

DataModels can be used to create simple objects that will trigger change events when any of the values change.

```
import {DataModel} from "simple-ts-models";

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

// Bind to changes on all fields
m.bind('change', () => {

});
m.foo = 100; // will call the function above
m.bar = 'bar'; // will also call the function above

m.getData(); // Will return {foo: 100, bar: 'bar'}

```


## Model Usage

Models need to be extended and have fields defined in order to set data on them. You can specify field types in the @field decorator. You can easily create your own custom field types for validating your data and implementing your own data manipulation.

```
import {Model, fields} from "simple-ts-models";

class MyModel extends Model {
    @field(fields.PositiveIntegerField)
    id: number;

    @field(fields.StringField)
    foo: string;

    @field()
    bar: any;
}

let m = new MyModel({
    id: 1 // Can set values from constructor
});

// Can set values from
m.foo = 'string value'; // Will trigger 'change' & 'change:foo' events
m.bar = [1,2,3];  // Will trigger 'change' & 'change:bar' events
m.getData(); // Returns {id: 1, foo: 'string value', bar: [1,2,3]}
```

## Collection Usage

The collection class is an extension of Javascript's built in Array class that can have methods added to it to do operations on a collection of a specific model class.


```
class ExampleModel extends Model {
    @field()
    id: number;

    @field()
    is_default: boolean;
}

class ExampleCollection extends Collection<ExampleModel> {
    getDefault: () => ExampleModel = (): ExampleModel => {
        for(const i of this) {
            if(i.is_default)
                return i;
        }
    };
}

let m1 = new ExampleModel({id: 1, is_default: false}),
    m2 = new ExampleModel({id: 2, is_default: true}),
    m3 = new ExampleModel({id: 3, is_default: false}),
    c = new ExampleCollection(m1, m2);

// Can use array methods
c.push(m3);
c.length; // Returns 3

// Use method added created in ExampleCollection
c.getDefault() === m2; // true

// Use Collection method getData to get an array of objects containing the data in each model
c.getData(); // Returns [{id: 1, is_default: false},{id: 2, is_default: true},{id: 3, is_default: false}]
```
