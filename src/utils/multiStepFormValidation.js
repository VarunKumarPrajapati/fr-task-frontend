const validateSchema = (values, schema, step, mode = "submit") => {
  const error = {};
  let formSchema = schema;
  if (step != null) formSchema = formSchema[step];

  for (let fieldName in formSchema) {
    const fieldRules = formSchema[fieldName]?._rules || [];
    const value = values[fieldName];
    const isValueEmpty =
      value === undefined || value === null || value.toString().trim() === "";

    for (let rule of fieldRules) {
      const isRequiredRule =
        rule.type === "required" ||
        (rule.type === "requiredIf" && rule.dependentKey);

      // On submit: skip all rules if empty and not required
      if (mode === "submit" && isValueEmpty && !isRequiredRule) continue;

      const errorMessage = validateRule(value, rule, values);
      if (errorMessage) error[fieldName] = errorMessage;
    }
  }

  if (Object.keys(error).length) return error;
  return null;
};

const validateRule = (value, rule, values) => {
  if (
    rule.type === "required" &&
    (value === undefined || value === null || value.toString().trim() === "")
  ) {
    return rule.msg;
  }

  if (rule.type === "requiredIf") {
    const dependents = rule.dependentKey.split("=");
    if (dependents.length === 2) {
      if (
        dependents[1]?.length &&
        !value.toString().trim().length &&
        values[dependents[0]] === dependents[1]
      ) {
        return rule.msg;
      }
    } else if (
      rule.dependentKey &&
      values[rule.dependentKey] &&
      value.toString().trim() === ""
    ) {
      return rule.msg;
    }
  }

  if (rule.type === "type") {
    const actualType = typeof value;
    if (actualType === "string" && rule.expected !== "string") return rule.msg;
    if (actualType === "number" && rule.expected !== "number") return rule.msg;
  }

  if (rule.type === "min") {
    const lengthOrValue =
      typeof value === "string" ? value.length : Number(value);

    if (lengthOrValue < rule.len) return rule.msg;
  }

  if (rule.type === "max") {
    const lengthOrValue =
      typeof value === "string" ? value.length : Number(value);

    if (lengthOrValue > rule.len) return rule.msg;
  }

  if (rule.type === "pattern" && !rule.pattern.test(value)) return rule.msg;
};

const field = () => {
  const rules = [];

  return {
    _rules: rules,
    string(msg = "Must be a string") {
      rules.push({ type: "type", expected: "string", msg });
      return this;
    },
    number(msg = "Must be a number") {
      rules.push({ type: "type", expected: "number", msg });
      return this;
    },
    required(msg = "This field is required") {
      rules.push({ type: "required", msg });
      return this;
    },
    email(msg = "Invalid email") {
      rules.push({ type: "pattern", pattern: /^\S+@\S+\.\S+$/, msg });
      return this;
    },
    min(len, msg = `Minimum ${len}`) {
      rules.push({ type: "min", len, msg });
      return this;
    },
    max(len, msg = `Maximum ${len}`) {
      rules.push({ type: "max", len, msg });
      return this;
    },
    noSpace(msg = "Whitespace characters are not allowed") {
      rules.push({
        type: "pattern",
        pattern: /^[^\s]+$/,
        msg,
      });
      return this;
    },
    pattern(regex, msg = "Invalid format") {
      rules.push({ type: "pattern", pattern: regex, msg });
      return this;
    },
    requiredIf(dependentKey, msg = "Field is required too") {
      rules.push({ type: "requiredIf", dependentKey, msg });
      return this;
    },
  };
};

export { validateSchema, field };
