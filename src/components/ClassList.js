import React, { useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST } from '../consts';
import { areAttributesMet } from '../utils/abilityUtils';

function ClassList() {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  return (
    <>
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((className, index) => (
        <div
          key={index}
          className={areAttributesMet(className, {}) ? 'class-met' : ''}
          onClick={() => handleClassClick(className)}
        >
          {className}
        </div>
      ))}

      {selectedClass && (
        <div>
          <h3>Minimum Required Statistics for {selectedClass}</h3>
          <ul>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attribute, value]) => (
              <li key={attribute}>
                {attribute}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ClassList;
