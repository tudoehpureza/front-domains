import React from 'react';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { RowActionsProps } from './types/rowActions-type';

export const RowActions = ({
	table,
	handleDeleteRow,
	row,
}: RowActionsProps) => {
	return (
		<div className="flex gap-4">
			<div className="tooltip  tooltip-top" data-tip="Edit">
				<button className="btn" onClick={() => table.setEditingRow(row)}>
					<IconEdit />
				</button>
			</div>
			<div className="tooltip  tooltip-top" data-tip="Delete">
				<button className="btn" onClick={() => handleDeleteRow(row)}>
					<IconTrash />
				</button>
			</div>
		</div>
	);
};
