import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: "100%",
        boxShadow:
            "2px 2px 2px 2px rgb(0 0 0 / 20%), 2px 2px 2px 2px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    },
    media: {
        backgroundSize: "contain",
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
}));
