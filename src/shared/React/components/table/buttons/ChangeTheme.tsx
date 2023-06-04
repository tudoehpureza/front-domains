import React from 'react';

import { ActionIcon } from '@mantine/core';

import { IconSun, IconMoonStars } from '@tabler/icons-react';

export const ChangeTheme = ({
	colorScheme,
	handleToggleColorSchemeButton,
}: {
	colorScheme: string;
	handleToggleColorSchemeButton: Function;
}) => {
	return (
		<ActionIcon
			variant="outline"
			color={colorScheme === 'dark' ? 'yellow' : 'blue'}
			onClick={() => handleToggleColorSchemeButton()}
			title="Toggle color scheme"
		>
			{colorScheme === 'dark' ? (
				<IconSun size="1.1rem" />
			) : (
				<IconMoonStars size="1.1rem" />
			)}
		</ActionIcon>
	);
};
