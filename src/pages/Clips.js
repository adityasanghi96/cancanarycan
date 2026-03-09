import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import FooterBottom from "../components/footer/FooterBottom";
import Title from "../components/layouts/Title";

const API_URL = process.env.REACT_APP_API_URL || "";
const HANDLE = "CanCanaryCan";
const DEFAULT_LIMIT = 20;

function buildClipUrl(liveVideoId, offsetSeconds) {
  const t = Math.floor(Number(offsetSeconds) || 0);
  return `https://www.youtube.com/watch?v=${liveVideoId}&t=${t}s`;
}

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

function Clips() {
  const [clips, setClips] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClips = useCallback(async () => {
    if (!API_URL) {
      setError("REACT_APP_API_URL is not set.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/channel/clips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: HANDLE,
          limit,
          offset,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setClips(data.clips || []);
      setTotal(Number(data.total) || 0);
    } catch (err) {
      setError(err.message || "Failed to load clips.");
      setClips([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    fetchClips();
  }, [fetchClips]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPrev = offset > 0;
  const hasNext = offset + clips.length < total;

  const goPrev = () => setOffset((o) => Math.max(0, o - limit));
  const goNext = () => setOffset((o) => o + limit);

  return (
    <>
      <Navbar />
      <section className="w-full py-20 border-b-[1px] border-b-black min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-center items-center text-center mb-10">
            <Title title="CLIPS" des="Channel clips" />
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/20 text-red-400 text-center">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading clips…</div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-bodyColor text-gray-400 uppercase tracking-wide border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Id</th>
                      <th className="px-4 py-3 font-medium">Clip</th>
                      <th className="px-4 py-3 font-medium">Clipped by</th>
                      <th className="px-4 py-3 font-medium">Thumbnail</th>
                      <th className="px-4 py-3 font-medium">Created</th>
                      <th className="px-4 py-3 font-medium">Watch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clips.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          No clips found.
                        </td>
                      </tr>
                    ) : (
                      clips.map((clip) => (
                        <tr
                          key={clip.id}
                          className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-400">{clip.id}</td>
                          <td className="px-4 py-3 font-medium text-white">
                            {clip.clipName}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={`https://www.youtube.com/@${(clip.clippedBy || "").replace(/^@/, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-designColor hover:underline"
                            >
                              {clip.clippedBy || "—"}
                            </a>
                          </td>
                          <td className="px-4 py-2">
                            {clip.thumbnailUrl ? (
                              <img
                                src={clip.thumbnailUrl}
                                alt=""
                                className="w-24 h-14 object-cover rounded"
                              />
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-400">
                            {formatDate(clip.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={buildClipUrl(
                                clip.liveVideoId,
                                clip.offsetSeconds
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-designColor hover:underline"
                            >
                              Watch
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {total > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-gray-400 text-sm">
                    Showing {offset + 1}–{Math.min(offset + limit, total)} of{" "}
                    {total}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={!hasPrev}
                      className="px-4 py-2 rounded-lg bg-bodyColor border border-gray-600 text-gray-400 hover:text-white hover:border-designColor disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-400 text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!hasNext}
                      className="px-4 py-2 rounded-lg bg-bodyColor border border-gray-600 text-gray-400 hover:text-white hover:border-designColor disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <FooterBottom />
    </>
  );
}

export default Clips;
