import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, type }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render={({ field }) => (
                    <TextField {...field} type={type} label={label} required />
                )}
                control={control}
                fullWidth
                name={name}
                defaultValue=""
            />
        </Grid>
    );
};

export default FormInput;
