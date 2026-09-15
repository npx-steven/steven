"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import type { Project } from "./data";

// Shared with marquee.tsx so the repeat math can never drift from the layout.
export const CARD_WIDTH = 420;

function ProjectCard({
  project,
  clone,
}: {
  project: Project;
  clone?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const linkProps = clone ? { tabIndex: -1 } : {};

  return (
    <motion.li
      aria-hidden={clone || undefined}
      style={{ width: CARD_WIDTH }}
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      className="relative aspect-3/2 shrink-0 select-none overflow-hidden rounded-xl border border-border"
    >
      {/* The variant lives on a wrapper, not the image: the overlay sits above
          the photo and would swallow the hover before it ever reached it. */}
      <motion.div
        className="absolute inset-0"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
      >
        <Image
          src={project.image}
          alt={clone ? "" : `${project.title} screenshot`}
          fill
          sizes={`${Math.round(CARD_WIDTH * 1.1)}px`}
          draggable={false}
          className="object-cover"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-4 hover:cursor-pointer">
        {/* top: title + date left, links right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3 className="font-display text-lg font-semibold text-page">
              {project.title}
            </h3>
            <span className="text-xs whitespace-nowrap text-faint">
              {project.date}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source on GitHub`}
                {...linkProps}
                className="text-page transition-opacity hover:opacity-70"
              >
                <IconBrandGithub className="size-5" aria-hidden />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title}`}
                {...linkProps}
                className="text-page transition-opacity hover:opacity-70"
              >
                <IconExternalLink className="size-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        {/* bottom: description + tags, right-aligned */}
        <div className="flex flex-col items-center gap-3 ">
          <p className="max-w-[90%] text-sm/relaxed text-rule text-center">
            {project.description}
          </p>

          <ul className="flex flex-wrap justify-end gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-rule"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

export default ProjectCard;
