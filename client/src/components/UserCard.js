import { Container, Alert, AlertTitle, Box } from "@mui/material";
import { useSelector } from "react-redux";
const UserCard = () => {
    let user = useSelector(state => state.loggedInUser);
    return (
        <Container>
            <Box component="div" sx={{ mt: 1 }}>
                <Alert severity="info">
                    <AlertTitle>UserName: {user.username}</AlertTitle>
                    UserType: {user.usertype === 0 && "Admin"}
                    {user.usertype === 1 && "ShopOwner"}
                    {user.usertype === 2 && "Customer"}
                </Alert>
            </Box>
        </Container>
    );
};

export default UserCard;