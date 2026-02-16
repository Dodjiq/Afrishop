"""Modèles Pydantic pour les boutiques"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class StoreBase(BaseModel):
    name: str
    description: Optional[str] = None
    industry: str  # fashion, electronics, beauty, food, etc.
    logo_url: Optional[str] = None
    domain: Optional[str] = None
    settings: Optional[dict] = {}

class StoreCreate(StoreBase):
    user_id: str

class StoreUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    logo_url: Optional[str] = None
    domain: Optional[str] = None
    settings: Optional[dict] = None

class StoreInDB(StoreBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    is_active: bool = True

    class Config:
        from_attributes = True
