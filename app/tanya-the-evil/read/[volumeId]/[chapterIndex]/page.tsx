import { notFound } from "next/navigation";
import { HtmlReader } from "@/components/reader/HtmlReader";
import { tanyaVolumes } from "@/data/tanya-the-evil";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const params: { volumeId: string; chapterIndex: string }[] = [];

  for (const volume of tanyaVolumes) {
    if (!volume.inProgress) {
      for (let i = 1; i <= volume.chapters.length; i++) {
        params.push({ volumeId: volume.id, chapterIndex: String(i) });
      }
    }
  }

  if (params.length === 0) {
    return [{ volumeId: "dummy", chapterIndex: "1" }];
  }

  return params;
}

export default async function TanyaReadPage({
  params,
}: {
  params: Promise<{ volumeId: string; chapterIndex: string }>;
}) {
  const { volumeId, chapterIndex } = await params;
  const index = parseInt(chapterIndex);

  if (isNaN(index)) notFound();

  const volume = tanyaVolumes.find((v) => v.id === volumeId);
  if (!volume) notFound();

  // Load from cache
  let contentBody = "";
  const cachePath = path.join(process.cwd(), "data", "tanya-cache", `${volumeId}-${index}.json`);

  if (fs.existsSync(cachePath)) {
    try {
      const fileData = fs.readFileSync(cachePath, "utf8");
      const parsed = JSON.parse(fileData);
      contentBody = parsed.content;
    } catch (e) {
      console.error(`Error reading cached chapter ${volumeId}-${index}:`, e);
    }
  }

  // Graceful fallback if file not found
  if (!contentBody) {
    contentBody = `
<div class="border border-amber-950/80 bg-[#0a0a0f] p-8 text-center rounded shadow-[0_0_30px_rgba(245,158,11,0.15)] max-w-xl mx-auto my-12">
  <div class="text-amber-400 text-4xl mb-4 select-none">⚔️</div>
  <h3 class="text-xl font-semibold text-white mb-2 font-serif">Chapter Not Cached</h3>
  <p class="text-amber-300/60 text-sm mb-6 leading-relaxed">
    This chapter has not been cached yet. Content will appear here once available.
  </p>
</div>
    `.trim();
  }

  const chapterTitle = volume.chapters[index - 1] || `Chapter ${index}`;
  const htmlContent = `<div class="theme-tanya select-text relative w-full">\n${contentBody}</div>`;
  const totalChapters = volume.chapters.length;

  let nextVolumeLink = undefined;
  let nextVolumeTitleVal = undefined;

  const volIndex = tanyaVolumes.findIndex((v) => v.id === volumeId);
  if (volIndex !== -1) {
    if (volIndex < tanyaVolumes.length - 1) {
      const nextVol = tanyaVolumes[volIndex + 1];
      nextVolumeLink = `/tanya-the-evil/read/${nextVol.id}/1`;
      nextVolumeTitleVal = nextVol.title;
    }
  } else {
    nextVolumeLink = undefined;
    nextVolumeTitleVal = undefined;
  }

  return (
    <div className="theme-tanya min-h-screen bg-[#0a0a0f] text-[#f0e6d6]">
      <HtmlReader
        content={htmlContent}
        title={chapterTitle}
        volumeId={volumeId}
        chapterIndex={index}
        prevChapter={
          index > 1
            ? {
                volumeId,
                chapter: index - 1,
                title: volume.chapters[index - 2] || `Chapter ${index - 1}`,
              }
            : undefined
        }
        nextChapter={
          index < totalChapters
            ? {
                volumeId,
                chapter: index + 1,
                title: volume.chapters[index] || `Chapter ${index + 1}`,
              }
            : undefined
        }
        toc={volume.chapters.map((ch, i) => ({
          label: ch,
          href: `/tanya-the-evil/read/${volumeId}/${i + 1}`,
          index: i + 1,
        }))}
        volumeTitle={volume.title}
        epubSource={undefined}
        detailsLink={`/tanya-the-evil/select/${volumeId}`}
        returnLink={`/tanya-the-evil/select/${volumeId}`}
        currentSpineIndex={index}
        nextVolumeLink={nextVolumeLink}
        nextVolumeTitle={nextVolumeTitleVal}
      />
    </div>
  );
}
