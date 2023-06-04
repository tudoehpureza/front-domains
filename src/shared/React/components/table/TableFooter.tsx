import React from 'react';

import { Box, Flex } from '@mantine/core';
import {
	MRT_TablePagination,
	MRT_ToolbarAlertBanner,
} from 'mantine-react-table';

export const TableFooter = ({ tableInstanceRef }) => {
	return (
		<Flex
			sx={{
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<MRT_TablePagination table={tableInstanceRef.current} />
			<Box sx={{ display: 'grid', width: '100%' }}>
				<MRT_ToolbarAlertBanner
					stackAlertBanner
					table={tableInstanceRef.current}
				/>
			</Box>
		</Flex>
	);
};
