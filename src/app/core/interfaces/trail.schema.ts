import { z } from 'zod';

export const TrailSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  distance: z.number(),
  difficulty: z.enum(['easy', 'moderate', 'hard']),
  lastMaintained: z.iso.datetime().optional(),
});

export const TrailsSchema = z.array(TrailSchema);

export type Trail = z.infer<typeof TrailSchema>;
export type Trails = z.infer<typeof TrailsSchema>;
