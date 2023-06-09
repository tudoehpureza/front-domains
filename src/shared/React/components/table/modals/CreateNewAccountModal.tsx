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
		console.log({ values });
		onSubmit(values);
		onClose();
	};

	return (
		<dialog id="create_new_account" className="modal">
			<div className="modal-box rounded-lg  w-11/12 max-w-5xl overflow-hidden">
				<div className="flex items-start justify-between p-4 border-b rounded-t">
					<h3 className="text-lg font-semibold">Hello!</h3>
					<button
						type="button"
						htmlFor="create_new_account"
						className="btn btn-sm btn-circle btn-ghost"
					>
						x
					</button>
				</div>
				<form method="dialog" className="p-6 space-y-6">
					<div className="grid grid-cols-2 gap-2 justify-items-center overflow-auto max-h-[40vh]">
						{columns.map((column) => (
							<div
								className="form-control w-full max-w-xs"
								key={column.accessorKey}
							>
								<label className="label">
									<span className="label-text">{column.accessorKey}</span>
								</label>
								<input
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full max-w-xs"
									onChange={(e) => {
										console.log('e.target.name ===> ', e.target.name);
										console.log('e.target.value ===> ', e.target.value);
										console.log('values ===> ', values);
										console.log(
											'{ ...values, [e.target.name]: e.target.value } ===> ',
											{ ...values, [e.target.name]: e.target.value },
										);

										setValues({ ...values, [e.target.name]: e.target.value });
									}}
								/>
								<label className="label">
									<span></span>
									<span className="label-text-alt">Bottom Right label</span>
								</label>
							</div>
						))}
					</div>
				</form>
				<div className="flex items-center p-6 space-x-2 border-t rounded-b">
					<div className="modal-action">
						<button className="btn" onClick={onClose}>
							Cancel
						</button>
						<button className="btn" onClick={handleSubmit}>
							Create New Account
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
};
