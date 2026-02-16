"""Modèles Pydantic pour les produits"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProductImage(BaseModel):
    url: str
    alt: Optional[str] = None
    order: int = 0

class ProductVariant(BaseModel):
    id: str
    name: str
    price: float
    compare_at_price: Optional[float] = None
    sku: Optional[str] = None
    stock: int = 0

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    store_id: str
    price: float
    compare_at_price: Optional[float] = None
    images: List[ProductImage] = []
    variants: List[ProductVariant] = []
    category: Optional[str] = None
    tags: List[str] = []
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    compare_at_price: Optional[float] = None
    images: Optional[List[ProductImage]] = None
    variants: Optional[List[ProductVariant]] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    is_active: Optional[bool] = None

class ProductInDB(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
