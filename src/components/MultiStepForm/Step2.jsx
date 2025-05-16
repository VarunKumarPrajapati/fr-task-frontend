import { FieldSet, Input, Dropdown } from "../../ui";
import {
  useGetCountriesQuery,
  useGetStatesByCountryMutation,
  useGetCitiesByStateMutation,
} from "../../store";

export default function Step2({ error, formValues, onChange, isVisible }) {
  const professions = [
    { name: "Student" },
    { name: "Developer" },
    { name: "Entrepreneur" },
  ];

  const { data: countries } = useGetCountriesQuery();
  const [
    fetchStates,
    { data: states, reset: resetStates, isLoading: isStatesLoading },
  ] = useGetStatesByCountryMutation();
  const [
    fetchCity,
    { data: city, reset: resetCites, isLoading: isCitiesLoading },
  ] = useGetCitiesByStateMutation();

  // Handle option click for Country, State, City dropdowns
  const handleDropdownChange = (e, id) => {
    if (e.target.name === "country") {
      // Reset state and city when country changes
      onChange({ target: { name: "state", value: "" } });
      onChange({ target: { name: "city", value: "" } });
      onChange(e);
      resetStates();
      resetCites();
      fetchStates(id);
    }
    if (e.target.name === "state") {
      // Reset city when state changes
      onChange({ target: { name: "city", value: "" } });
      onChange(e);
      fetchCity(id);
    }
  };

  if (!isVisible) return null;
  return (
    <FieldSet legend="Professional Details">
      <Dropdown
        list={professions}
        label="Professional"
        name="profession"
        onChange={onChange}
        error={error.professional}
        value={formValues.professional}
        className="col-span-2"
      />
      <Input
        label="Company Name"
        placeholder="Enter company name"
        onChange={onChange}
        name="companyName"
        error={error.companyName}
        value={formValues.companyName}
      />
      <Input
        label="Address Line 1"
        placeholder="Enter Address Line 1"
        onChange={onChange}
        name="addressLine1"
        error={error.addressLine1}
        value={formValues.addressLine1}
      />
      <Dropdown
        label="Country"
        list={countries}
        onChange={handleDropdownChange}
        error={error.country}
        name="country"
        value={formValues.country}
        className="col-span-2"
      />
      <Dropdown
        label="State"
        list={states}
        onChange={handleDropdownChange}
        error={error.state}
        name="state"
        value={formValues.state}
        className="col-span-2"
        disabled={isStatesLoading}
      />
      <Dropdown
        label="City"
        list={city}
        onChange={onChange}
        error={error.city}
        name="city"
        value={formValues.city}
        className="col-span-2"
        disabled={isCitiesLoading}
      />
    </FieldSet>
  );
}
