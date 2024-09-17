"use client";

import EmojiPicker from "emoji-picker-react";
import { EmojiStyle, Theme } from "emoji-picker-react";
import React, { useState, useEffect, useRef } from "react";

function useOutsideClick(
  callback: () => void,
  excludeRef: React.RefObject<HTMLElement>,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !excludeRef.current?.contains(event.target as Node)
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, excludeRef]);

  return ref;
}

function EmojiPickerComponent({
  children,
  setEmojiIcon,
}: {
  children: React.ReactNode;
  setEmojiIcon: (emoji: string) => void;
}) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const childrenRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useOutsideClick(
    () => setOpenEmojiPicker(false),
    childrenRef,
  );

  return (
    <>
      <div
        ref={childrenRef}
        onClick={() => setOpenEmojiPicker((prev) => !prev)}
      >
        {children}
      </div>
      {openEmojiPicker && (
        <div className="absolute z-10" ref={emojiPickerRef}>
          <EmojiPicker
            emojiStyle={EmojiStyle.NATIVE}
            theme={Theme.AUTO}
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji);
              setOpenEmojiPicker(false);
            }}
          />
        </div>
      )}
    </>
  );
}

export default EmojiPickerComponent;
