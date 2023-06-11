import React from 'react';
import {
	MantineReactTable,
	MantineReactTableProps,
	MRT_Cell,
	MRT_ColumnDef,
	MRT_Row,
	MRT_DensityState,
	MRT_TableInstance,
	MRT_VisibilityState,
	MRT_PaginationState,
	MRT_RowSelectionState,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFullScreenButton,
	MRT_GlobalFilterTextInput,
	MRT_ToggleFiltersButton,
	MRT_ShowHideColumnsButton,
} from 'mantine-react-table';

import { data } from '@mocks/table/makeData';

import type { Domain } from '@schemas/domain.schema';

import { RowActions } from './RowActions';

import type { TableProps } from './types/table.type';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { CreateNewAccountModal } from './modals/CreateNewAccountModal';
import { ChangeTheme } from './buttons/ChangeTheme';

export const Table: React.FC<TableProps> = ({
	handleToggleColorSchemeButton,
}) => {
	const [createModalOpen, setCreateModalOpen] = React.useState(false);

	const [tableData, setTableData] = React.useState<Domain[]>(() => data);
	const [validationErrors, setValidationErrors] = React.useState<{
		[cellId: string]: string;
	}>({});

	const handleCreateNewRow = (values: Domain) => {
		console.log('values ==> ', values);
		tableData.push(values);
		setTableData([...tableData]);
	};

	const handleSaveRowEdits: MantineReactTableProps<Domain>['onEditingRowSave'] =
		async ({ exitEditingMode, row, values }) => {
			if (!Object.keys(validationErrors).length) {
				tableData[row.index] = values;
				//send/receive api updates here, then refetch or update local table data for re-render
				setTableData([...tableData]);
				exitEditingMode(); //required to exit editing mode and close modal
			}
		};

	const handleCancelRowEdits = () => {
		setValidationErrors({});
	};

	const handleDeleteRow = React.useCallback(
		(row: MRT_Row<Domain>) => {
			if (!confirm(`Are you sure you want to delete ${row.getValue('name')}`)) {
				return;
			}
			//send api delete request here, then refetch or update local table data for re-render
			tableData.splice(row.index, 1);
			setTableData([...tableData]);
		},
		[tableData],
	);

	const getCommonEditTextInputProps = React.useCallback(
		(
			cell: MRT_Cell<Domain>,
		): MRT_ColumnDef<Domain>['mantineEditTextInputProps'] => {
			return {
				error: validationErrors[cell.id],
				onBlur: (event) => {
					const isValid =
						cell.column.id === 'email'
							? validateEmail(event.target.value)
							: cell.column.id === 'age'
							? validateAge(+event.target.value)
							: validateRequired(event.target.value);
					if (!isValid) {
						//set validation error for cell if invalid
						setValidationErrors({
							...validationErrors,
							[cell.id]: `${cell.column.columnDef.header} is required`,
						});
					} else {
						//remove validation error for cell if valid
						delete validationErrors[cell.id];
						setValidationErrors({
							...validationErrors,
						});
					}
				},
			};
		},
		[validationErrors],
	);

	const columns = React.useMemo<MRT_ColumnDef<Domain>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				enableColumnOrdering: false,
				enableEditing: false, //disable editing on this column
				enableSorting: false,
				size: 80,
			},
			{
				accessorKey: 'name',
				header: 'name',
				size: 140,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'url',
				header: 'url',
				size: 140,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'last_configured_by',
				header: 'last_configured_by',
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
					type: 'email',
				}),
			},
			{
				accessorKey: 'emails',
				header: 'emails',
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
					type: 'email',
				}),
			},
			{
				accessorKey: 'phones',
				header: 'phones',
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'is_active',
				header: 'Age',
				size: 80,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
					type: 'boolean',
				}),
			},
			{
				accessorKey: 'purchase_date',
				header: 'purchase_date',
				size: 80,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'expiration_date',
				header: 'expiration_date',
				size: 80,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'owner_id',
				header: 'Owner',
				size: 80,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
		],
		[getCommonEditTextInputProps],
	);

	return (
		<>
			<MantineReactTable
				columns={columns}
				data={tableData}
				editingMode="modal" //default
				positionToolbarAlertBanner="bottom" //show selected rows count on bottom toolbar
				enableColumnOrdering
				enableEditing
				onEditingRowSave={handleSaveRowEdits}
				onEditingRowCancel={handleCancelRowEdits}
				initialState={{ showGlobalFilter: true }}
				// See the Table State Management docs for why we need to use the updater function like this
				//add custom action buttons to top-left of top toolbar
				mantineTableProps={{
					striped: true,
				}}
				renderRowActions={({ row, table }) => (
					<RowActions
						table={table}
						handleDeleteRow={handleDeleteRow}
						row={row}
					/>
				)}
				renderTopToolbarCustomActions={({ table }) => (
					<div className="flex gap-4 p-4">
						<ChangeTheme
							handleToggleColorSchemeButton={handleToggleColorSchemeButton}
						/>
						<button
							onClick={() => window.create_new_account.showModal()}
							className="btn btn-ghost btn-xs sm:btn-sm md:btn-md lg:btn-lg"
						>
							New domain
						</button>
					</div>
				)}
				//customize built-in buttons in the top-right of top toolbar
				renderToolbarInternalActions={({ table }) => (
					<Flex gap="xs" align="center">
						<MRT_ShowHideColumnsButton table={table} />
						<MRT_ToggleFiltersButton table={table} />

						{/* along-side built-in buttons in whatever order you want them */}
						<MRT_ToggleDensePaddingButton table={table} />
						{/* add custom button to print table  */}
						<Tooltip withArrow label="Print">
							<ActionIcon onClick={() => window.print()}>
								<IconPrinter />
							</ActionIcon>
						</Tooltip>
					</Flex>
				)}
			/>
			<CreateNewAccountModal
				columns={columns}
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				onSubmit={handleCreateNewRow}
			/>
		</>
	);
};

export const validateEmail = (email: string) =>
	!!email.length &&
	email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);

export const validateAge = (age: number) => age >= 18 && age <= 50;
export const validateRequired = (value: string) => !!value.length;
