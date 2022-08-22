import joi from "joi-oid";

async function validateTaskData(data) {
  const taskSchema = joi.object({
    description: joi.string().required().label("Description"),
    owner: joi.objectId().required().label("Owner"),
    project: joi.objectId().required().label("Project"),
    date: joi.valid("Today", "Inbox", "Next 7 day"),
  });
  const { error } = taskSchema.validate(data);
  if (error)
    return {
      source: error.details[0].path[0],
      message: error.details[0].message,
    };
  return null;
}

export default validateTaskData;
