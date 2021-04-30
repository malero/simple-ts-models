import {DataModel} from "../src/DataModel";


describe('Model', () => {
    it("Should trigger a change event when any field is changed", () => {
        const m = new DataModel(['foo']);
        let value = null,
            field = null;

        m.bind('change', (_field, values) => {
            field = _field;
            value = values.value;
        });

        m.foo = 'testing';

        expect<string | null>(field).toBe('foo');
        expect(value).toBe(m.foo);
    });

    it("Should create the given fields from an object", () => {
        const m = new DataModel({
            field_1: 1,
            field_2: 'yes',
            field_3: true
        });
        expect(m.getFields().length).toBe(3);

        m.setData({field_4: 4, field_5: 5});
        expect(m.getFields().length).toBe(5);
        const data = m.getData();
        expect(data['field_1']).toBe(1);
        expect(data['field_2']).toBe('yes');
        expect(data['field_3']).toBe(true);
        expect(data['field_4']).toBe(4);
        expect(data['field_5']).toBe(5);
    });

    it("Should create the given fields from an array", () => {
        const m = new DataModel([
            'field_1',
            'field_2',
            'field_3'
        ]);
        expect(m.getFields().length).toBe(3);
    });

    it("Should trigger a change event when a field is changed", () => {
        const m = new DataModel({
                field_1: 1,
                field_2: 'yes',
                field_3: true
            });

        let oldValue = null,
            oldValueCheck = null,
            value = null;

        m.bindToFields('change', [
            'field_2',
            'field_1'
        ], (values) => {
            oldValue = values.oldValue;
            value = values.value;
        });

        // Test to make sure field_1 change event is being called
        oldValueCheck = m.field_1;
        m.field_1 = 2;
        expect(value).toBe(m.field_1);
        expect(oldValue).toBe(oldValueCheck);

        // Test to make sure field_2 change event is being called
        oldValueCheck = m.field_2;
        m.field_2 = 'no';
        expect(value).toBe(m.field_2);
        expect(oldValue).toBe(oldValueCheck);

        // Test to make sure fields that aren't being listened to aren't
        // triggering the event
        oldValueCheck = m.foo;
        m.foo = false;
        expect(value).not.toBe(m.foo);
        expect(oldValue).not.toBe(oldValueCheck);
    });

    it("Should trigger a change:field event when any field is changed", () => {
        const m = new DataModel(['field_1']);
        let value = null;

        m.bind('change:field_1', (values) => {
            value = values.value;
        });

        m.field_1 = 'testing';

        expect(value).toBe(m.field_1);
    });

    it("should save last data and return true with is modfied if something is modified", () => {
        const m = new DataModel({
            field_1: 1,
            field_2: 'foo'
        });
        m.setLastData();
        expect(m.isModified()).toBe(false);
        m.field_1 = 2;
        m.field_2 = null;
        expect(m.isModified()).toBe(true);
        m.setLastData();
        expect(m.isModified()).toBe(false);
        m.field_2 = 'bar';
        expect(m.isModified()).toBe(true);
    });

    it("should revert to last data correctly", () => {
        const m = new DataModel({
            field_1: 1,
            field_2: 'bar'
        });
        m.setLastData();
        expect(m.isModified()).toBe(false);
        m.field_1 = 2;
        m.field_2 = null;
        expect(m.isModified()).toBe(true);
        m.revert();
        expect(m.isModified()).toBe(false);
        expect(m.field_1).toBe(1);
        expect(m.field_2).toBe('bar');
    });

    it("should return the field object", () => {
        const m = new DataModel({
            field_1: 1,
            field_2: 'string field!'
        }),
            field = m.getField('field_2');
        expect(field.value).toBe('string field!');

    });
});
