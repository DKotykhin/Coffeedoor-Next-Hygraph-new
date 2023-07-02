import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from 'next-intl';

import { Box, Button, TextField } from "@mui/material";
import { Typography, Input, InputLabel } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import { FormValidation } from "./BasketFormValidation";
import { IFormData } from "types/basketTypes";

import styles from "./Basketform.module.scss";

interface IBasketForm {
    onSubmit: (data: IFormData) => void;
    loading: boolean;
}

const BasketForm: React.FC<IBasketForm> = ({ onSubmit, loading }) => {

    const t = useTranslations("basket");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormData>(FormValidation);

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            component="form"
            noValidate
            autoComplete="off"
        >
            <InputLabel
                htmlFor="name"
                className={styles.label}
            >
                {t("name")}
            </InputLabel>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input {...field} sx={{ width: "100%" }} />
                )}
            />
            <Typography className={styles.error}>
                {errors.name?.message}
            </Typography>
            <InputLabel
                htmlFor="phone"
                className={styles.label}
            >
                {t("phone")}
            </InputLabel>
            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <Input {...field} sx={{ width: "100%" }} />
                )}
            />
            <Typography className={styles.error}>
                {errors.phone?.message}
            </Typography>
            <InputLabel
                htmlFor='delivery'
                className={styles.label}
            >
                {t("delivery")}
            </InputLabel>
            <Controller
                name="delivery"
                control={control}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        <FormControlLabel
                            value="забрати в кав'ярні"
                            control={<Radio />}
                            label={t("var_1")}
                        />
                        <FormControlLabel
                            value="доставка перевізником"
                            control={<Radio />}
                            label={t("var_2")}
                        />
                    </RadioGroup>

                )}
            />
            <Typography className={styles.error}>
                {errors.delivery?.message}
            </Typography>
            <InputLabel
                htmlFor="text"
                className={styles.label}
            >
                {t("comment")}
            </InputLabel>
            <Controller
                name="text"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        multiline
                        maxRows={4}
                        sx={{ width: "100%" }}
                    />
                )}
            />
            <Button
                // disabled={!isValid}
                className={styles.submitbutton}
                type="submit"
            >
                {loading ? t("send") : t("submit")}
            </Button>
        </Box>
    );
};

export default BasketForm;
