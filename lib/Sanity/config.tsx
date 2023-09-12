export const config = {
  dataset:
    process.env.SANITY_PROJECT_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET ||
    '',
  projectId:
    process.env.SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    '',
  // useCdn: process.env.NODE_ENV !== 'development',
  useCdn: true,
  apiVersion: '2023-05-03',
}
