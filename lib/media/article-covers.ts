import type { StaticImageData } from "next/image";
import fedCycleCover from "@/public/images/articles/fed-cycle.png";
import valuationFrictionCover from "@/public/images/articles/valuation-friction.png";
import blackstoneAiCover from "@/public/images/articles/blackstone-ai-cover.webp";

// Public image metadata only: safe for the interactive catalogue to import.
// Keep article text and membership decisions out of this module.
const articleCovers: Record<string, StaticImageData | undefined> = {
  "/images/articles/fed-cycle.png": fedCycleCover,
  "/images/articles/valuation-friction.png": valuationFrictionCover,
  "/images/articles/blackstone-ai-cover.webp": blackstoneAiCover,
};

export { fedCycleCover, valuationFrictionCover };

export function getArticleCover(source: string): StaticImageData | string {
  return articleCovers[source] ?? source;
}
