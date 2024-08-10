import React from "react";
import BirthDate from "../forms/BirthDate";
import AboutMe from "../forms/AboutMe";

const StepTwo = () => {
  return (
    <form action="">
      {<BirthDate />}
      {<AboutMe />}
    </form>
  );
};

export default StepTwo;
