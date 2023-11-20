import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

const Mdp = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className="mdp-contenu">
            <div className="mdp-anaty">
                <div className="ferme" onClick={onClose}>X</div>
                <form>
                    <TextField
                            margin="normal"
                            fullWidth
                            name="Mot_de_passe"
                            label="Mot de passe actuelle"
                            type={showPassword ? "text" : "password"}
                            id="Mot_de_passe"
                            autoComplete="current-password"
                            // onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => setShowPassword(!showPassword)}
                                      edge="end"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="Mot_de_passe"
                            label="Nouveau mot de passe"
                            type={showPassword ? "text" : "password"}
                            id="Mot_de_passe"
                            autoComplete="current-password"
                            // onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => setShowPassword(!showPassword)}
                                      edge="end"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="Mot_de_passe"
                            label="Confirmation de mot de passe"
                            type={showPassword ? "text" : "password"}
                            id="Mot_de_passe"
                            autoComplete="current-password"
                            // onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => setShowPassword(!showPassword)}
                                      edge="end"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                        Changer le mot de passe 
                        </Button>
                </form>
            </div>
        </div>
    )
}

export default Mdp;