import type { StaticImageData } from "next/image";
import fedCycleCover from "@/public/images/articles/fed-cycle.png";
import valuationFrictionCover from "@/public/images/articles/valuation-friction.png";

// Public image metadata only: safe for the interactive catalogue to import.
// Keep article text and membership decisions out of this module.
const articleCovers: Record<string, StaticImageData | undefined> = {
  "/images/articles/fed-cycle.png": fedCycleCover,
  "/images/articles/valuation-friction.png": valuationFrictionCover,
};

export { fedCycleCover, valuationFrictionCover };

export function getArticleCover(source: string): StaticImageData | string {
  return articleCovers[source] ?? source;
}
