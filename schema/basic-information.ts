import * as z from "zod";
export const BasicInformationSchema = z.object({
  firstName: z.string({
    required_error: "Enter your first name.",
  }),
  lastName: z.string({
    required_error: "Enter your last name.",
  }),
  dob: z
    .date({
      required_error: "Enter your date of birth.",
    })
    .refine(
      (data) => {
        const date = new Date(data);
        const currentDate = new Date();
        // age > 16

        if (currentDate.getFullYear() - date.getFullYear() < 5) {
          return false;
        }
        return true;
      },
      {
        message: "You must be over 5 years old",
      }
    ),
  gender: z.string({
    required_error: "Choose your gender.",
  }),
});
