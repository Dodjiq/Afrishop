"""Configuration centralisée pour l'application"""
import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # MongoDB
    mongo_url: str = os.getenv("MONGO_URL", "")
    
    # Supabase
    supabase_url: str = os.getenv("SUPABASE_URL", "")
    supabase_key: str = os.getenv("SUPABASE_KEY", "")
    supabase_jwt_secret: str = os.getenv("SUPABASE_JWT_SECRET", "")
    
    # Emergent LLM Key (gratuit)
    emergent_llm_key: str = os.getenv("EMERGENT_LLM_KEY", "sk-emergent-990E10e8eB875B9A0C")
    
    # App config
    app_name: str = "EasyShop Africa API"
    debug: bool = True
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
