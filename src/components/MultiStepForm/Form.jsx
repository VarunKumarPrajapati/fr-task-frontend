import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Summary from "./Summary";
import { validateSchema, field } from "../../utils/multiStepFormValidation";
import { Button } from "../../ui";

export default function Form() {
  const [showSummary, setSummary] = useState(false);
  const [currentStep, setNextStep] = React.useState(1);
  const [error, setError] = React.useState({});
  const [formValues, setFormValues] = React.useState({
    file: null,
    email: "",
    username: "",
    newPassword: "",
    currentPassword: "",
    profession: "",
    companyName: "",
    addressLine1: "",
    country: "",
    state: "",
    city: "",
    subscriptionPlan: "",
    newSletter: "",
  });

  const stepSchema = {
    1: {
      email: field().required("Email is required").email(),
      username: field().string().noSpace().min(4).max(20),
      newPassword: field()
        .min(8)
        .pattern(/[^A-Za-z0-9]/, "At least one special character")
        .pattern(/[0-9]/, "At least one number character"),
      currentPassword: field().requiredIf(
        "newPassword",
        "Current password is required"
      ),
    },
    2: {
      companyName: field().requiredIf(
        "profession=Entrepreneur",
        "Company name is required"
      ),
      addressLine1: field().required("Address line 1 is required"),
    },
    3: {},
  };

  const handleGoNext = () => {
    const error = validateSchema(formValues, stepSchema, currentStep);
    setError({ ...error });
    if (currentStep > 2) setSummary(true);
    if (!error) setNextStep(currentStep + 1);
  };

  const handleGoBack = () => setNextStep(currentStep - 1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormValues((prev) => ({ ...prev, [name]: newValue }));

    // Validate only the changed field
    const fieldSchema = stepSchema[currentStep]?.[name];
    if (!fieldSchema) setError((prev) => ({ ...prev, [name]: null }));

    const error = validateSchema(
      { [name]: newValue },
      { [currentStep]: { [name]: fieldSchema } },
      currentStep,
      "change"
    );

    setError((prev) => ({
      ...prev,
      [name]: error ? error[name] : null,
    }));
  };

  return (
    <>
      {!showSummary ? (
        <div className="flex justify-center w-full h-full py-32">
          <form>
            <Step1
              isVisible={currentStep === 1}
              onChange={handleChange}
              formValues={formValues}
              error={error}
            />

            <Step2
              isVisible={currentStep === 2}
              onChange={handleChange}
              formValues={formValues}
              error={error}
            />

            <Step3
              isVisible={currentStep === 3}
              onChange={handleChange}
              formValues={formValues}
              error={error}
            />

            <footer className="flex justify-between mt-8">
              <Button
                cancel
                type="button"
                onClick={handleGoBack}
                disabled={currentStep < 2}
              >
                Back
              </Button>
              <Button solid type="button" onClick={handleGoNext}>
                {currentStep > 2 ? "Summary" : "Next"}
              </Button>
            </footer>
          </form>
        </div>
      ) : (
        <Summary formValues={formValues} />
      )}
    </>
  );
}
