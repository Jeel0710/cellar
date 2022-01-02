import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import Pricing from "../components/Pricing";
import RemoveShop from "../components/RemoveShop";

import UpdateUser from "../components/UpdateUser";
import UserCard from "../components/UserCard";

const Setting = () => {
    let usertype = useSelector(state => state.loggedInUser.usertype);

    return (
        <Container style={{ padding: "1em" }}>
            <Container>
                <UserCard />
            </Container>
            {
                (usertype === 2) &&
                <Container>
                    <Pricing />
                </Container>
            }
            {
                (usertype === 1) &&
                <Container>
                    <RemoveShop />
                </Container>
            }
            <Container>
                <UpdateUser />
            </Container>
        </Container>
    );
}

export default Setting;