import { FC, ReactNode } from 'react';
import ToDo from '../models/ToDo';

export type ReactFC = FC<{ children: ReactNode }>;

export type FilterFn = (todo?: ToDo) => boolean;

export type HexColor = `#${string}`;
