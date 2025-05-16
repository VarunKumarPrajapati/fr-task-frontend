import { FieldSet, Checkbox, RadioGroup } from "../../ui";

export default function Step3({ error, formValues, onChange, isVisible }) {
  const subscriptionPlan = [
    { value: "Basic", label: "Basic" },
    { value: "Pro", label: "Pro" },
    { value: "Enterprise", label: "Enterprise" },
  ];

  if (!isVisible) return null;
  return (
    <FieldSet legend="Preferences">
      <RadioGroup
        options={subscriptionPlan}
        label="Subscription Plan"
        error={error.subscriptionPlan}
        value={formValues.subscriptionPlan}
        onChange={onChange}
        name="subscriptionPlan"
        className="text-xl"
      />
      <Checkbox
        checked={true}
        onChange={onChange}
        name="newSletter"
        label="Newsletter"
        className="text-xl"
      />
    </FieldSet>
  );
}
