"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

const ImageModal = ({ isOpen, onClose, src, alt }: ImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center bg-white"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ImageModal;
