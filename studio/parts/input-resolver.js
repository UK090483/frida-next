import DynamicSelect from '../componentsold/dynamic-select'

export default function resolveInput(type) {
  if (
    type.name === 'string' &&
    type.options &&
    type.options.fromField &&
    (type.options.fromFieldData || type.options.fromSubField)
  ) {
    return DynamicSelect
  }
}
