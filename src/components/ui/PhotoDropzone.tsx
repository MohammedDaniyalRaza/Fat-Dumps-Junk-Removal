import React, { useRef, useState } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';
import './ui.css';

export interface SelectedPhoto {
  id: string;
  name: string;
  previewUrl: string;
  sizeBytes: number;
}

interface PhotoDropzoneProps {
  photos: SelectedPhoto[];
  onAddFiles: (files: File[]) => void;
  onRemovePhoto: (id: string) => void;
  maxPhotos?: number;
}

export const PhotoDropzone: React.FC<PhotoDropzoneProps> = ({
  photos,
  onAddFiles,
  onRemovePhoto,
  maxPhotos = 8,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const valid = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (valid.length > 0) {
      onAddFiles(valid);
    }
  };

  const remaining = Math.max(0, maxPhotos - photos.length);

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Add photos of items for your free estimate"
        data-dragging={dragging}
        className="fd-dropzone"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(132, 224, 27, 0.14)',
            border: '1px solid rgba(132, 224, 27, 0.45)',
            color: 'var(--lime)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          {photos.length === 0 ? <Camera size={24} /> : <ImagePlus size={24} />}
        </div>
        <p className="t-display-md" style={{ color: 'var(--white)' }}>
          {remaining > 0 ? 'Drop photos here or tap to add' : `Maximum ${maxPhotos} photos added`}
        </p>
        <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '6px' }}>
          Up to {maxPhotos} photos stay privately in your browser while you prepare your quote.{' '}
          <span style={{ color: 'var(--lime)' }}>
            {photos.length}/{maxPhotos} selected
          </span>
        </p>
      </div>

      {photos.length > 0 && (
        <div className="fd-photo-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="fd-photo-thumb">
              <img src={photo.previewUrl} alt={`Selected item preview: ${photo.name}`} />
              <button
                type="button"
                className="fd-photo-remove"
                aria-label={`Remove photo ${photo.name}`}
                onClick={() => onRemovePhoto(photo.id)}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
