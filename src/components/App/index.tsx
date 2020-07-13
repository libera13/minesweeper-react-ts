import React from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay";
import smiley1 from "../../assets/smiley1.png"

const App: React.FunctionComponent = () => {
  return (
    <div className={"App"}>
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
            <img src={smiley1} alt=""/>
        </div>
        <NumberDisplay value={12} />
      </div>
      <div className="Body">Body</div>
    </div>
  );
};
export default App;
