import { z } from 'zod';

export const ContentTypeEnum = z.enum(['blog', 'seo_article', 'social', 'email', 'landing_page']);

export const orderFormSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200, 'Title must be 200 characters or fewer'),
  contentType: ContentTypeEnum,
  wordCount: z.number().int().min(1, 'Word count must be greater than 0').max(50_000, 'Word count must be 50,000 or fewer'),
  dueDate: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    if (Number.isNaN(inputDate.getTime())) return false;
    return inputDate >= today;
  }, {
    message: 'Due date cannot be in the past',
  }),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
