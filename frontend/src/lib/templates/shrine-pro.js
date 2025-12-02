// Templates Shrine Pro pour EasyShop
// Basé sur le thème Shopify Premium Shrine Pro

export const SHRINE_PRO_TEMPLATES = {
  // Configuration globale du thème
  theme: {
    name: 'Shrine Pro',
    version: '1.0.0',
    colors: {
      primary: '#6d388b',        // Violet Shrine
      secondary: '#2e2a39',      // Gris foncé
      accent: '#dd1d1d',         // Rouge accent
      background1: '#ffffff',    // Fond principal
      background2: '#f7f7f7',    // Fond secondaire
      text: '#2e2a39',
      textMuted: '#6b7280'
    },
    typography: {
      headingFont: 'Sora',
      bodyFont: 'Lato',
      headingSizes: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.5rem'
      }
    },
    spacing: {
      sectionPaddingTop: 68,
      sectionPaddingBottom: 52
    }
  },

  // Template Page 404
  page404: {
    sections: {
      main: {
        type: 'main-404',
        settings: {
          title: 'Page non trouvée',
          subtitle: 'Désolé, cette page n\'existe pas ou a été déplacée.',
          buttonText: 'Retour à l\'accueil',
          buttonLink: '/'
        }
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Inscrivez-vous à notre newsletter',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives et les dernières nouvelles.'
            }
          },
          {
            type: 'email_form',
            settings: {
              buttonText: 'S\'inscrire',
              placeholder: 'Votre email'
            }
          }
        ],
        settings: {
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['main', 'newsletter']
  },

  // Template Article/Blog Post
  article: {
    sections: {
      main: {
        type: 'main-article',
        blocks: [
          {
            type: 'featured_image',
            settings: { imageHeight: 'large' }
          },
          {
            type: 'title',
            settings: {
              showDate: true,
              showAuthor: false
            }
          },
          {
            type: 'share',
            settings: { shareLabel: 'Partager' }
          },
          {
            type: 'content',
            settings: {}
          }
        ],
        settings: {}
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Inscrivez-vous à notre newsletter',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives.'
            }
          },
          {
            type: 'email_form',
            settings: {}
          }
        ],
        settings: {
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['main', 'newsletter']
  },

  // Template Blog
  blog: {
    sections: {
      main: {
        type: 'main-blog',
        settings: {
          layout: 'grid',
          showImage: true,
          imageHeight: 'medium',
          showDate: true,
          showAuthor: false,
          paddingTop: 0,
          paddingBottom: 64
        }
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Inscrivez-vous à notre newsletter',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives.'
            }
          },
          {
            type: 'email_form',
            settings: {}
          }
        ],
        settings: {
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['main', 'newsletter']
  },

  // Template Panier
  cart: {
    sections: {
      cartItems: {
        type: 'main-cart-items',
        settings: {
          paddingTop: 0,
          paddingBottom: 24
        }
      },
      cartFooter: {
        type: 'main-cart-footer',
        blocks: [
          {
            type: 'discount_field',
            disabled: true,
            settings: {}
          },
          {
            type: 'subtotal',
            settings: {}
          },
          {
            type: 'buttons',
            settings: {}
          }
        ],
        settings: {}
      },
      featuredCollection: {
        type: 'featured-collection',
        settings: {
          title: 'Vous aimerez aussi',
          headingSize: 'h2',
          description: '',
          showDescription: false,
          descriptionStyle: 'body',
          collection: 'all',
          productsToShow: 4,
          columnsDesktop: 4,
          fullWidth: false,
          showViewAll: true,
          viewAllStyle: 'solid',
          enableDesktopSlider: false,
          colorScheme: 'background-1',
          imageRatio: 'square',
          showSecondaryImage: false,
          showVendor: false,
          showRating: false,
          enableQuickAdd: false,
          columnsMobile: '2',
          swipeOnMobile: false,
          paddingTop: 100,
          paddingBottom: 100
        }
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Inscrivez-vous à notre newsletter',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives.'
            }
          },
          {
            type: 'email_form',
            settings: {}
          }
        ],
        settings: {
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['cartItems', 'cartFooter', 'featuredCollection', 'newsletter']
  },

  // Template Collection
  collection: {
    sections: {
      collectionBanner: {
        type: 'main-collection-banner',
        settings: {
          showCollectionDescription: true,
          showCollectionImage: true,
          colorScheme: 'background-1'
        }
      },
      productGrid: {
        type: 'main-collection-product-grid',
        settings: {
          productsPerPage: 20,
          columnsDesktop: 4,
          stretchCards: false,
          imageRatio: 'adapt',
          showSecondaryImage: true,
          badges: 'regular',
          showVendor: false,
          showRating: false,
          enableQuickAdd: true,
          swatchesOptionName: '',
          swatchesPosition: 'top',
          swatchesDesktopSize: 36,
          swatchesMobileSize: 24,
          enableFiltering: true,
          filterType: 'horizontal',
          enableSorting: true,
          columnsMobile: '2',
          paddingTop: 0,
          paddingBottom: 36
        }
      },
      collage: {
        type: 'collage',
        blocks: [
          {
            type: 'product',
            settings: {
              product: '',
              secondImage: false
            }
          },
          {
            type: 'collection',
            settings: {
              collection: 'all'
            }
          }
        ],
        disabled: true,
        settings: {
          displayId: false,
          visibility: 'always-display',
          title: 'Collage multimédia',
          titleHighlightColor: '#6d388b',
          headingSize: 'h2',
          desktopLayout: 'right',
          mobileLayout: 'collage',
          cardStyles: 'product-card-wrapper',
          colorScheme: 'background-1',
          paddingTop: 16,
          paddingBottom: 64
        }
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              title: 'Inscrivez-vous à notre newsletter',
              titleHighlightColor: '#6d388b',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives.'
            }
          },
          {
            type: 'email_form',
            settings: {}
          }
        ],
        settings: {
          displayId: false,
          visibility: 'always-display',
          buttonType: 'solid',
          buttonLabel: 'S\'inscrire',
          buttonStyleSecondary: false,
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['collectionBanner', 'productGrid', 'collage', 'newsletter']
  },

  // Template Page Produit
  product: {
    sections: {
      main: {
        type: 'main-product',
        blocks: [
          {
            type: 'title',
            settings: {}
          },
          {
            type: 'price',
            settings: {}
          },
          {
            type: 'variant_picker',
            settings: {
              pickerType: 'button'
            }
          },
          {
            type: 'quantity_selector',
            settings: {}
          },
          {
            type: 'buy_buttons',
            settings: {
              showDynamicCheckout: true
            }
          },
          {
            type: 'description',
            settings: {}
          },
          {
            type: 'share',
            settings: {
              shareLabel: 'Partager'
            }
          }
        ],
        settings: {
          enableStickyInfo: true,
          mediaSize: 'large',
          constrainImageHeight: false,
          mediaFit: 'contain',
          galleryLayout: 'thumbnail_slider',
          mobileLayout: 'stacked',
          hiddenProductVariants: false,
          enableVideoLooping: false,
          paddingTop: 36,
          paddingBottom: 12
        }
      },
      productRecommendations: {
        type: 'product-recommendations',
        settings: {
          heading: 'Vous aimerez aussi',
          headingSize: 'h2',
          productsToShow: 4,
          columnsDesktop: 4,
          colorScheme: 'background-1',
          imageRatio: 'square',
          showSecondaryImage: false,
          showVendor: false,
          showRating: false,
          columnsMobile: '2',
          paddingTop: 36,
          paddingBottom: 36
        }
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Inscrivez-vous à notre newsletter',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives.'
            }
          },
          {
            type: 'email_form',
            settings: {}
          }
        ],
        settings: {
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['main', 'productRecommendations', 'newsletter']
  },

  // Template Page d'accueil
  homepage: {
    sections: {
      hero: {
        type: 'image-banner',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Bienvenue dans notre boutique',
              headingSize: 'h1'
            }
          },
          {
            type: 'text',
            settings: {
              text: 'Découvrez nos produits de qualité'
            }
          },
          {
            type: 'buttons',
            settings: {
              button1Label: 'Découvrir',
              button1Link: '/collections/all',
              button2Label: '',
              button2Link: ''
            }
          }
        ],
        settings: {
          imageOverlayOpacity: 40,
          imageHeight: 'large',
          desktopContentPosition: 'middle-center',
          showTextBox: true,
          desktopContentAlignment: 'center',
          colorScheme: 'background-1',
          mobileContentAlignment: 'center',
          stackImagesOnMobile: true,
          showTextBelow: false
        }
      },
      featuredCollection: {
        type: 'featured-collection',
        settings: {
          title: 'Nos Produits Populaires',
          headingSize: 'h2',
          collection: 'all',
          productsToShow: 8,
          columnsDesktop: 4,
          fullWidth: false,
          showViewAll: true,
          viewAllStyle: 'solid',
          enableDesktopSlider: true,
          colorScheme: 'background-1',
          imageRatio: 'adapt',
          showSecondaryImage: true,
          showVendor: false,
          showRating: true,
          enableQuickAdd: true,
          columnsMobile: '2',
          paddingTop: 36,
          paddingBottom: 36
        }
      },
      richText: {
        type: 'rich-text',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Notre Histoire',
              headingSize: 'h2'
            }
          },
          {
            type: 'text',
            settings: {
              text: '<p>Nous sommes passionnés par la qualité et le service client.</p>'
            }
          },
          {
            type: 'button',
            settings: {
              buttonLabel: 'En savoir plus',
              buttonLink: '/pages/about'
            }
          }
        ],
        settings: {
          desktopContentPosition: 'center',
          contentAlignment: 'center',
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 68
        }
      },
      imageWithText: {
        type: 'image-with-text',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Qualité Premium',
              headingSize: 'h2'
            }
          },
          {
            type: 'text',
            settings: {
              text: '<p>Tous nos produits sont sélectionnés avec soin pour vous offrir le meilleur.</p>'
            }
          },
          {
            type: 'button',
            settings: {
              buttonLabel: 'Découvrir',
              buttonLink: '/collections/all'
            }
          }
        ],
        settings: {
          imageWidth: 'medium',
          layout: 'image_first',
          desktopContentPosition: 'middle',
          desktopContentAlignment: 'left',
          contentLayout: 'no-overlap',
          colorScheme: 'background-1',
          mobileContentAlignment: 'left',
          paddingTop: 36,
          paddingBottom: 36
        }
      },
      testimonials: {
        type: 'testimonials',
        blocks: [
          {
            type: 'testimonial',
            settings: {
              quote: 'Excellent service et produits de qualité !',
              author: 'Marie D.',
              rating: 5
            }
          },
          {
            type: 'testimonial',
            settings: {
              quote: 'Livraison rapide, je recommande !',
              author: 'Jean P.',
              rating: 5
            }
          },
          {
            type: 'testimonial',
            settings: {
              quote: 'Très satisfait de mon achat.',
              author: 'Sophie L.',
              rating: 5
            }
          }
        ],
        settings: {
          title: 'Ce que disent nos clients',
          headingSize: 'h2',
          colorScheme: 'background-1',
          paddingTop: 36,
          paddingBottom: 36
        }
      },
      newsletter: {
        type: 'newsletter',
        blocks: [
          {
            type: 'heading',
            settings: {
              heading: 'Inscrivez-vous à notre newsletter',
              headingSize: 'h1'
            }
          },
          {
            type: 'paragraph',
            settings: {
              text: 'Rejoignez notre liste pour des offres exclusives et les dernières nouvelles.'
            }
          },
          {
            type: 'email_form',
            settings: {}
          }
        ],
        settings: {
          colorScheme: 'background-2',
          fullWidth: true,
          paddingTop: 68,
          paddingBottom: 52
        }
      }
    },
    order: ['hero', 'featuredCollection', 'richText', 'imageWithText', 'testimonials', 'newsletter']
  }
};

export default SHRINE_PRO_TEMPLATES;
