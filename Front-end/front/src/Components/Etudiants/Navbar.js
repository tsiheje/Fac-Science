import { AppBar, Stack, Toolbar, Typography, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component='div' sx={{ flexGrow:1 }}>
                    One Note
                </Typography>
                <Stack  direction='row' spacing={3}>
                    <NavLink to="/Etudiant/Annonces_et_Informations" variant="body2"  underline='none' color='inherit'>
                     Annonces et Informations
                    </NavLink>
                    <NavLink to="/Etudiant/Cours_et_Devoirs" variant="body2"  underline='none' color='inherit'>
                    Cours et devoirs
                    </NavLink>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;