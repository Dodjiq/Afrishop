"""Service de génération de contenu IA avec Emergent LLM Key"""
import asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage
from config import settings
from typing import Dict, List, Optional
import logging

logger = logging.getLogger(__name__)

class AIContentGenerator:
    """Générateur de contenu IA utilisant OpenAI GPT-5 (primary) et Claude (fallback)"""
    
    def __init__(self):
        self.api_key = settings.emergent_llm_key
        self.primary_model = ("openai", "gpt-5")
        self.fallback_model = ("anthropic", "claude-sonnet-4-20250514")
    
    async def generate_content(
        self,
        prompt: str,
        system_message: str = "Vous êtes un expert en e-commerce qui crée du contenu marketing professionnel en français.",
        use_fallback: bool = False
    ) -> str:
        """
        Génère du contenu avec le modèle IA
        
        Args:
            prompt: Le prompt de génération
            system_message: Le message système pour guider le modèle
            use_fallback: Si True, utilise Claude au lieu de GPT-5
            
        Returns:
            str: Le contenu généré
        """
        model_provider, model_name = self.fallback_model if use_fallback else self.primary_model
        
        try:
            # Créer une nouvelle instance de chat pour chaque requête
            chat = LlmChat(
                api_key=self.api_key,
                session_id=f"content-gen-{asyncio.current_task().get_name()}",
                system_message=system_message
            ).with_model(model_provider, model_name)
            
            # Envoyer le message
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            
            return response
        
        except Exception as e:
            logger.error(f"Erreur avec {model_provider}/{model_name}: {str(e)}")
            
            # Si c'est le modèle primary qui échoue, essayer le fallback
            if not use_fallback:
                logger.info("Tentative avec le modèle fallback...")
                return await self.generate_content(prompt, system_message, use_fallback=True)
            
            raise Exception(f"Échec de génération avec tous les modèles: {str(e)}")
    
    async def generate_store_content(
        self,
        business_type: str,
        brand_name: str,
        target_audience: str = "clients africains",
        sections: List[str] = None
    ) -> Dict[str, any]:
        """
        Génère du contenu complet pour une boutique e-commerce
        
        Args:
            business_type: Type de business (fashion, electronics, beauty, etc.)
            brand_name: Nom de la marque
            target_audience: Public cible
            sections: Liste des sections à générer (hero, features, about, etc.)
            
        Returns:
            Dict contenant le contenu généré pour chaque section
        """
        if sections is None:
            sections = ["hero", "features", "about", "cta"]
        
        content = {}
        
        # Génération du Hero
        if "hero" in sections:
            hero_prompt = f"""
Crée un contenu de section Hero pour une boutique e-commerce {business_type} nommée "{brand_name}".
Public cible: {target_audience}

Réponds UNIQUEMENT avec un objet JSON structuré comme ceci:
{{
  "heading": "Titre principal accrocheur (max 10 mots)",
  "subheading": "Sous-titre descriptif (max 20 mots)",
  "cta_primary": "Texte bouton principal",
  "cta_secondary": "Texte bouton secondaire"
}}

Pas de texte supplémentaire, juste le JSON.
"""
            content["hero"] = await self.generate_content(hero_prompt)
        
        # Génération des Features
        if "features" in sections:
            features_prompt = f"""
Crée 4 fonctionnalités/avantages clés pour une boutique e-commerce {business_type} en Afrique.
Nom de la marque: {brand_name}

Réponds UNIQUEMENT avec un objet JSON:
{{
  "heading": "Titre de la section",
  "subheading": "Sous-titre",
  "features": [
    {{
      "title": "Titre de la fonctionnalité",
      "description": "Description courte",
      "icon": "truck|shield|support|award"
    }}
  ]
}}
"""
            content["features"] = await self.generate_content(features_prompt)
        
        # Génération About
        if "about" in sections:
            about_prompt = f"""
Crée une section "À Propos" engageante pour {brand_name}, une entreprise {business_type} en Afrique.

Réponds UNIQUEMENT avec un objet JSON:
{{
  "heading": "Titre",
  "paragraphs": ["paragraphe 1", "paragraphe 2", "paragraphe 3"]
}}
"""
            content["about"] = await self.generate_content(about_prompt)
        
        # Génération CTA
        if "cta" in sections:
            cta_prompt = f"""
Crée une section Call-to-Action finale pour {brand_name}.

Réponds UNIQUEMENT avec un objet JSON:
{{
  "heading": "Titre motivant",
  "text": "Texte persuasif",
  "button_text": "Texte du bouton"
}}
"""
            content["cta"] = await self.generate_content(cta_prompt)
        
        return content
    
    async def generate_product_description(
        self,
        product_name: str,
        category: str,
        features: List[str] = None
    ) -> Dict[str, str]:
        """
        Génère une description de produit optimisée
        
        Args:
            product_name: Nom du produit
            category: Catégorie du produit
            features: Liste des caractéristiques principales
            
        Returns:
            Dict avec title, short_description, long_description
        """
        features_str = "\n".join([f"- {f}" for f in (features or [])])
        
        prompt = f"""
Crée une description de produit e-commerce professionnelle pour:

Nom: {product_name}
Catégorie: {category}
Caractéristiques:
{features_str}

Réponds UNIQUEMENT avec un objet JSON:
{{
  "title": "Titre produit optimisé SEO",
  "short_description": "Description courte accrocheuse (1-2 phrases)",
  "long_description": "Description détaillée (3-4 paragraphes)",
  "seo_keywords": ["mot-clé1", "mot-clé2", "mot-clé3"]
}}
"""
        
        return await self.generate_content(prompt)

# Instance globale
ai_generator = AIContentGenerator()
