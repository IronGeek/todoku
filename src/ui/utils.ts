import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

const cx = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export { cx };
