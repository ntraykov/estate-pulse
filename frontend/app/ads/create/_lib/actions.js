"use server";

/**
 * Server Action: Fetches scraped ad data from the backend for a given URL.
 * Called when the user enters an ad URL — the server scrapes the page
 * and returns structured data to populate the form.
 *
 * @param {string} url - The ad listing URL to scrape
 * @returns {Promise<{ success: true; data: ScrapeAdResult } | { success: false; error: string }>}
 */
export async function scrapeAdUrl(url) {
  if (!url?.trim()) {
    return { success: false, error: "URL is required" };
  }

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(
      `${apiUrl}/api/ads/scrape?url=${encodeURIComponent(url.trim())}`,
      { next: { revalidate: 0 } },
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        error: text || `Request failed (${response.status})`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to scrape ad",
    };
  }
}
