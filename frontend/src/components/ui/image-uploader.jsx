import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Upload, Trash2, Star, GripVertical, Loader2, Image as ImageIcon, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export function ImageUploader({
  images = [],
  onImagesChange,
  maxImages = 10,
  maxSizeMB = 5,
  acceptedFormats = ['image/png', 'image/jpeg', 'image/webp'],
  className
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const compressImage = async (file, maxWidth = 1920, quality = 0.85) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (e) => {
        const img = new window.Image();
        img.src = e.target?.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const compressed = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressed);
            },
            'image/jpeg',
            quality
          );
        };
      };
    });
  };

  const handleFiles = async (files) => {
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images autorisées`);
      return;
    }

    setUploading(true);
    setProgress(0);
    const uploaded = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Vérification format
      if (!acceptedFormats.includes(file.type)) {
        toast.error(`Format non supporté: ${file.name}`);
        continue;
      }

      // Vérification taille
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`${file.name} dépasse ${maxSizeMB}MB`);
        continue;
      }

      try {
        // Compression
        const compressed = await compressImage(file);
        
        // Créer une URL locale pour la preview (mock upload)
        const url = URL.createObjectURL(compressed);
        uploaded.push(url);
        
        setProgress(((i + 1) / files.length) * 100);
      } catch (err) {
        console.error(err);
        toast.error(`Échec upload: ${file.name}`);
      }
    }

    onImagesChange([...images, ...uploaded]);
    setUploading(false);
    setProgress(0);
    
    if (uploaded.length > 0) {
      toast.success(`${uploaded.length} image(s) ajoutée(s)`);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, [images, maxImages]);

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.indexOf(active.id);
    const newIndex = images.indexOf(over.id);
    
    const reordered = arrayMove(images, oldIndex, newIndex);
    onImagesChange(reordered);
    toast.success('Images réorganisées');
  };

  const removeImage = (url) => {
    // Révoquer l'URL pour libérer la mémoire
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
    onImagesChange(images.filter(i => i !== url));
    toast.success('Image supprimée');
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Zone Drop */}
      {images.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
            dragActive 
              ? 'border-orange-500 bg-orange-500/10 scale-[1.02]' 
              : 'border-white/20 hover:border-white/40 bg-white/5',
            uploading && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          <input
            type="file"
            multiple
            accept={acceptedFormats.join(',')}
            onChange={handleInputChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {uploading ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 mx-auto text-orange-500 animate-spin" />
              <p className="font-medium text-white">Upload en cours... {Math.round(progress)}%</p>
              <Progress value={progress} className="h-2 max-w-xs mx-auto" />
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {dragActive ? '📦 Déposez vos images' : '☁️ Uploadez vos images'}
              </h3>
              <p className="text-sm text-gray-400">
                PNG, JPG, WEBP · Max {maxSizeMB}MB · {images.length}/{maxImages} images
              </p>
            </>
          )}
        </div>
      )}

      {/* Grille avec Drag & Drop */}
      {images.length > 0 && (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {images.map((url, idx) => (
                  <SortableImage
                    key={url}
                    url={url}
                    index={idx}
                    onRemove={() => removeImage(url)}
                    isPrimary={idx === 0}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Info className="w-4 h-4" />
          <span>Glissez pour réorganiser · La 1ère image est l'image principale</span>
        </div>
      )}
    </div>
  );
}

function SortableImage({ url, index, onRemove, isPrimary }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={cn(
        'relative group aspect-square rounded-xl overflow-hidden border-2 transition-all',
        isDragging ? 'border-orange-500 shadow-2xl' : 'border-white/10 hover:border-orange-500/50'
      )}
    >
      <img 
        src={url} 
        alt={`Image ${index + 1}`} 
        className="w-full h-full object-cover" 
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        
        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Badges */}
      {isPrimary && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          Principale
        </div>
      )}
      
      <div className="absolute bottom-2 right-2 w-7 h-7 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xs">
        {index + 1}
      </div>
    </motion.div>
  );
}

export default ImageUploader;
