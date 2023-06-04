import React from 'react';

import type { CreateNewAccountModalProps } from '../types/createNewAccountModal-type';

//example of creating a mantine dialog modal for creating new rows
export const CreateNewAccountModal = ({
	open,
	columns,
	onClose,
	onSubmit,
}: CreateNewAccountModalProps) => {
	const [values, setValues] = React.useState<any>(() =>
		columns.reduce((acc, column) => {
			acc[column.accessorKey ?? ''] = '';
			return acc;
		}, {} as any),
	);

	const handleSubmit = () => {
		//put your validation logic here
		onSubmit(values);
		onClose();
	};

	return (
		<dialog
			id="create_new_account"
			className="modal modal-bottom sm:modal-middle"
		>
			<form method="dialog" className="modal-box">
				<div className="flex flex-col justify-center justify-items-center items-center">
					{columns.map((column) => (
						<div
							className="form-control w-full max-w-xs"
							key={column.accessorKey}
						>
							<label className="label">
								<span className="label-text">{column.accessorKey}</span>
								<span className="label-text-alt">{column.header}</span>
							</label>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) =>
									setValues({ ...values, [e.target.name]: e.target.value })
								}
							/>
							<label className="label">
								<span className="label-text-alt">Bottom Left label</span>
								<span className="label-text-alt">Bottom Right label</span>
							</label>
						</div>
					))}
				</div>
				<div className="modal-action">
					<button className="btn" onClick={onClose}>
						Cancel
					</button>
					<button className="btn" onClick={handleSubmit}>
						Create New Account
					</button>
				</div>
			</form>
		</dialog>
	);
};
