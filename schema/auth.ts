import * as z from "zod";
export const SignUpSchema = z
  .object({
    email: z.string({
      required_error: 'Please enter your email'
    }).email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string({
        required_error: 'Please enter your password'
      }).regex(
        new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"),
        {
          message:
            "Password must contains at least 8 characters, 1 letter and 1 number.",
        }
      ),
    confirmPassword: z.string({
      required_error: 'Please enter confirm password'
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

  export const SignInSchema = z.object({
    email: z.string({
      required_error: 'Please enter your email'
    }).email({
      message: "Please enter a valid email.",
    }),
    password: z.string({
      required_error: 'Password must be at least 8 characters.'
    }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
  }); 

  export const ForgotPasswordSchema = z.object({
    email: z.string({
      required_error: 'Please enter your email'
    }).email({
      message: "Please enter a valid email.",
    }),
  });

  export const UpdatePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Please enter your password'
      }).regex(
        new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"),
        {
          message:
            "Password must contains at least 8 characters, 1 letter and 1 number.",
        }
      ),
    confirmPassword: z.string({
      required_error: 'Please enter confirm password'
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });