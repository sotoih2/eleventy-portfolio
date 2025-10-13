import { DateTime } from "luxon";

export default function (eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/css");

  // Blog posts collection
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // Add a "date" filter
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";
    // Convert JS Date to formatted string
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Add a global "now" variable
  eleventyConfig.addGlobalData("now", new Date());

  // Set input/output directories
  return {
    pathPrefix: "/eleventy-portfolio/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
  };
}