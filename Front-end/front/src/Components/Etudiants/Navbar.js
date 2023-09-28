import { AppBar, Stack, Toolbar, Typography, Link } from "@mui/material";

const NavBar = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component='div' sx={{ flexGrow:1 }}>
                    One Note
                </Typography>
                <Stack  direction='row' spacing={3}>
                    <Link href="/Annonces_et_Informations" variant="body2"  underline='none' color='inherit'>
                    {" Annonces et Informations"}
                    </Link>
                    <Link href="/Cours_et_Devoirs" variant="body2"  underline='none' color='inherit'>
                    {" Cours et devoirs"}
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;