import type { ColorScheme } from '@mantine/core';

export type TableHeaderProps = {
	setColorScheme: (
		val: ColorScheme | ((prevState: ColorScheme) => ColorScheme),
	) => void;

	colorScheme: ColorScheme;
	children: React.ReactNode;
};
