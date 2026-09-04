import z from 'zod';

export const organizationSchema = z.object({
  name: z
    .string()
    .min(1, 'Organization name is required')
    .max(30, 'Organization name must be at most 30 characters long'),
  slug: z.string().min(1, 'Organization slug is required'),
  industry: z
    .string()
    .min(1, 'Organization industry is required')
    .max(30, 'Organization industry must be at most 30 characters long'),
});

export const validateOrganization = (req, res, next) => {
  const { error } = organizationSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ errors: error.errors });
  }
  next();
};

export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, 'Organization name is required')
    .max(30, 'Organization name must be at most 30 characters long')
    .optional(),
  slug: z.string().min(1, 'Organization slug is required').optional(),
  industry: z
    .string()
    .min(1, 'Organization industry is required')
    .max(30, 'Organization industry must be at most 30 characters long')
    .optional(),
});
