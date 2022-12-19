import {
  // createCurrentUserHook,
  createClient,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-11-16"; // "2022-11-16"

// config
export const config = {
  /**
   *
   * Find your project ID and dataset in 'sanity.json' in your studio project
   * These are considered "public", but you can user environment-variables
   * if you want differ between local env and production
   *
   * https://nextjs.org/docs/basics-features/environment-vraiables
   *
   **/
  dataset: dataset || "production",
  projectId: projectId,
  apiVersion: apiVersion,
  /**
   * Set useCdn to 'false' if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive)
   * Authenticated request (like preview) will always bypass the CDN
   */
  useCdn: process.env.NODE_ENV === "production",
};

// create sanity client
// set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// convert image to the url
/**
 *
 * Set up a helper function for generating Image URLs with only the asset reference
 * data in your documents
 * Read more: https://www.sanity.io/docs/image-url
 *
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Helper function for using the current logged in user account
// export const useCurrentUser = createCurrentUserHook(config);
