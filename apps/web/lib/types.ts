/**
 * Web-only shapes. Prisma models and API contracts (health, errors, uploads)
 * come from `@repo/types`; feature inputs (`Pick<…>`) live next to the feature.
 */

/** Result of a Server Action: API validation messages, or nothing on success. */
export type ActionState = { errors?: string[] }
