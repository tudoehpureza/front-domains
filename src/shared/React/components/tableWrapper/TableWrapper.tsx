import React from 'react';

import {
	ColorSchemeProvider,
	MantineProvider,
	ColorScheme,
} from '@mantine/core';
import type { MRT_TableInstance } from 'mantine-react-table';
import { useLocalStorage } from '@mantine/hooks';

import useEventListener from '@react/hooks/useEventListener';
import { Table } from '@react/components/table/Table';

import type { WrapperProps } from './types/tableWrapper';
import type { Domain } from '@/schemas/domain.schema';

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
				<Table />
			</MantineProvider>
		</ColorSchemeProvider>
	);
};
