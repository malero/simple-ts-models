import {field, Field} from "../src/fields/Field";
import {Model} from "../src/Model";
import {Collection} from "../src/Collection";

class TestCollection extends Collection<TestModel> {
    getDefault: () => any = (): any => {
        for(const i of this) {
            if(i.is_default)
                return i;
        }
    };
}

class TestModel extends Model {
    static uri:string = '/api/test/:id/';
    static collectionClass = TestCollection;

    @field()
    id: number;

    @field(Field, {
        required:true
    })
    required_field:string;

    @field()
    foo: boolean;

    @field()
    name: string;

    @field()
    is_default: boolean;
}


describe('Model', () => {
    it("should throw an error when a field is required and the value is null", function() {
        const m = new TestModel();
        expect(m.validate()['required_field'].length).toBe(1);
    });

    it("should not throw an error when a field that is required value is not null", function() {
        const m = new TestModel();
        m.required_field = 'yes';
        expect(m.validate()['required_field']).toBe(undefined);
    });

    it("Should trigger a change event when any field is changed", () => {
        const m = new TestModel();
        let value = null,
            field = null;

        m.bind('change', (_field, values) => {
            field = _field;
            value = values.value;
        });

        m.required_field = 'testing';

        expect(field).toBe('required_field');
        expect(value).toBe(m.required_field);
    });

    it("Should trigger a change event when a field is changed", () => {
        const m = new TestModel({
                id: 1,
                required_field: 'yes',
                foo: true
            });

        let oldValue = null,
            oldValueCheck = null,
            value = null;

        m.bindToFields('change', [
            'required_field',
            'id'
        ], (values) => {
            oldValue = values.oldValue;
            value = values.value;
        });

        // Test to make sure id change event is being called
        oldValueCheck = m.id;
        m.id = 2;
        expect(value).toBe(m.id);
        expect(oldValue).toBe(oldValueCheck);

        // Test to make sure required_field change event is being called
        oldValueCheck = m.required_field;
        m.required_field = 'no';
        expect(value).toBe(m.required_field);
        expect(oldValue).toBe(oldValueCheck);

        // Test to make sure fields that aren't being listened to aren't
        // triggering the event
        oldValueCheck = m.foo;
        m.foo = false;
        expect(value).not.toBe(m.foo);
        expect(oldValue).not.toBe(oldValueCheck);
    });

    it("Should trigger a change:field event when any field is changed", () => {
        const m = new TestModel();
        let value = null;

        m.bind('change:required_field', (values) => {
            value = values.value;
        });

        m.required_field = 'testing';

        expect(value).toBe(m.required_field);
    });

    it("should save last data and return true with is modfied if something is modified", () => {
        const m = new TestModel({
            id: 1,
            required_field: 'required!'
        });
        m.setLastData();
        expect(m.isModified()).toBe(false);
        m.id = 2;
        expect(m.isModified()).toBe(true);
        m.setLastData();
        expect(m.isModified()).toBe(false);
        m.required_field = 'still required';
        expect(m.isModified()).toBe(true);
    });
});

describe('Collection', () => {
    it("Custom Collection", function() {
        const collection = new TestCollection();

        collection.push(new TestModel({
            name: 'Model 1',
            is_default: false
        }));

        collection.push(new TestModel({
            name: 'Model 2',
            is_default: true
        }));

        collection.push(new TestModel({
            name: 'Model 3',
            is_default: false
        }));

        collection.push(new TestModel({
            name: 'Model 4',
            is_default: false
        }));

        expect(collection.getDefault().name).toBe('Model 2');
    });
});
