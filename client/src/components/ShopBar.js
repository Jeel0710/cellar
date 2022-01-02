import { Container, Grid, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from "@mui/material";
import { useState, useEffect } from "react";

function ShopBar() {
    //Store the value of the search bar
    const [search, setSearch] = useState("");
    //Store the search results of the query
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        //fetch data from the users database using fetch API
        fetch('/API/findshop', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search })
        })
            .then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(data => {
                if (data === undefined) {
                    //if the the search is wrong then throw warning
                    setSearchList([]);
                } else {
                    setSearchList(data);
                }
            });
        return () => {
            return true;
        }
    }, [search]);

    return (
        <Container style={{ padding: "1em" }}>
            {/* Search which query the users table */}
            <Container>
                <Grid container item direction="column" justify="center" alignItems="center" xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="searchbar" variant="outlined" error={false}>Searchbar</InputLabel>
                        <OutlinedInput
                            id="searchbar"
                            type="text"
                            name="searchbar"
                            label="searchbar"
                            error={false}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoComplete="off"
                            endAdornment={
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton
                                        aria-label="searchbar"
                                        edge="end"
                                        onClick={() => document.getElementById("searchbar").focus()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </Container>
            <Container>
                {/* Result are Shown Here */}
                {
                    searchList.length !== 0 &&
                    <>
                        <h6>List:</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ShopName</th>
                                    <th scope="col">ShopOwner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchList.map((user, i) =>
                                        <tr key={i}>
                                            <td>{user.shop_name}</td>
                                            <td>{user.shop_owner}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </>
                }
            </Container>
        </Container>
    );

}

export default ShopBar;