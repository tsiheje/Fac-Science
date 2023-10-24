// requireAuth.js

const jwt = require('jsonwebtoken');
const secretKey = 'votre_secret_key_secrete'; 

function requireAuth(req, res, next) {
  
  const token = req.headers.authorization;

  
  if (!token) {
    return res.status(401).json({ error: 'Authentification requise.' });
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide.' });
  }
}

module.exports = requireAuth;
