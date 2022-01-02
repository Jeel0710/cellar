import { Modal, Grid, Button, Card, CardActions, CardContent, FormControl, InputLabel, FilledInput, FormHelperText, Divider, Typography, InputAdornment, IconButton } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { userStore } from "../storage/store";

const AddItem = ({ opencard, setOpenCard }) => {

    const [open, setOpen] = useState(opencard);

    const [showPassword, setshowPassword] = useState(false);

    useEffect(() => {
        setOpen(opencard);
        return (() => {
            return;
        });
    }, [opencard]);

    const [pwd, setPwd] = useState({
        value: "",
        warning: ""
    });

    const [item, setItem] = useState({
        name: {
            value: "",
            warning: ""
        },
        price: {
            value: "",
            warning: ""
        },
        description: {
            value: "",
            warning: ""
        }
    });

    function handleChange(e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z]*$/;
        //clear every warnings
        setPwd({
            ...pwd,
            warning: ""
        });
        setItem({
            ...item,
            name: {
                ...item.name,
                warning: ""
            },
            price: {
                ...item.price,
                warning: ""
            },
            description: {
                ...item.description,
                warning: ""
            }
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

            case "ItemName":
                if (e.target.value === "") {
                    setItem({
                        ...item,
                        name: {
                            ...item.name,
                            value: "",
                            warning: "ItemName is required."
                        }
                    })
                } else {
                    //check whether it matches the pattern or not
                    if (!pattern.test(e.target.value)) {
                        setItem({
                            ...item,
                            name: {
                                ...item.name,
                                warning: "ItemName must be alphanumerical."
                            }
                        })
                    } else {
                        //set the value
                        setItem({
                            ...item,
                            name: {
                                ...item.name,
                                value: e.target.value,
                                warning: ""
                            }
                        })
                    }
                }
                break;

            case "ItemPrice":
                if (e.target.value === "") {
                    setItem({
                        ...item,
                        price: {
                            ...item.price,
                            value: "",
                            warning: "ItemPrice is required."
                        }
                    })
                } else {
                    //check whether it matches the pattern or not
                    if (!(/^[0-9]*$/).test(e.target.value)) {
                        setItem({
                            ...item,
                            price: {
                                ...item.price,
                                warning: "ItemPrice must be numerical."
                            }
                        })
                    } else {
                        //set the value
                        setItem({
                            ...item,
                            price: {
                                ...item.price,
                                value: e.target.value,
                                warning: ""
                            }
                        })
                    }
                }
                break;

            case "ItemDescription":
                if (e.target.value === "") {
                    setItem({
                        ...item,
                        description: {
                            ...item.description,
                            value: "",
                            warning: "ItemDescription is required."
                        }
                    })
                } else {
                    //check whether it matches the pattern or not
                    if (!(/^[a-zA-Z0-9. ]*$/).test(e.target.value)) {
                        setItem({
                            ...item,
                            description: {
                                ...item.description,
                                warning: "ItemDescription must be alphanumerical."
                            }
                        })
                    } else if (e.target.value.length > 300) {
                        setItem({
                            ...item,
                            description: {
                                ...item.description,
                                warning: "ItemDescription must be withing 300 letters."
                            }
                        })
                    } else {
                        //set the value
                        setItem({
                            ...item,
                            description: {
                                ...item.description,
                                value: e.target.value,
                                warning: ""
                            }
                        })
                    }
                }
                break;

            default:
                break;
        }
    }

    function AddToMenu(e) {
        e.preventDefault();
        //clear every warning

        if ((pwd.value.length < 10) || (pwd.value.length > 30) || (item.name.value.length === 0) || (item.name.value.length > 30) || (item.description.value.length === 0)) {
            //check for the errors
            const warning = {
                pwd: "",
                name: "",
                description: ""
            }
            if ((pwd.value.length < 10) || (pwd.value.length > 30)) {
                warning.pwd = (pwd.value === "") ? "password is required." : "Password must be 10 to 30 letters long.";
            }
            if ((item.name.value.length === 0) || (item.name.value.length > 30)) {
                warning.name = (item.name.value === "") ? "ItemName is required." : "ItemName must be within 30 characters."
            }
            if (item.description.value.length === 0) {
                warning.description = "ItemDescription is required."
            }
            setPwd({
                ...pwd,
                warning: warning.pwd
            });
            setItem({
                ...item,
                name: {
                    ...item.name,
                    warning: warning.name
                },
                description: {
                    ...item.description,
                    warning: warning.description
                }
            })
        } else {
            //add the item into the database table menu after checking the credentials
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
                    fetch('/API/menu', {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user: userStore.getState().loggedInUser.username,
                            item_name: item.name.value,
                            item_price: Number(item.price.value),
                            item_description: item.description.value
                        })
                    }).then(response => {
                        if (response.status === 500) {
                            return undefined;
                        }
                        return response.json();
                    }).then(data => {
                        console.log(data);
                        setItem({
                            ...item,
                            name: {
                                ...item.name,
                                value: ""
                            },
                            price: {
                                ...item.price,
                                value: ""
                            },
                            description: {
                                ...item.description,
                                value: ""
                            }
                        });
                        if (data === undefined) {
                            window.alert("Unsuccessfull in Adding item to Menu.");
                        } else {
                            window.alert("Item Added to Menu successfully.");
                            window.location.reload();
                        }
                    })
                }
            })
        }
    }

    return (
        <Modal
            open={open}
            disableEnforceFocus={true}
            onClose={() => {
                setOpen(false)
                setOpenCard(false)
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
                                <InputLabel htmlFor="ItemName" error={item.name.warning !== ""}>ItemName</InputLabel>
                                <FilledInput
                                    type="text"
                                    id="ItemName"
                                    label="ItemName"
                                    name="ItemName"
                                    value={item.name.value}
                                    error={item.name.warning !== ""}
                                    onChange={(event) => handleChange(event)}
                                    aria-describedby="my-helper-text-itemname"
                                />
                                <FormHelperText id="my-helper-text-itemname" error={item.name.warning !== ""}>{item.name.warning}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                variant="filled"
                                fullWidth
                            >
                                <InputLabel htmlFor="ItemPrice" error={item.price.warning !== ""}>ItemPrice</InputLabel>
                                <FilledInput
                                    type="text"
                                    id="ItemPrice"
                                    label="ItemPrice"
                                    name="ItemPrice"
                                    value={item.price.value}
                                    error={item.price.warning !== ""}
                                    onChange={(event) => handleChange(event)}
                                    aria-describedby="my-helper-text-itemprice"
                                />
                                <FormHelperText id="my-helper-text-itemprice" error={item.price.warning !== ""}>{item.price.warning}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                variant="filled"
                                fullWidth
                            >
                                <InputLabel htmlFor="ItemDescription" error={item.description.warning !== ""}>ItemDescription</InputLabel>
                                <FilledInput
                                    multiline
                                    type="text"
                                    id="ItemDescription"
                                    label="ItemDescription"
                                    name="ItemDescription"
                                    value={item.description.value}
                                    error={item.description.warning !== ""}
                                    onChange={(event) => handleChange(event)}
                                    aria-describedby="my-helper-text-itemdescription"
                                />
                                <FormHelperText id="my-helper-text-itemdescription" error={item.description.warning !== ""}>{item.description.warning}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        title="Add"
                        onClick={(event) => AddToMenu(event)}
                    >
                        <FileUploadIcon />
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        title="Add"
                        onClick={() => {
                            setOpen(false);
                            setOpenCard(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </CardActions>
            </Card>
        </Modal >
    );
};

export default AddItem;