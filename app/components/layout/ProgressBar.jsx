import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

const ProgressBar = ({ activeStepp }) => {
  const steps = [
    {
      label: <p>Personal Details</p>,
      count: 1,
    },
    {
      label: <p>Business Details</p>,
      count: 2,
    },
    {
      label: <p>Categories</p>,
      count: 3,
    },
    {
      label: <p>Bank Details</p>,
      count: 4,
    },
    {
      label: <p>Documents</p>,
      count: 5,
    },
  ];

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStepp}>
        {steps.map((s, idx) => (
          <Step key={idx}>
            <StepLabel
              // style={{
              //   color: activeStepp >= idx ? "tomato" : "gray",
              // }}
              icon={s.count}
            >
              {s.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default ProgressBar;
