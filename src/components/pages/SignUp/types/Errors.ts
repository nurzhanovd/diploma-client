import { RegisterPayload } from './RegisterPayload';

export type Errors = Partial<Record<keyof RegisterPayload, string>>;
