import React, { useState } from 'react';
import { ATTRIBUTE_LIST } from '../consts';
import { calculateAbilityModifier } from '../utils/abilityUtils';

function AttributeRow() {
    const [attributes, setAttributes] = useState(
      ATTRIBUTE_LIST.reduce((acc, attribute) => {
        acc[attribute] = 0;
        return acc;
      }, {})
    );

  const handleAttributeChange = (attribute, value) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  return (
    <>
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attribute, index) => (
        <div key={index}>
          {attribute}: {attributes[attribute]}
          <button onClick={() => handleAttributeChange(attribute, attributes[attribute] + 1)}>
            +
          </button>
          <button onClick={() => handleAttributeChange(attribute, attributes[attribute] - 1)}>
            -
          </button>
          Ability Modifier: {calculateAbilityModifier(attributes[attribute])}
        </div>
      ))}
    </>
  );
}

export default AttributeRow;
