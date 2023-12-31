import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        //here we are passing the validation array
        // looping on validation array
        for (let validation of validations) {
            // run each validation on req data if there is an error
            const result = await validation.run(req);
            // there should be no errors if results is not empty it means there are some errors and we need to stop
            if (!result.isEmpty()) {
                break;
            }
        }
        // look for the errors || catch the errors
        const errors = validationResult(req);
        // if there are no error allow the next fun to run
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
// validation chain array to check and sanitize the incoming data in the body
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain atleast 6 characters"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validators.js.map