"""Routes API pour la gestion des boutiques"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

from config import settings
from models.store import StoreCreate, StoreUpdate, StoreInDB
from auth.supabase_auth import get_current_user

router = APIRouter(prefix="/api/stores", tags=["stores"])

# MongoDB client (will be injected)
db = None

def get_database():
    global db
    if db is None:
        client = AsyncIOMotorClient(settings.mongo_url)
        db = client.easyshop
    return db

@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_store(
    store: StoreCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Créer une nouvelle boutique pour l'utilisateur connecté
    """
    database = get_database()
    
    # Vérifier que l'user_id correspond
    if store.user_id != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Non autorisé à créer une boutique pour un autre utilisateur"
        )
    
    # Créer le document boutique
    store_dict = store.model_dump()
    store_dict["created_at"] = datetime.utcnow()
    store_dict["updated_at"] = datetime.utcnow()
    store_dict["is_active"] = True
    
    result = await database.stores.insert_one(store_dict)
    store_dict["id"] = str(result.inserted_id)
    
    return {"success": True, "store": store_dict}

@router.get("", response_model=dict)
async def get_user_stores(
    current_user: dict = Depends(get_current_user)
):
    """
    Récupérer toutes les boutiques de l'utilisateur connecté
    """
    database = get_database()
    
    stores = await database.stores.find(
        {"user_id": current_user["user_id"], "is_active": True},
        {"_id": 0}
    ).to_list(100)
    
    return {"stores": stores, "count": len(stores)}

@router.get("/{store_id}", response_model=dict)
async def get_store(
    store_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Récupérer une boutique spécifique
    """
    database = get_database()
    
    store = await database.stores.find_one(
        {"id": store_id, "user_id": current_user["user_id"]},
        {"_id": 0}
    )
    
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Boutique non trouvée"
        )
    
    return {"store": store}

@router.put("/{store_id}", response_model=dict)
async def update_store(
    store_id: str,
    store_update: StoreUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Mettre à jour une boutique
    """
    database = get_database()
    
    # Vérifier que la boutique existe et appartient à l'utilisateur
    existing_store = await database.stores.find_one(
        {"id": store_id, "user_id": current_user["user_id"]}
    )
    
    if not existing_store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Boutique non trouvée"
        )
    
    # Mettre à jour
    update_data = {k: v for k, v in store_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await database.stores.update_one(
        {"id": store_id},
        {"$set": update_data}
    )
    
    updated_store = await database.stores.find_one({"id": store_id}, {"_id": 0})
    
    return {"success": True, "store": updated_store}

@router.delete("/{store_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_store(
    store_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Supprimer une boutique (soft delete)
    """
    database = get_database()
    
    result = await database.stores.update_one(
        {"id": store_id, "user_id": current_user["user_id"]},
        {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Boutique non trouvée"
        )
    
    return None
