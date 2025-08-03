/* eslint-disable @ts/no-magic-numbers */

import { randomUUID } from 'crypto';
import { EOL } from 'os';

interface Todo {
  readonly description: string
  readonly done: boolean
  readonly due: number
  readonly id: string
  readonly list: string
  readonly stared: boolean
  readonly tags: string[]
  readonly title: string
}

// Helper function to get a random element from an array
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get a random integer in a range
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

// Source data for randomization
const verbs = ['Fix', 'Implement', 'Review', 'Schedule', 'Organize', 'Deploy', 'Update', 'Test', 'Create', 'Finalize'];
const nouns = ['Database', 'UI Component', 'API Endpoint', 'User Authentication', 'Deployment Script', 'Project Plan', 'Client Meeting', 'Performance Report'];
const lists = ['work', 'personal', 'shopping', 'misc', 'health', 'archive'];
const allTags = ['urgent', 'backend', 'frontend', 'bug', 'feature', 'planning', 'mobile', 'devops', 'marketing'];

// Function to generate a single random Todo item
const createRandomTodo = (index: number, nowOrTomorrow?: boolean): Todo => {
  // Generate a unique title
  const title = `${getRandomElement(verbs)} ${getRandomElement(nouns)} #${index}`;

  // Generate a random due date within last 30 days and the next 60 days
  const now = Date.now();
  const daysInMillis = 24 * 60 * 60 * 1000;
  const due = nowOrTomorrow
    ? now + Number(getRandomInt(0, daysInMillis))
    : (now - 30 * daysInMillis) + getRandomInt(0, 90 * daysInMillis);

  // Select 1 to 3 random tags without duplicates
  const numTags = getRandomInt(1, 3);
  const tags: string[] = [];
  while (tags.length < numTags) {
    const tag = getRandomElement(allTags);
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }

  const stared = Math.random() > 0.7; // Approx. 30% of tasks are stared
  const rand = Math.random();
  const done = (rand < 0.2) || (rand > 0.8);

  return {
    done,
    due,
    stared,
    tags,
    title,
    description: `This is a detailed description for the task: "${title}". It involves several steps and requires collaboration with the team.`,
    id         : randomUUID(),
    list       : getRandomElement(lists)
  };
};

// Generate the array of 30 mock Todo items
const first: Todo[] = Array.from({ length: 30 }, (_, i) => createRandomTodo(i + 1, true));

// Generate the array of 70 mock Todo items
const second: Todo[] = Array.from({ length: 70 }, (_, i) => createRandomTodo(i + 1));

// Run: `node ./init.ts` to print 100 mock Todo items
process.stdout.write(JSON.stringify([...first, ...second], null, 2) + EOL);
