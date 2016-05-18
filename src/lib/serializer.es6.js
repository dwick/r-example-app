import Session from 'app/models/Session';

const isObject = obj => {
  return obj && typeof obj === 'object';
};

const isString = obj => {
  return obj && typeof obj === 'string';
};

const isNumber = obj => {
  return obj && typeof obj === 'number';
};

const isBoolean = obj => {
  return obj && typeof obj === 'boolean';
};

const identity = obj => {
  return obj;
};

const objectSerializer = (obj, serializer) => {
  return Object.keys(obj).reduce((o, key) => {
    o[key] = serializer(obj[key]);

    return o;
  }, {});
};

const arraySerializer = (obj, serializer) => {
  return obj.map(serializer);
}

const setSerializer = (obj, serializer) => {
  return [...obj].map(serializer);
}

class Serializer {
  constructor() {
    this.types = [];
    this.typeIndices = {};

    this.addType({
      ctor: Set,
      serialize: setSerializer,
    });

    this.addType({
      ctor: Session,
    });

    this.addType({
      ctor: Array,
      test: Array.isArray,
      serialize: arraySerializer,
      deserialize: arraySerializer,
    });

    this.addType({
      ctor: Number,
      test: isNumber,
    });

    this.addType({
      ctor: Boolean,
      test: isBoolean,
    });

    this.addType({
      ctor: String,
      test: isString,
    });

    this.addType({
      ctor: Object,
      test: isObject,
      serialize: objectSerializer,
      deserialize: objectSerializer,
    });
  }

  addType({ ctor, test, serialize, deserialize }) {
    test = test || ((obj) => {
      return obj instanceof ctor
    });
    serialize = serialize || identity;
    deserialize = deserialize || identity;

    const length = this.types.push({
      ctor,
      serialize,
      deserialize,
      test,
    });

    this.typeIndices[ctor.name] = length - 1;
  }

  findTypeDefinition(obj) {
    return this.types.find(({ test }) => { 
      return test(obj);
    });
  }

  getTypeDefinitionByName(name) {
    return this.types[this.typeIndices[name]];
  }

  serialize(obj) {
    const serializer = (obj) => {
      const type = (obj &&
        obj.constructor &&
        obj.constructor.name);
      let value;

      if (!type) {
        return obj;
      }

      const typeDefinition = this.findTypeDefinition(obj);

      return {
        _type: type,
        _value: typeDefinition.serialize(obj, serializer),
      };
    }

    return JSON.stringify(serializer(obj));
  }

  deserialize(json) {
    if (isString(json)) {
      try {
        json = JSON.parse(json);
      } catch (e) {
        console.error('deserialization failed: ' + e.message, json);
        return;
      }
    }

    const deserializer = (data) => {
      let obj;

      if (isObject(data) && data._type) {
        const typeDefinition = this.getTypeDefinitionByName(data._type);

        if (!typeDefinition) {
          console.error('unable to deserialize type: ' + data._type);
        } else {
          const { ctor, deserialize } = typeDefinition;

          return deserialize(new ctor(data._value), deserializer);
        }
      } else {
        return data;
      }
    }

    return deserializer(json);
  }
}

export default new Serializer();
