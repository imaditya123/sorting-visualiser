import React from 'react';
import { getMergeSortAnimations, getbubbleSortAnimation } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';






const PRIMARY_COLOR = 'turquoise';

const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      array: [],
      NUMBER_OF_ARRAY_BARS: '310',
      value: 310,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // for input field
  handleChange(event) {

    this.setState({ value: event.target.value });

  }

  handleSubmit(event) {
    this.state.NUMBER_OF_ARRAY_BARS = this.state.value;
    this.resetArray();
    event.preventDefault();
  }
  //
  componentDidMount() {

    this.resetArray();

  }

  resetArray() {
    const array = [];
    var noOfBars = parseInt(this.state.NUMBER_OF_ARRAY_BARS);
    for (let i = 0; i < noOfBars; i++) {
      array.push(randomIntFromInterval(5, window.innerHeight - 200));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    var ANIMATION_SPEED_MS = 1 + (350 / parseInt(this.state.NUMBER_OF_ARRAY_BARS));
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // const animations = getQuickAnimations(this.state.array);
    // var ANIMATION_SPEED_MS = 1 + (350 / parseInt(this.state.NUMBER_OF_ARRAY_BARS));
    // for (let i = 0; i < animations.length; i++) {
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //   const isColorChange = i % 3 !== 2;
    //   if (isColorChange) {
    //     const [barOneIdx, barTwoIdx] = animations[i];
    //     const barOneStyle = arrayBars[barOneIdx].style;
    //     const barTwoStyle = arrayBars[barTwoIdx].style;
    //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //     setTimeout(() => {
    //       barOneStyle.backgroundColor = color;
    //       barTwoStyle.backgroundColor = color;
    //     }, i * ANIMATION_SPEED_MS);
    //   } else {
    //     setTimeout(() => {
    //       const [barOneIdx, newHeight] = animations[i];
    //       const barOneStyle = arrayBars[barOneIdx].style;
    //       barOneStyle.height = `${newHeight}px`;
    //     }, i * ANIMATION_SPEED_MS);
    //   }
    // }
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const animations = getbubbleSortAnimation(this.state.array);
    var ANIMATION_SPEED_MS = 1 + (350 / parseInt(this.state.NUMBER_OF_ARRAY_BARS));
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div >
        <div className="Title">
          <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
          <form onSubmit={this.handleSubmit}>
            <label>
              Size:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          </form>


          <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>

          <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button className="button" onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button>

        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                width: (window.innerWidth - 200) / (2 * parseInt(this.state.NUMBER_OF_ARRAY_BARS)),
                height: `${value}px`,
              }}></div>
          ))}

        </div>


      </div>
    );
  }
}


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}