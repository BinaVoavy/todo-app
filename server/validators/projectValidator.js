import joi from "joi-oid";

async function validateProjectData(data) {
  const projectSchema = joi.object({
    name: joi.string().required().label("Name"),
    owner: joi.objectId().required().label("Owner"),
  });
  const { error } = projectSchema.validate(data);
  if (error)
    return {
      source: error.details[0].path[0],
      message: error.details[0].message,
    };
  return null;
}

export default validateProjectData;
