import { Container, Typography, Card, CardHeader, CardContent, CardActions, Button, Box, Modal, Grid, Divider, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from "react";
import { userStore } from "../storage/store";

const Pricing = () => {

    const [open, setOpen] = useState(false);
    const [showPassword, setshowPassword] = useState(false);

    const [pwd, setPwd] = useState({
        value: "",
        warning: ""
    });

    const [shop, setShop] = useState({
        value: "",
        warning: ""
    });

    function handleChange(e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z]*$/;
        //clear every warnings
        setPwd({
            ...pwd,
            warning: ""
        });

        //Input Constraints
        switch (e.target.name) {
            case "password":
                if (e.target.value === "") {
                    setPwd({
                        ...pwd,
                        value: "",
                        warning: "Password is required."
                    });
                } else {
                    //check whether it matches the pattern or not
                    if (!pattern.test(e.target.value)) {
                        setPwd({
                            ...pwd,
                            warning: "Password must be alphanumerical."
                        });
                    } else {
                        //set the password
                        setPwd({
                            ...pwd,
                            value: e.target.value,
                            warning: ""
                        });
                    }
                }
                break;

            case "shop":
                if (e.target.value === "") {
                    setShop({
                        ...shop,
                        value: "",
                        warning: "Shop name is required."
                    });
                } else {
                    //check whether it matches the pattern or not
                    if (!(/^[a-z]*$/).test(e.target.value)) {
                        setShop({
                            ...shop,
                            warning: "Shop name must be lowercase alphabate."
                        });
                    } else {
                        //set the password
                        setShop({
                            ...shop,
                            value: e.target.value,
                            warning: ""
                        });
                    }
                }
                break;

            default:
                break;
        }
    }

    function upgradeUser(e) {
        e.preventDefault();
        if ((pwd.value.length < 10) || (pwd.value.length > 30) || (shop.value.length === 0) || (shop.value.length > 30)) {
            const warning = {
                pwd: "",
                shop: ""
            }
            if ((pwd.value.length < 10) || (pwd.value.length > 30)) {
                warning.pwd = (pwd.value === "") ? "password is required." : "Password must be 10 to 30 letters long.";
            }
            if ((shop.value.length === 0) || (shop.value.length > 30)) {
                warning.shop = (shop.value === "") ? "ShopName is required." : "ShopName must be within 30 characters."
            }
            setPwd({
                ...pwd,
                warning: warning.pwd
            });
            setShop({
                ...shop,
                warning: warning.shop
            });
        } else {
            fetch('/API/login', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userStore.getState().loggedInUser.username,
                    pwd: pwd.value
                })
            }).then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            }).then(data => {
                setPwd({
                    ...pwd,
                    value: ""
                })
                if (data === undefined) {
                    //if the the credentials are wrong then clear the fields and throw warning
                    setPwd({
                        ...pwd,
                        warning: "Password is Invalid."
                    });
                } else {
                    //add the data into the menu table
                    fetch('/API/shop', {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            shop_name: shop.value,
                            shop_owner: userStore.getState().loggedInUser.username
                        })
                    }).then(response => {
                        if (response.status === 500) {
                            return undefined;
                        }
                        return response.json();
                    }).then(data => {
                        setShop({
                            ...shop,
                            value: ""
                        });
                        if (data === undefined) {
                            window.alert("Unsuccessfull in Creating New Shop.");
                        } else {
                            window.alert("Shop Created successfully.");
                            //set the cookie or set the local storage to keep user loggedIn during refresh
                            window.localStorage.setItem("user", JSON.stringify({
                                username: userStore.getState().loggedInUser.username,
                                password: userStore.getState().loggedInUser.password,
                                usertype: 1
                            }));
                            window.location.reload();
                        }
                    })
                }
            })
        }
    }

    return (
        <>
            <Modal
                open={open}
                disableEnforceFocus={true}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                            <Grid item xs={12}>
                                <Typography component="h4" variant="h5">
                                    Credentials
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="password" error={pwd.warning !== ""}>Password</InputLabel>
                                    <FilledInput
                                        autoFocus
                                        id="password"
                                        label="password"
                                        name="password"
                                        value={pwd.value}
                                        error={pwd.warning !== ""}
                                        type={showPassword ? "text" : "password"}
                                        onChange={(event) => handleChange(event)}
                                        aria-describedby="my-helper-text-pwd"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setshowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="my-helper-text-pwd" error={pwd.warning !== ""}>{pwd.warning}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h4" variant="h5">
                                    Add-Item
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="shop" error={shop.warning !== ""}>shop</InputLabel>
                                    <FilledInput
                                        type="text"
                                        id="shop"
                                        label="shop"
                                        name="shop"
                                        value={shop.value}
                                        error={shop.warning !== ""}
                                        onChange={(event) => handleChange(event)}
                                        aria-describedby="my-helper-text-itemname"
                                    />
                                    <FormHelperText id="my-helper-text-itemname" error={shop.warning !== ""}>{shop.warning}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            variant="contained"
                            title="Add"
                            onClick={(e) => upgradeUser(e)}
                        >
                            <FileUploadIcon />
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            title="Add"
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </CardActions>
                </Card>
            </Modal >
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h2"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" component="p">
                    If you want to upgrad your status and create a shop on this website you are very much welcome.
                    you can see the card below. You can proceed from there.
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Card>
                    <CardHeader
                        title="Premium"
                        subheader="Business Account"
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{
                            align: 'center'
                        }}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                        }}
                    />
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'baseline',
                                mb: 2,
                            }}
                        >
                            <Typography component="h2" variant="h3" color="text.primary">
                                700
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                /mo
                            </Typography>
                        </Box>
                        <Typography variant="h6" align="center" color="text.secondary" component="p">
                            Upgrade your self to customer level. Its 700//mo for use.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => setOpen(true)}
                        >
                            Upgrade
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
}

export default Pricing;