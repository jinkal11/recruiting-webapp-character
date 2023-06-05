import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import AttributeRow from './components/AttributeRow';
import ClassList from './components/ClassList';
import SkillsSection from './components/SkillsSection';


function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <AttributeRow />
        <ClassList />
        <SkillsSection />
      </section>
    </div>
  );
}

export default App;