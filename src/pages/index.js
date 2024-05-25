import Hello from '@/components/Hello'
import styles from '@/styles/Home.module.css'
import {useState} from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setCount(count+1);
    setIsVisible(!isVisible);
  }

  const names = ['Niels', 'Robbe', 'Lena', 'Simon'];

  let namesClass = styles.isNotVisible;
  if (isVisible) {
    namesClass = styles.isVisible;
  }

  return (
    <div>
      Count: {count}
      <button onClick={handleClick}>+1</button>
      {isVisible ? (
        <div>
          {names.map((name) => <Hello name={name} key={name}/> )}
        </div>
      ) : null}
      <div style={{display: isVisible ? 'block' : 'none'}}>
        {names.map((name) => <Hello name={name} key={name}/> )}
      </div> 
      <div className={namesClass}>
        {names.map((name) => <Hello name={name} key={name}/> )}
      </div>       
    </div>
  )
}