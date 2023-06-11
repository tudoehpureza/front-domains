import React from 'react';

import type { CreateNewAccountModalProps } from './createNewAccountModal-type';

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
			<div className="modal-box w-11/12 max-w-5xl overflow-hidden glass rounded-xl bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md  x-16 py-10">
				<form method="dialog" className="p-6 space-y-6">
					<button
						htmlFor="create_new_account"
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
					<h3 className="font-bold text-lg">NEW DOMAIN</h3>

					<div className="grid grid-cols-2 gap-2 justify-items-center overflow-auto max-h-[40vh]">
						{columns.map((column) => (
							<div
								className="form-control w-full max-w-xs"
								key={column.accessorKey}
							>
								<input
									type="text"
									placeholder={column.accessorKey}
									name={column.accessorKey}
									className="input input-bordered w-full input-lg max-w-xs rounded-3xl text-center text-gray-50 placeholder-gray-300"
									onChange={(e) => {
										console.log('e.target.name ===> ', e.target.name);
										console.log('e.target.value ===> ', e.target.value);
										console.log('values ===> ', values);
										console.log(
											'{ ...values, [e.target.name]: e.target.value } ===> ',
											{ ...values, [e.target.name]: e.target.value },
										);

										setValues({
											...values,
											[e.target.name]: e.target.value,
										});
									}}
								/>
								<label className="label flex flex-row items-center justify-end">
									<span className="label-text-alt">Bottom Right label</span>
								</label>
							</div>
						))}
					</div>
				</form>
				<div className="flex items-center p-6 space-x-2 border-t rounded-b">
					<div className="modal-action">
						<button className="btn" onClick={handleSubmit}>
							Ok
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
};
