import { Alert, Button } from "../../ui";
import { useUpdateUserMutation } from "../../store";

export default function Summary({ formValues }) {
  const [submitData, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation();
  const handleClick = () => {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    submitData({ id: "68273f84ec8c531abdca7631", formData }); // Using hardcoded value because have to select a user first
  };

  return (
    <div className="flex items-center justify-center w-full h-full py-2">
      <Alert className="bg-green-500" isOpen={isSuccess}>
        Submit Successfully
      </Alert>
      <Alert className="bg-green-500" isOpen={isError}>
        Something Went Wrong
      </Alert>
      <div className="w-8/12 h-full px-6 overflow-y-auto bg-white border border-gray-200 rounded shadow">
        <header className="flex items-center w-full">
          <h2 className="w-full mb-4 text-2xl font-semibold">Summary </h2>
          <Button
            loading={isLoading}
            disabled={isSuccess}
            onClick={handleClick}
            active
          >
            Submit
          </Button>
        </header>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {formValues.file && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image:
              </label>
              <img
                src={URL.createObjectURL(formValues.file)}
                alt="Profile"
                className="object-cover mt-2 border rounded size-48"
              />
            </div>
          )}
          <FormItem label="Email" value={formValues.email} />
          <FormItem label="Username" value={formValues.username} />
          <FormItem label="Profession" value={formValues.profession} />
          <FormItem label="Company Name" value={formValues.companyName} />
          <FormItem label="Address Line 1" value={formValues.addressLine1} />
          <FormItem label="Country" value={formValues.country} />
          <FormItem label="State" value={formValues.state} />
          <FormItem label="City" value={formValues.city} />
          <FormItem
            label="Subscription Plan"
            value={formValues.subscriptionPlan}
          />
          <FormItem
            label="Newsletter"
            value={formValues.newSletter ? "Yes" : "No"}
          />
        </div>
      </div>
    </div>
  );
}

function FormItem({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <div className="p-2 mt-1 text-gray-800 border border-gray-300 rounded bg-gray-50">
        {value || "-"}
      </div>
    </div>
  );
}
