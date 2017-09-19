import {field, Field} from "../src/fields/Field";
import {Model} from "../src/Model";
import {Collection} from "../src/Collection";
import {EmailField} from "../src/fields/EmailField";
import {FloatField} from "../src/fields/FloatField";
import {PositiveIntegerField} from "../src/fields/PositiveNumberField";
import {StringField} from "../src/fields/StringField";
import {BooleanField} from "../src/fields/BooleanField";

class TestCollection extends Collection<TestModel> {
    getDefault: () => any = (): any => {
        for(const i of this) {
            if(i.is_default)
                return i;
        }
    };
}

class AbstractTestModel extends Model {
    @field()
    id: number;

    @field(Field, {
        required:true
    })
    required_field:string;
}

class TestModel extends AbstractTestModel {
    static collectionClass = TestCollection;

    @field()
    foo: boolean;

    @field()
    name: string;

    @field()
    is_default: boolean;

    @field(Field, null)
    invalid_field: string;

    @field(EmailField)
    email: string;

    @field(FloatField, {
        toFixed: 3
    })
    float_field: number;

    @field(PositiveIntegerField)
    positive_integer_field: number;

    @field(StringField)
    string_field: string;

    @field(BooleanField)
    boolean_field: boolean;
}

class TestModel2 extends AbstractTestModel {
    @field()
    shouldnt_exist: boolean;
}


describe('Model', () => {
    it("should throw an error when a field is required and the value is null", function() {
        const m = new TestModel();
        expect(m.validate()['required_field'].length).toBe(1);
    });

    it("should be invalid when a field validation fails", function() {
        const m = new TestModel({
            required_field: true,
            email: 'testing'
        });
        expect(m.validate()['email'].length).toBe(1);
    });

    it("should not throw an error when a field that is required value is not null", function() {
        const m = new TestModel();
        m.required_field = 'yes';
        expect(m.validate()['required_field']).toBe(undefined);
        expect(m.hasErrors()).toBe(false);
        expect(m.errors.length).toBe(0);
        m.required_field = null;
        m.validate();
        expect(m.hasErrors()).toBe(true);
        expect(m.errors.length).toBe(1);
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
                foo: true,
                positive_integer_field: 1
            });

        let oldValue = null,
            oldValueCheck = null,
            value = null;

        m.bindToFields('change', [
            'required_field',
            'id',
            'shouldnt_exist',
            'positive_integer_field'
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

        // Test to make sure positive_integer_field change event is being called
        oldValueCheck = m.positive_integer_field;
        m.positive_integer_field = 15;
        expect(value).toBe(m.positive_integer_field);
        expect(oldValue).toBe(oldValueCheck);

        // Test to make sure fields that aren't being listened to aren't
        // triggering the event
        oldValueCheck = m.foo;
        m.foo = false;
        expect(value).not.toBe(m.foo);
        expect(oldValue).not.toBe(oldValueCheck);

        // Test to make sure fields that aren't being listened to aren't
        // triggering the event
        oldValueCheck = m.shouldnt_exist;
        m.foo = true;
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

    it("should revert to last data correctly", () => {
        const m = new TestModel({
            id: 1,
            required_field: 'required!'
        });
        m.setLastData();
        expect(m.isModified()).toBe(false);
        m.id = 2;
        m.required_field = null;
        expect(m.isModified()).toBe(true);
        m.revert();
        expect(m.isModified()).toBe(false);
        expect(m.id).toBe(1);
        expect(m.required_field).toBe('required!');
    });

    it("should return the field object", () => {
        const m = new TestModel({
            id: 1,
            required_field: 'required!'
        }),
            field = m.getField('required_field');
        expect(field.value).toBe('required!');

    });

    it("should ignore data that does not match a field", () => {
        const m = new TestModel({
            id: 1,
            required_field: 'required!'
        });
        m.setLastData();
        m.setData({
            spam: 1,
            bar: 'Baz!'
        });
        expect(m.isModified()).toBe(false);
    });

    it("should cast values to field types", () => {
        const m = new TestModel({
            float_field: '1.5111',
            positive_integer_field: '-1',
            string_field: 1,
            boolean_field: 'true'
        });
        expect(m.float_field).toBe(1.511);
        expect(m.positive_integer_field).toBe(0);
        expect(m.string_field).toBe('1');
        expect(m.boolean_field).toBe(true);
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
