import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";

const schema = yup.object({
    name: yup
        .string()
        .matches(/^([^0-9]*)$/, "Введіть букви!")
        .min(2, "Введіть не менше ніж 2 символи!")
        .max(20, "Введіть менше 20 символів")
        .required("Обов'язкове поле!"),
    phone: yup
        .string()
        .min(10, "Введіть правильний номер")
        .phone(["PL", "UA"], "Введіть правильний номер")
        .required("Обов'язкове поле!"),
    delivery: yup.string().required("Виберіть спосіб доставки"),
});

export const FormValidation: Object = {
    defaultValues: {
        name: "",
        phone: "",
        delivery: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
};
