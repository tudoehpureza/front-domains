import type { MRT_ColumnDef } from 'mantine-react-table';

import type { Domain } from '@schemas/domain.schema';

export interface CreateNewAccountModalProps {
	columns: MRT_ColumnDef<Domain>[];
	onClose: () => void;
	onSubmit: (values: Domain) => void;
	open: boolean;
}
