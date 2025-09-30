import { algoliasearch } from 'algoliasearch';

export const algoliaClient = algoliasearch(
  'XDK6HXI1LY',
  'd93493726005e2e0ab71317c027d1eb3'
);

export interface AlgoliaRecord {
  objectID: string;
  title: string;
  description: string;
  date: number;
  emotion: string;
  impact: string;
  tags: string[];
  inspirationCount: number;
  year: number;
}
