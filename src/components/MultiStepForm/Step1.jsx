import { FieldSet, Input, ImageUploadWithPreview } from "../../ui";
import { useCheckUsernameMutation } from "../../store";
import useDebounce from "../../hooks/use-debounce";

export default function Step1({ error, formValues, onChange, isVisible }) {
  const [checkUsername, { isLoading, data }] = useCheckUsernameMutation();
  const debounce = useDebounce();
  const handleUsernameChange = (e) => {
    onChange(e);
    if (e.target.value.length > 4 && !error.username)
      debounce(() => checkUsername(e.target.value), 2000);
  };

  if (!isVisible) return null;
  return (
    <FieldSet legend="Personal Information">
      <ImageUploadWithPreview
        className="flex items-center justify-center col-span-2"
        error={error.file}
        value={formValues.file}
        onChange={onChange}
      />
      <Input
        autoComplete="username"
        placeholder="Enter username"
        label="Username"
        name="username"
        onChange={handleUsernameChange}
        value={formValues.username}
        error={
          error.username ||
          (formValues.username && data?.exists
            ? "Username is already taken"
            : "")
        }
        success={
          formValues.username && !error.username && data?.exists === false
            ? "Username is available"
            : ""
        }
        loading={isLoading}
      />

      <Input
        autoComplete="email"
        placeholder="Enter email"
        label="Email"
        name="email"
        className="col-start-1"
        error={error.email}
        onChange={onChange}
        value={formValues.email}
      />
      <Input
        autoComplete="current-password"
        placeholder="Enter current password"
        label="Current Password"
        type="password"
        name="currentPassword"
        className="col-end-3 "
        error={error.currentPassword}
        onChange={onChange}
        value={formValues.currentPassword}
      />
      <Input
        autoComplete="new-password"
        placeholder="Enter new password"
        label="New Password"
        type="password"
        name="newPassword"
        className=""
        error={error.newPassword}
        onChange={onChange}
        value={formValues.newPassword}
      />
    </FieldSet>
  );
}
