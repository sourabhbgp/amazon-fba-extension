import * as React from "react";
import * as ReactDOM from "react-dom";

class Popup extends React.Component {
  render() {
    return <div>Welcome</div>;
  }
}

// --------------

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,

  document.getElementById("popup")
);
