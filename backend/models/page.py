"""Modèles Pydantic pour les pages"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PageSection(BaseModel):
    id: str
    type: str
    settings: dict
    order: int

class PageBase(BaseModel):
    title: str
    slug: str
    store_id: str
    sections: List[PageSection] = []
    is_published: bool = False
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class PageCreate(PageBase):
    pass

class PageUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    sections: Optional[List[PageSection]] = None
    is_published: Optional[bool] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class PageInDB(PageBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
