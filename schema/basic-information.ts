import * as z from "zod";
export const BasicInformationSchema = z
  .object({
    id: z.string(),
    avatar: z.any(),
    firstName: z.string({
      required_error: 'Nhập tên của bạn.'
    }),
    lastName: z.string({
      required_error: 'Nhập họ của bạn.'
    }),
    dob: z.string({
      required_error: 'Nhập ngày sinh của bạn.'
    }).refine((data) => {
      const date = new Date(data);
      const currentDate = new Date();
      // age > 16 

      if (currentDate.getFullYear() - date.getFullYear() < 16) {
        return false;
      }
      return true;
    }, {
      message: "Ngày sinh không hợp lệ.",
    }),
    gender: z.string({
      required_error: 'Chọn giới tính của bạn.'
    }),
  })