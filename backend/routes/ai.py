"""Routes API pour la génération de contenu IA"""
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
import json

from services.ai_service import ai_generator
from auth.supabase_auth import get_current_user

router = APIRouter(prefix="/api/ai", tags=["ai-generation"])

class StoreGenerationRequest(BaseModel):
    business_type: str
    brand_name: str
    product_url: Optional[str] = None
    target_audience: str = "clients africains"
    sections: List[str] = ["hero", "features", "about", "cta"]

class ProductDescriptionRequest(BaseModel):
    product_name: str
    category: str
    features: List[str] = []

@router.post("/generate-store-content")
async def generate_store_content(
    request: StoreGenerationRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Générer du contenu complet pour une boutique e-commerce
    Utilise GPT-5 (primary) et Claude Sonnet (fallback) via Emergent LLM Key GRATUIT
    """
    try:
        # Générer le contenu avec l'IA
        content = await ai_generator.generate_store_content(
            business_type=request.business_type,
            brand_name=request.brand_name,
            target_audience=request.target_audience,
            sections=request.sections
        )
        
        # Parser les réponses JSON (l'IA retourne du JSON)
        parsed_content = {}
        for section, raw_content in content.items():
            try:
                # Nettoyer et parser le JSON
                cleaned = raw_content.strip()
                if cleaned.startswith("```json"):
                    cleaned = cleaned[7:]
                if cleaned.startswith("```"):
                    cleaned = cleaned[3:]
                if cleaned.endswith("```"):
                    cleaned = cleaned[:-3]
                parsed_content[section] = json.loads(cleaned.strip())
            except json.JSONDecodeError:
                # Si le parsing échoue, retourner le contenu brut
                parsed_content[section] = {"raw": raw_content}
        
        return {
            "success": True,
            "content": parsed_content,
            "model_used": "gpt-5"
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la génération: {str(e)}"
        )

@router.post("/generate-product-description")
async def generate_product_description(
    request: ProductDescriptionRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Générer une description de produit optimisée SEO
    """
    try:
        description = await ai_generator.generate_product_description(
            product_name=request.product_name,
            category=request.category,
            features=request.features
        )
        
        # Parser le JSON
        try:
            cleaned = description.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            parsed_description = json.loads(cleaned.strip())
        except json.JSONDecodeError:
            parsed_description = {"raw": description}
        
        return {
            "success": True,
            "description": parsed_description
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la génération: {str(e)}"
        )

@router.post("/test-generation")
async def test_ai_generation():
    """
    Endpoint de test pour vérifier que l'IA fonctionne (pas d'auth requise)
    """
    try:
        test_prompt = "Dis 'Bonjour depuis GPT-5!' et rien d'autre."
        response = await ai_generator.generate_content(
            prompt=test_prompt,
            system_message="Tu es un assistant test."
        )
        
        return {
            "success": True,
            "response": response,
            "message": "IA fonctionnelle !"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
