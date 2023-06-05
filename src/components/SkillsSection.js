import React, { useState, useEffect } from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../consts';
import { calculateAbilityModifier } from '../utils/abilityUtils';

function SkillsSection() {
  const [skills, setSkills] = useState(
    SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = {
        points: 0,
        attributeModifier: skill.attributeModifier,
      };
      return acc;
    }, {})
  );

  const handlePointsChange = (skillName, value) => {
    const totalPoints = Object.values(skills)
      .map((skill) => skill.points)
      .reduce((total, points) => total + points, 0);

    if (totalPoints + value <= 70) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skillName]: {
          ...prevSkills[skillName],
          points: value,
        },
      }));
    } else {
      console.log('Maximum attribute points limit reached. Decrease points in other attributes.');
    }
  };

  useEffect(() => {
    // Retrieve character data from API on component mount
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{jinkal11}/character')
      .then((response) => response.json())
      .then((data) => {
        // Update skills state with retrieved data
        if (data.skills) {
          setSkills(data.skills);
        }
      })
      .catch((error) => {
        console.error('Error retrieving character data:', error);
      });
  }, []);

  const saveCharacter = () => {
    // Save character data to API when skills state changes
    const characterData = { skills };

    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{jinkal11}/character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characterData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Character data saved successfully!');
        } else {
          console.error('Failed to save character data:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error saving character data:', error);
      });
  };


  return (
    <>
      <h2>Skills</h2>
      {SKILL_LIST.map((skill, index) => {
        const { name, attributeModifier } = skill;
        const total = skills[name].points + calculateAbilityModifier(skills[name].points);

        return (
          <div key={index}>
            {name} - points: {skills[name].points}
            <button onClick={() => handlePointsChange(name, skills[name].points + 1)}>+</button>
            <button onClick={() => handlePointsChange(name, skills[name].points - 1)}>-</button>
            modifier ({attributeModifier}): {calculateAbilityModifier(skills[name].points)}
            total: {total}
          </div>
        );
      })}
      <button onClick={saveCharacter}>Save Character</button>
    </>
  );
}

export default SkillsSection;
