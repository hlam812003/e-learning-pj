import { GENERAL_MODE } from '../constants'

export type GeneralMode = (typeof GENERAL_MODE)[keyof typeof GENERAL_MODE]
