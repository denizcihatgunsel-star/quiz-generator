"use client";

import Image from "next/image";

/**
 * HauntedHillScene: Immersive night scene layers for Halloween theme
 * All layers are absolutely positioned, aria-hidden, pointer-events:none
 * Loading lazy/async, z-index below content
 */
export default function HauntedHillScene() {
  return (
    <>
      {/* Moon - large orange disc behind house, upper-right */}
      <div className="scene-moon" aria-hidden="true">
        <Image
          src="/seasonal/scene/moon.svg"
          alt=""
          width={360}
          height={360}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>

      {/* Witch flying across moon */}
      <div className="scene-witch" aria-hidden="true">
        <Image
          src="/seasonal/scene/witch.svg"
          alt=""
          width={100}
          height={60}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>

      {/* Haunted house on hill */}
      <div className="scene-house" aria-hidden="true">
        <Image
          src="/seasonal/scene/hill-house.svg"
          alt=""
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>

      {/* Bare trees at edges */}
      <div className="scene-trees" aria-hidden="true">
        <Image
          src="/seasonal/scene/trees.svg"
          alt=""
          width={1200}
          height={400}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>

      {/* Fence and gravestones at bottom */}
      <div className="scene-fence" aria-hidden="true">
        <Image
          src="/seasonal/scene/fence-graves.svg"
          alt=""
          width={1200}
          height={150}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>

      {/* Fog layer 1 (lower) */}
      <div className="scene-fog-1" aria-hidden="true" />

      {/* Fog layer 2 (upper) */}
      <div className="scene-fog-2" aria-hidden="true" />
    </>
  );
}
