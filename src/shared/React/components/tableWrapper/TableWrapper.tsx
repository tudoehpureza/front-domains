import React from 'react';

import {
	ColorSchemeProvider,
	MantineProvider,
	ColorScheme,
	Tooltip,
	ActionIcon,
} from '@mantine/core';
import {
	MRT_ToggleFullScreenButton,
	MRT_GlobalFilterTextInput,
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_TableInstance,
} from 'mantine-react-table';
import { useLocalStorage } from '@mantine/hooks';

import useEventListener from '@react/hooks/useEventListener';
import { Table } from '@react/components/table/Table';

import type { WrapperProps } from './types/tableWrapper';
import { TableHeader } from '../table/TableHeader';
import type { Domain } from '@/schemas/domain.schema';
import { IconPrinter } from '@tabler/icons-react';

export const TableWrapper: React.FC<WrapperProps> = () => {
	const tableInstanceRef = React.useRef<MRT_TableInstance<Domain>>(null);

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mode',
		defaultValue: 'light',
	});

	const toggleColorScheme = () => {
		const newTheme = localStorage.getItem('mode');

		if (!newTheme) return;

		setColorScheme(newTheme as ColorScheme);
	};

	useEventListener('storage', toggleColorScheme);

	console.log('tableInstanceRef.current ===> ', tableInstanceRef.current);
	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme }} withNormalizeCSS>
				{tableInstanceRef.current && (
					<TableHeader
						setColorScheme={setColorScheme}
						colorScheme={colorScheme}
					>
						<MRT_GlobalFilterTextInput table={tableInstanceRef.current} />

						<MRT_ToggleFiltersButton table={tableInstanceRef.current} />
						<MRT_ShowHideColumnsButton table={tableInstanceRef.current} />
						<MRT_ToggleDensePaddingButton table={tableInstanceRef.current} />
						<Tooltip withArrow label="Print">
							<ActionIcon onClick={() => window.print()}>
								<IconPrinter />
							</ActionIcon>
						</Tooltip>
						<MRT_ToggleFullScreenButton table={tableInstanceRef.current} />
					</TableHeader>
				)}
				<Table ref={tableInstanceRef} />
			</MantineProvider>
		</ColorSchemeProvider>
	);
};
