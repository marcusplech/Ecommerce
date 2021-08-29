import React, { useState, useEffect } from "react";
import {
    CssBaseline,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { selectors } from "../../../state/selectors/returns";
import { listCart } from "../../../state/actions";

import { useSelector, useDispatch } from "react-redux";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";

const steps = ["Endereço de Entrega", "Detalhes de Pagamento"];

const Checkout = ({ error }) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [order, setOrder] = useState({});
    const [setErrorMessage] = useState("");

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(selectors.getCart);

    const nextStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const refreshCart = async () => {
        await commerce.cart.refresh();
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(
                checkoutTokenId,
                newOrder
            );

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    useEffect(() => {
        dispatch(listCart());
    }, [dispatch]);

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(
                        cart.id,
                        { type: "cart" }
                    );

                    setCheckoutToken(token);
                } catch {
                    if (activeStep !== steps.length) history.push("/");
                }
            };

            generateToken();
        }
    }, [cart]);

    const test = (data) => {
        setShippingData(data);

        nextStep();
    };

    let Confirmation = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Obrigado por comprar conosco, {order.customer.firstname}{" "}
                        {order.customer.lastname}!
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button
                    component={Link}
                    variant="outlined"
                    type="button"
                    to="/"
                >
                    Voltar para o inicio
                </Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button
                    component={Link}
                    variant="outlined"
                    type="button"
                    to="/"
                >
                    Voltar para o inicio
                </Button>
            </>
        );
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm
                checkoutToken={checkoutToken}
                nextStep={nextStep}
                setShippingData={setShippingData}
                test={test}
            />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                nextStep={nextStep}
                backStep={backStep}
                shippingData={shippingData}
                onCaptureCheckout={handleCaptureCheckout}
            />
        );

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main style={{ marginTop: "1%" }} className={classes.layout}>
                <Paper
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                    className={classes.paper}
                >
                    <Typography variant="h4" align="center">
                        Finalizando
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Confirmation />
                    ) : (
                        checkoutToken && <Form />
                    )}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
