import { Container, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import not_found from '../Images/not_found.svg';

const NotFound = () => {
    return (
        <Container>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{
                    marginTop: 50
                }}
            >
                <Grid item xs={12} component="h3">
                    Page Not Found
                </Grid>
                <Grid item xs={12}>
                    <img src={not_found} alt="Not Found" width="200vw" />
                </Grid>
                <Grid item xs={12}>
                    {/* link to the home page. */}
                    Please go to the <NavLink to="/" style={{ color: '#F78BB2' }}>Home page</NavLink>.
                </Grid>
            </Grid>
        </Container>
    );
}

export default NotFound;