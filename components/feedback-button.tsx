"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Drawer } from 'vaul';
import { QRCodeSVG } from 'qrcode.react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { useTranslations } from 'next-intl';

// Define the props for the component, including a URL for the QR code


export default function FeedbackButton() {
  const t = useTranslations('feedbackButton');
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMounted, setHasMounted] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { data: appConfig } = api.common.getAppConfig.useQuery();

  // Initialize position to bottom right and set mounted status
  useEffect(() => {
    // Check if window is defined (for SSR safety)
    if (typeof window !== 'undefined') {
      const initialX = window.innerWidth - 80; // 64px button + 16px margin
      const initialY = window.innerHeight - 80; // 64px button + 16px margin
      setPosition({ x: initialX, y: initialY });
      setHasMounted(true); // Set mounted to true after position is set
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    setIsDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    // Prevent text selection during drag
    e.preventDefault();
  };

  // Add/remove global mouse/touch listeners for dragging
  useEffect(() => {
    // Define handlers inside useEffect to close over correct state
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return; // Should not happen if listener logic is correct, but safe check
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;

      // Boundary checks
      const buttonWidth = buttonRef.current?.offsetWidth ?? 64;
      const buttonHeight = buttonRef.current?.offsetHeight ?? 64;
      newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      // No check needed, just set state
      setIsDragging(false);
      // Removed setTimeout
    };

    // Touch move handler
    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        if (!touch) return;
        let newX = touch.clientX - dragStart.x;
        let newY = touch.clientY - dragStart.y;

        // Boundary checks
        const buttonWidth = buttonRef.current?.offsetWidth ?? 64;
        const buttonHeight = buttonRef.current?.offsetHeight ?? 64;
        newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight));

        setPosition({ x: newX, y: newY });
    };

    // Touch end handler
    const handleTouchEnd = () => {
        setIsDragging(false);
    };


    if (isDragging) {
      // Add listeners when dragging starts
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false }); // passive: false maybe needed if preventDefault is used inside
      window.addEventListener('touchend', handleTouchEnd);
    }

    // Cleanup function: remove listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    // Dependency array only includes state that handlers depend on indirectly
  }, [isDragging, dragStart]); // Simplified dependencies

  // Add Touch Start Handler
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return;

      const touch = e.touches[0];
      if (!touch) return;
      setIsDragging(true);
      const rect = buttonRef.current.getBoundingClientRect();
      setDragStart({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
      });
  };

  const handleClick = () => {
    // Only open modal if not dragging
    if (!isDragging) {
         // Add a slight delay check to ensure mouseup has processed
         setTimeout(() => {
            if (!isDragging) { // Double check dragging state
                setIsOpen(true);
            }
         }, 50); // Small delay to prevent click trigger on drag end
    }
  };

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the main button click
    setIsVisible(false);
  }

  if (!isVisible) {
    return null; // Don't render anything if hidden
  }

  // Prevent rendering until mounted and position is calculated
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart} // Add touch start handler
        className={cn(
          "fixed z-50 w-16 h-16 rounded-full bg-[#02E2E2] text-black shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none transition-opacity duration-300 hover:bg-[#02E2E2]/80",
          isDragging && "opacity-80" // Slightly transparent while dragging
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          touchAction: 'none', // Prevent default touch actions like scrolling
        }}
        aria-label={t('open')}
      >
        <MessageSquare size={24} />
        {/* Small close button */}
        <button
            onClick={handleHide}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-500 transition-colors"
            aria-label={t('hide')}
        >
           <X size={12} />
        </button>
      </div>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content
            aria-describedby={undefined} // Keep this if not using description
            className="bg-zinc-900 flex flex-col rounded-t-[10px] h-[80%] max-h-[80vh] fixed bottom-0 left-0 right-0 z-50 outline-none p-4 text-white"
          >
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-700 mb-4" />
            <div className="max-w-md w-full mx-auto flex-1 overflow-auto flex flex-col items-center justify-center">
              <Drawer.Title className="font-medium mb-4 text-lg">
                {t('title')}
              </Drawer.Title>
              <p className="text-zinc-400 mb-6 text-center">
                {t('scan_prompt')}
              </p>
              <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                {appConfig?.data?.feedback_url ? (
                  <QRCodeSVG value={appConfig.data.feedback_url} size={200} level="H" />
                ) : (
                  <QRCodeSVG value="/images/hiwechat.jpg" size={200} level="H" />
                  // <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-500 text-sm px-2 text-center">
                  //   {t('qr_url_missing')}
                  // </div>
                )}
              </div>
               {/* Optional: Add other content here if needed */}
            </div>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="mt-4 w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                {t('close')}
            </Button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
} 