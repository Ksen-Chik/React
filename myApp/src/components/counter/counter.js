import React, { useState, useEffect } from "react";

export const Counter = () => {
  // const countState = useState({ number: 0 });
  // const count = countState[0];
  // const setCount = countState[1];
  const [count, setCount] = useState({ number: 0 });

  // const stringState = useState('');
  // const string = stringState[0];
  // const setString = stringState[1];
  const [string, setString] = useState("");

  useEffect(() => {
    console.log("like did mount------------");
  }, []);

  // useEffect(() => {
  //   console.log("like did mount + like did update count or string");
  // }, [count, string]);

  useEffect(() => {
    console.log("like did mount + like did update string");
  }, [string]);

  useEffect(() => {
    return () => {
      console.log("will unmount");
    };
  }, []);

  useEffect(() => {
    console.log("mount and every update");
  });

  return (
    <div>
      <div>{count.number}</div>
      <div>{string}</div>
      <button onClick={() => setCount({ number: count.number + 1 })}>
        CLICK
      </button>
      <button onClick={() => setString(`HELLO${Math.random()}`)}>STRING</button>
    </div>
  );
};

// export class Counter extends React.Component {
//   state = {
//     count: 0,
//   };

//   componentDidMount() {
//     console.log("component did mount");
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log("component did update", prevState, prevProps);
//   }

//   componentWillUnmount() {
//     console.log("component will unmount");
//     clearTimeout(this.timeout);
//   }

//   updateCount = () => {
//     this.timeout = setTimeout(() => this.setState({
//       count: this.state.count + 1,
//     }), 100);
//   };

//   render() {
//     console.log("render");
//     return (
//       <div>
//         <div>{this.state.count}</div>
//         <button onClick={this.updateCount}>CLICK</button>
//       </div>
//     );
//   }
// }