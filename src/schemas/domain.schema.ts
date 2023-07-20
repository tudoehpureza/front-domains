import { z } from 'zod';

export const domainSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	url: z.string(),
	emails: z.array(z.string().email({ message: 'Invalid email address' })),
	last_configured_by: z.string().email({ message: 'Invalid email address' }),
	phones: z.array(
		z
			.string()
			.min(8, { message: 'Must be 8 or more characters long' })
			.max(20, { message: 'Must be 20 or fewer characters long' }),
	),
	is_active: z.boolean(),
	purchase_date: z.date(),
	expiration_date: z.date(),
	owner_id: z.string(),
	progress_bar: z.number().min(0).max(100),
});

export type Domain = z.infer<typeof domainSchema>;
