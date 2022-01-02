import { useState } from "react";
import { Button, CssBaseline, InputAdornment, FormControl, InputLabel, FilledInput, FormHelperText, IconButton, Grid, Box, Typography, Container, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userStore } from "../storage/store";

const theme = createTheme();

const UpdateUser = () => {

    const [cred, setCred] = useState({
        user: {
            value: "",
            warning: ""
        },
        pwd: {
            value: "",
            warning: ""
        },
        email: {
            value: "",
            warning: ""
        }
    });

    const [showPassword, setshowPassword] = useState(false);

    //checks the user input on every change in form fields
    function handleChange(e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z]*$/;
        const emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //clear every warnings
        setCred({
            ...cred,
            user: {
                ...cred.user,
                warning: ""
            },
            pwd: {
                ...cred.pwd,
                warning: ""
            },
            email: {
                ...cred.email,
                warning: ""
            }
        });
        //check for the username
        if (e.target.name === "username") {
            //check whether its empty or not and set the warning
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        value: "",
                        warning: "Username is required."
                    }
                });
            } else {
                //check whether it matches the pattern or not
                if (!pattern.test(e.target.value)) {
                    setCred({
                        ...cred,
                        user: {
                            ...cred.user,
                            warning: "Username must be alphanumerical."
                        }
                    });
                } else {
                    //set the username
                    setCred({
                        ...cred,
                        user: {
                            ...cred.user,
                            value: e.target.value,
                            warning: ""
                        }
                    });
                }
            }
        }

        if (e.target.name === "email") {
            //check whether its empty or not and set the warning
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    email: {
                        ...cred.email,
                        value: "",
                        warning: "Email is required."
                    }
                });
            } else {
                //check whether it matches the pattern or not
                if (!emailpattern.test(e.target.value)) {
                    setCred({
                        ...cred,
                        email: {
                            ...cred.email,
                            warning: "Email is invalid."
                        }
                    });
                }
                setCred({
                    ...cred,
                    email: {
                        ...cred.email,
                        value: e.target.value,
                        warning: ""
                    }
                });
            }
        }

        if (e.target.name === "password") {
            //check whether its empty or not and set the warning
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        value: "",
                        warning: "Password is required."
                    }
                });
            } else {
                //check whether it matches the pattern or not
                if (!pattern.test(e.target.value)) {
                    setCred({
                        ...cred,
                        pwd: {
                            ...cred.pwd,
                            warning: "Password must be alphanumerical."
                        }
                    });
                } else {
                    //set the password
                    setCred({
                        ...cred,
                        pwd: {
                            ...cred.user,
                            value: e.target.value,
                            warning: ""
                        }
                    });
                }
            }
        }
    }

    function updateuser(e) {
        e.preventDefault();
        if ((cred.email.value === "") || (cred.user.value.length < 8) || (cred.user.value.length > 30) || (cred.pwd.value.length < 10) || (cred.pwd.value.length > 30)) {
            //check for the errors
            const warning = {
                user: "",
                pwd: "",
                email: ""
            }
            if (cred.email.value === "") {
                warning.email = "email is required."
            }
            if ((cred.user.value.length < 8) || (cred.user.value.length > 30)) {
                warning.user = (cred.user.value === "") ? "Username is required." : "Username must be 8 to 30 letters long."
            }
            if ((cred.pwd.value.length < 10) || (cred.pwd.value.length > 30)) {
                warning.pwd = (cred.pwd.value === "") ? "password is required." : "Password must be 10 to 30 letters long."
            }
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    warning: warning.user
                },
                pwd: {
                    ...cred.pwd,
                    warning: warning.pwd
                },
                email: {
                    ...cred.email,
                    warning: warning.email
                }
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
                    pwd: cred.pwd.value
                })
            }).then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            }).then(data => {
                if (data !== undefined) {
                    fetch('/API/updateuser', {
                        method: 'PUT',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            old_user: userStore.getState().loggedInUser.username,
                            new_user: cred.user.value,
                            new_email: cred.email.value
                        })
                    }).then(response => {
                        return response.status;
                    }).then(status => {
                        if (status === 500) {
                            setCred({
                                ...cred,
                                user: {
                                    ...cred.user,
                                    value: ""
                                },
                                pwd: {
                                    ...cred.pwd,
                                    value: ""
                                },
                                email: {
                                    ...cred.email,
                                    value: ""
                                }
                            });
                            window.alert("Update unsuccessful.");
                        } else if (status === 200) {
                            setCred({
                                ...cred,
                                user: {
                                    ...cred.user,
                                    value: ""
                                },
                                pwd: {
                                    ...cred.pwd,
                                    value: ""
                                },
                                email: {
                                    ...cred.email,
                                    value: ""
                                }
                            });
                            window.alert("Update successful.");
                            //set the cookie or set the local storage to keep user loggedIn during refresh
                            window.localStorage.setItem("user", JSON.stringify({
                                username: cred.user.value,
                                password: data.password,
                                usertype: data.usertype
                            }));
                            window.location.reload();
                        }
                    });
                } else {
                    window.alert("Password is wrong.");
                    setCred({
                        ...cred,
                        user: {
                            ...cred.user,
                            value: "",
                            warning: ""
                        },
                        pwd: {
                            ...cred.pwd,
                            value: "",
                            warning: "Password is invalid."
                        },
                        email: {
                            ...cred.email,
                            value: "",
                            warning: ""
                        }
                    });
                }
            });
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Update UserData
                        </Typography>
                        <Box component="div" sx={{ mt: 1 }}>
                            <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                                <Grid item xs={12}>
                                    <FormControl
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="password" error={cred.pwd.warning !== ""}>Password</InputLabel>
                                        <FilledInput
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            value={cred.pwd.value}
                                            onChange={(event) => handleChange(event)}
                                            error={cred.pwd.warning !== ""}
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
                                        <FormHelperText id="my-helper-text-pwd" error={cred.pwd.warning !== ""}>{cred.pwd.warning}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="username" error={cred.user.warning !== ""}>New Username</InputLabel>
                                        <FilledInput
                                            autoFocus
                                            type="text"
                                            id="username"
                                            label="username"
                                            name="username"
                                            onChange={(event) => handleChange(event)}
                                            value={cred.user.value}
                                            error={cred.user.warning !== ""}
                                            aria-describedby="my-helper-text-user"
                                        />
                                        <FormHelperText id="my-helper-text-user" error={cred.user.warning !== ""}>{cred.user.warning}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="email" error={cred.email.warning !== ""}>New Email</InputLabel>
                                        <FilledInput
                                            autoFocus
                                            type="email"
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            onChange={(event) => handleChange(event)}
                                            value={cred.email.value}
                                            error={cred.email.warning !== ""}
                                            aria-describedby="my-helper-text-email"
                                        />
                                        <FormHelperText id="my-helper-text-email" error={cred.email.warning !== ""}>{cred.email.warning}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={(event) => updateuser(event)}
                                    >
                                        Update User
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default UpdateUser;