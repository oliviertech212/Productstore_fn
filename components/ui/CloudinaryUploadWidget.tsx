"use client";

import { useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
  buttonText?: string;
  currentImage?: string;
  resourceType?: 'image' | 'video';
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function CloudinaryUploadWidget({
  onUploadSuccess,
  buttonText = "Upload Image",
  currentImage,
  resourceType = 'image',
}: CloudinaryUploadWidgetProps) {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openWidget = () => {
    if (!window.cloudinary) {
      console.error('Cloudinary script not loaded');
      return;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
        resourceType: resourceType,
        clientAllowedFormats: resourceType === 'video' 
          ? ['mp4', 'mov', 'avi', 'webm']
          : ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxFileSize: resourceType === 'video' ? 100000000 : 5000000,
        folder: 'ProductStorecarsells',
        cropping: resourceType === 'image',
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onUploadSuccess(result.info.secure_url);
        }
      }
    );

    widgetRef.current.open();
  };

  return (
    <div className="space-y-3">
      {currentImage && (
        <div className="w-24 h-24 relative border rounded-lg overflow-hidden">
          <img src={currentImage} alt="Current" className="w-full h-full object-contain" />
        </div>
      )}
      <button
        type="button"
        onClick={openWidget}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/50 cursor-pointer transition-colors"
      >
        <Upload size={16} />
        {buttonText}
      </button>
    </div>
  );
}
