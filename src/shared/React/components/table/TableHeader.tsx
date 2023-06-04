import React from 'react';

import { Box, Flex } from '@mantine/core';

import type { TableHeaderProps } from './types/tableHeader';
import { ChangeTheme } from './buttons/ChangeTheme';

export const TableHeader: React.FC<TableHeaderProps> = ({
	setColorScheme,
	colorScheme,
	children,
}) => {
	const handleToggleColorSchemeButton = () => {
		setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
	};

	return (
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
				<button
					className="btn bg-base"
					onClick={() => window.create_new_account.showModal()}
				>
					Create New Account
				</button>
				<ChangeTheme
					colorScheme={colorScheme}
					handleToggleColorSchemeButton={handleToggleColorSchemeButton}
				/>
			</Box>
			<Flex gap="xs" align="center">
				{children}
			</Flex>
		</Flex>
	);
};
