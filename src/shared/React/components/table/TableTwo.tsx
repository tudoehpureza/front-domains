import React, { useReducer, useRef, useState } from 'react';
import {
	MantineReactTable,
	MRT_DensityState,
	MRT_ColumnDef,
	MRT_ToggleFullScreenButton,
	MRT_GlobalFilterTextInput,
	MRT_ShowHideColumnsButton,
	MRT_TableInstance,
	MRT_TablePagination,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToolbarAlertBanner,
	MRT_VisibilityState,
	MRT_PaginationState,
	MRT_RowSelectionState,
} from 'mantine-react-table';
import { ActionIcon, Box, Button, Flex, Text, Tooltip } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { data, Person } from '../../../../mock/table/makeData';

//column definitions...
const columns: MRT_ColumnDef<Person>[] = [
	{
		accessorKey: 'firstName',
		header: 'First Name',
	},
	{
		accessorKey: 'lastName',
		header: 'Last Name',
	},
	{
		accessorKey: 'age',
		header: 'Age',
	},
	{
		accessorKey: 'salary',
		header: 'Salary',
	},
];
//end

const Example = () => {
	//we need a table instance ref to pass as a prop to the MRT Toolbar buttons
	const tableInstanceRef = useRef<MRT_TableInstance<Person>>(null);

	//we will also need some weird re-render hacks to force the MRT_ components to re-render since ref changes do not trigger a re-render
	const rerender = useReducer(() => ({}), {})[1];

	//we need to manage the state that should trigger the MRT_ components in our custom toolbar to re-render
	const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
		{},
	);
	const [density, setDensity] = useState<MRT_DensityState>('md');
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
	const [showColumnFilters, setShowColumnFilters] = useState(false);

	return (
		<Box sx={{ border: 'gray 2px dashed', padding: '16px' }}>
			{/* Our Custom External Top Toolbar */}
			{tableInstanceRef.current && (
				<Flex
					sx={(theme) => ({
						backgroundColor: theme.fn.rgba(theme.colors.blue[3], 0.2),
						borderRadius: '4px',
						flexDirection: 'row',
						gap: '16px',
						justifyContent: 'space-between',
						padding: '24px 16px',
						'@media max-width: 768px': {
							flexDirection: 'column',
						},
					})}
				>
					<Box>
						<Button
							color="lightblue"
							onClick={() => {
								alert('Add User');
							}}
							variant="filled"
						>
							Crete New Account
						</Button>
					</Box>
					<MRT_GlobalFilterTextInput table={tableInstanceRef.current} />
					<Flex gap="xs" align="center">
						<MRT_ToggleFiltersButton table={tableInstanceRef.current} />
						<MRT_ShowHideColumnsButton table={tableInstanceRef.current} />
						<MRT_ToggleDensePaddingButton table={tableInstanceRef.current} />
						<Tooltip withArrow label="Print">
							<ActionIcon onClick={() => window.print()}>
								<IconPrinter />
							</ActionIcon>
						</Tooltip>
						<MRT_ToggleFullScreenButton table={tableInstanceRef.current} />
					</Flex>
				</Flex>
			)}
			<Text p="16px 4px">
				{
					"Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
				}
			</Text>
			{/* The MRT Table */}
			<MantineReactTable
				columns={columns}
				data={data}
				enableBottomToolbar={false}
				enableRowSelection
				enableTopToolbar={false}
				initialState={{ showGlobalFilter: true }}
				// See the Table State Management docs for why we need to use the updater function like this
				onColumnVisibilityChange={(updater) => {
					setColumnVisibility((prev) =>
						updater instanceof Function ? updater(prev) : updater,
					);
					queueMicrotask(rerender); //hack to rerender after state update
				}}
				onDensityChange={(updater) => {
					setDensity((prev) =>
						updater instanceof Function ? updater(prev) : updater,
					);
					queueMicrotask(rerender); //hack to rerender after state update
				}}
				onRowSelectionChange={(updater) => {
					setRowSelection((prev) =>
						updater instanceof Function ? updater(prev) : updater,
					);
					queueMicrotask(rerender); //hack to rerender after state update
				}}
				onPaginationChange={(updater) => {
					setPagination((prev) =>
						updater instanceof Function ? updater(prev) : updater,
					);
					queueMicrotask(rerender); //hack to rerender after state update
				}}
				onShowColumnFiltersChange={(updater) => {
					setShowColumnFilters((prev) =>
						updater instanceof Function ? updater(prev) : updater,
					);
					queueMicrotask(rerender); //hack to rerender after state update
				}}
				state={{
					columnVisibility,
					density,
					rowSelection,
					pagination,
					showColumnFilters,
				}}
				tableInstanceRef={tableInstanceRef} //get access to the underlying table instance ref
			/>
			{/* Our Custom Bottom Toolbar */}
			{tableInstanceRef.current && (
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
			)}
		</Box>
	);
};

export default Example;
