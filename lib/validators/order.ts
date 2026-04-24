import { z } from 'zod';

export const ContentTypeEnum = z.enum(['blog', 'seo_article', 'social', 'email', 'landing_page']);

export const orderFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  contentType: ContentTypeEnum,
  wordCount: z.number().int().min(1, 'Word count must be greater than 0'),
  dueDate: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    return inputDate >= today;
  }, {
    message: "Due date cannot be in the past",
  }),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
