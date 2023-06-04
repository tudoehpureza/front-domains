import type { Domain } from '@/schemas/domain.schema';
import type { MRT_Cell, MRT_Row, MRT_TableInstance } from 'mantine-react-table';

export interface RowActionsProps {
	table: MRT_TableInstance<Domain>;
	handleDeleteRow: (row: MRT_Row<Domain>) => void;
	row: MRT_Row<Domain>;
}
