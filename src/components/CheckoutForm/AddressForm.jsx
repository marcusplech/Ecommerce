import React, { useState, useEffect } from "react";
import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";
import useStyles from "./Checkout/styles";

const AddressForm = ({ checkoutToken, test }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const methods = useForm();
    const classes = useStyles();

    const fetchShippingCountries = async (checkoutTokenId) => {
        setIsLoading(true);

        try {
            const { countries } =
                await commerce.services.localeListShippingCountries(
                    checkoutTokenId
                );
            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (
        checkoutTokenId,
        country,
        stateProvince = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, region: stateProvince }
        );

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [checkoutToken]);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(
                checkoutToken.id,
                shippingCountry,
                shippingSubdivision
            );
    }, [shippingSubdivision, checkoutToken.id, shippingCountry]);

    return (
        <>
            {isLoading ? (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom>
                        Endereço de entrega
                    </Typography>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit((data) =>
                                test({
                                    ...data,
                                    shippingCountry,
                                    shippingSubdivision,
                                    shippingOption,
                                })
                            )}
                        >
                            <Grid container spacing={3}>
                                <FormInput
                                    required
                                    name="firstName"
                                    label="Nome"
                                />
                                <FormInput
                                    required
                                    name="lastName"
                                    label="Sobrenome"
                                />
                                <FormInput
                                    required
                                    name="address1"
                                    label="Endereço"
                                />
                                <FormInput
                                    required
                                    name="email"
                                    label="Email"
                                />
                                <FormInput
                                    required
                                    name="city"
                                    label="Cidade"
                                />
                                <FormInput required name="zip" label="CEP" />
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>País</InputLabel>
                                    <Select
                                        value={shippingCountry}
                                        fullWidth
                                        onChange={(e) =>
                                            setShippingCountry(e.target.value)
                                        }
                                    >
                                        {Object.entries(shippingCountries)
                                            .map(([code, name]) => ({
                                                id: code,
                                                label: name,
                                            }))
                                            .map((item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Estado</InputLabel>
                                    <Select
                                        value={shippingSubdivision}
                                        fullWidth
                                        onChange={(e) =>
                                            setShippingSubdivision(
                                                e.target.value
                                            )
                                        }
                                    >
                                        {Object.entries(shippingSubdivisions)
                                            .map(([code, name]) => ({
                                                id: code,
                                                label: name,
                                            }))
                                            .map((item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Taxa de Entrega</InputLabel>
                                    <Select
                                        value={shippingOption}
                                        fullWidth
                                        onChange={(e) =>
                                            setShippingOption(e.target.value)
                                        }
                                    >
                                        {shippingOptions
                                            .map((sO) => ({
                                                id: sO.id,
                                                label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                                            }))
                                            .map((item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <br />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button
                                    component={Link}
                                    variant="outlined"
                                    to="/cart"
                                >
                                    Voltar para o Carrinho
                                </Button>
                                <Button
                                    style={{ marginLeft: "10px" }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </>
            )}
        </>
    );
};

export default AddressForm;
