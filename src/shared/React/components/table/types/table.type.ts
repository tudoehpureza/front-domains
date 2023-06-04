import type { Domain } from '@/schemas/domain.schema';
import type { MRT_TableInstance } from 'mantine-react-table';

export type TableProps = {
	ref: React.ForwardedRef<MRT_TableInstance<Domain>>;
};
