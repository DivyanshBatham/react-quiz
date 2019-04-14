import React from "react";

const QuizShell = () => {
  return (
    <>
      <div className="questionNumberShell shineDark" />
      <div className="questionShell">
        <div className="largeLines shineDark" />
        <div className="largeLines shineDark" />
        <div className="largeLines shineDark width75" />
      </div>
      <div className="quiz-optionsShell">
        <div className="shineDark" />
        <div className="shineDark" />
        <div className="shineDark" />
        <div className="shineDark" />
      </div>
    </>
  );
};

export default QuizShell;
