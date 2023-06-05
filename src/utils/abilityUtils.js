import { ATTRIBUTE_LIST, CLASS_LIST } from '../consts';

export function areAttributesMet(className, attributes) {
  const classAttributes = CLASS_LIST[className];

  for (const attribute in classAttributes) {
    if (attributes[attribute] < classAttributes[attribute]) {
      return false;
    }
  }

  return true;
}


export function calculateAbilityModifier(value) {
    return Math.floor((value - 10) / 2);
  }
  