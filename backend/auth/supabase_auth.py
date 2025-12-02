"""Middleware d'authentification Supabase"""
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from config import settings

security = HTTPBearer(auto_error=False)

async def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    Vérifie le JWT token Supabase localement
    
    Args:
        credentials: Les credentials HTTP avec le token Bearer
        
    Returns:
        dict: Le payload du token décodé contenant user_id, email, etc.
        
    Raises:
        HTTPException: Si le token est invalide ou expiré
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Bearer token requis",
            headers={"WWW-Authenticate": 'Bearer realm="auth_required"'}
        )
    
    try:
        # Décoder le JWT token avec le secret Supabase
        payload = jwt.decode(
            credentials.credentials,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return payload
    
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expiré"
        )
    
    except jwt.exceptions.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide"
        )

async def get_current_user(
    token_payload: dict = Depends(verify_token)
) -> dict:
    """
    Extrait les informations utilisateur du token JWT vérifié
    
    Args:
        token_payload: Le payload du token décodé
        
    Returns:
        dict: Informations de l'utilisateur (user_id, email)
    """
    user_id = token_payload.get("sub")
    email = token_payload.get("email")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Payload du token invalide"
        )
    
    return {
        "user_id": user_id,
        "email": email
    }
