import React from "react";
import {
  MantineReactTable,
  MantineReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "mantine-react-table";
import {
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  ColorScheme,
} from "@mantine/core";
import { useEventListener, useReadLocalStorage } from "usehooks-ts";
import {
  IconTrash,
  IconEdit,
  IconSun,
  IconMoonStars,
} from "@tabler/icons-react";
import { data, states } from "./makeData";
import type { Domain } from "./domain.schema";
import { useLocalStorage } from "@mantine/hooks";

export const Table = () => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [tableData, setTableData] = React.useState<Domain[]>(() => data);
  const [validationErrors, setValidationErrors] = React.useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: Domain) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MantineReactTableProps<Domain>["onEditingRowSave"] =
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
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextInputProps = React.useCallback(
    (
      cell: MRT_Cell<Domain>
    ): MRT_ColumnDef<Domain>["mantineEditTextInputProps"] => {
      return {
        error: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
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
    [validationErrors]
  );

  const columns = React.useMemo<MRT_ColumnDef<Domain>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "name",
        size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "url",
        header: "url",
        size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "last_configured_by",
        header: "last_configured_by",
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "emails",
        header: "emails",
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "phones",
        header: "phones",
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "is_active",
        header: "Age",
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: "boolean",
        }),
      },
      {
        accessorKey: "purchase_date",
        header: "purchase_date",
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "expiration_date",
        header: "expiration_date",
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "owner_id",
        header: "Owner",
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
    ],
    [getCommonEditTextInputProps]
  );

  const [colorSchemeFromLocalStorage, setColorScheme] = useLocalStorage({
    key: "mode",
    defaultValue: "light",
  });

  let colorScheme = colorSchemeFromLocalStorage as ColorScheme;

  const toggleColorScheme = () => {
    const newTheme = localStorage.getItem("mode");

    if (!newTheme) return;

    setColorScheme(newTheme);

    colorScheme = colorSchemeFromLocalStorage as ColorScheme;
  };

  useEventListener("storage", toggleColorScheme);

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }} withNormalizeCSS>
          <MantineReactTable
            columns={columns}
            data={tableData}
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            mantineTableProps={{
              striped: true,
            }}
            renderRowActions={({ row, table }) => (
              <div className="flex gap-4">
                <div className="tooltip  tooltip-top" data-tip="Edit">
                  <button
                    className="btn"
                    onClick={() => table.setEditingRow(row)}
                  >
                    <IconEdit />
                  </button>
                </div>
                <div className="tooltip  tooltip-top" data-tip="Delete">
                  <button className="btn" onClick={() => handleDeleteRow(row)}>
                    <IconTrash />
                  </button>
                </div>
              </div>
            )}
            renderTopToolbarCustomActions={() => (
              <>
                <button
                  className="btn bg-base"
                  onClick={() => window.my_modal_5.showModal()}
                >
                  Create New Account
                </button>
                <ChangeTheme />
              </>
            )}
          />
        </MantineProvider>
        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </ColorSchemeProvider>
    </>
  );
};

interface Props {
  columns: MRT_ColumnDef<Domain>[];
  onClose: () => void;
  onSubmit: (values: Domain) => void;
  open: boolean;
}

const ChangeTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
    </ActionIcon>
  );
};

//example of creating a mantine dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: Props) => {
  const [values, setValues] = React.useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
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

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age: number) => age >= 18 && age <= 50;
