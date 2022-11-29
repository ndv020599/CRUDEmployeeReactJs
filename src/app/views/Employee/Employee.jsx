import React, { Component } from "react";
import { Breadcrumb, ConfirmationDialog } from "egret";
import {
  Grid,
  Button,
  TablePagination,
  IconButton,
  Icon,
} from "@material-ui/core";
import MaterialTable from "material-table";
import EmployeeDialog from "./EmployeeDialog";
import { getEmployee, deleteUserService } from "./EmployeeService";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { toast } from "react-toastify";
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return (
    <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      shouldOpenEditorDialog: false,
      dataEmployees: [],
      shouldOpenConfirmationDialog: false,
      totalElements: 0,
    };
  }
  componentDidMount() {
    this.handleDataEmployee();
  }

  handleDataEmployee = () => {
    getEmployee().then((res) =>
      this.setState(
        { dataEmployees: res }
        //   , () => {
        //   console.log(res);
        // }
      )
    );
  };

  handleOpenModel = () => {
    this.setState({ item: {}, shouldOpenEditorDialog: true });
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
    });
  };

  handleConfirmationResponse = (id) => {
    this.setState({
      id: id,
      shouldOpenConfirmationDialog: true,
    });
    // this.handleDelete(id);
  };
  // handleDelete = async (id) => {
  //   const deleteUser = await deleteUserService(id);
  //   // console.log(" asđfbđg", deleteUser);
  //   this.handleDataEmployee();
  // };

  confirmDelete = (id) => {
    id = this.state.id;
    deleteUserService(id)
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({ shouldOpenConfirmationDialog: false });
          this.handleDataEmployee();
          toast.success("Xóa thành công");
        } else {
          toast.error("aaaaaa");
        }
      })
      .catch(
        () => this.setState({ shouldOpenConfirmationDialog: false }),
        toast.error("Không xóa được")
      );
  };

  render() {
    const { t, i18n } = this.props;

    let {
      shouldOpenEditorDialog,
      dataEmployees,
      shouldOpenConfirmationDialog,
      item,
    } = this.state;

    let columns = [
      { title: t("staff.code"), field: "code", width: "150" },
      { title: t("staff.name"), field: "name", width: "150" },
      { title: t("staff.email"), field: "email", width: "150" },
      {
        title: t("staff.phoneNumber"),
        field: "phone",
        width: "150",
      },
      {
        title: t("Action"),
        field: "action",
        width: "150",
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              // {
              //   console.log("mento thuong", rowData);
              // }
              if (method === 0) {
                this.setState({
                  item: rowData,
                  shouldOpenEditorDialog: true,
                });
              } else if (method === 1) {
                this.handleConfirmationResponse(rowData.id);
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
    ];

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: t("Dashboard.manage"), path: "/directory/apartment" },
              { name: t("staff.title") },
            ]}
          />
        </div>

        <Grid container spacing={3}>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.handleOpenModel()}
            >
              {t("Add")}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div>
            {shouldOpenEditorDialog && (
              <EmployeeDialog
                t={t}
                i18n={i18n}
                open={shouldOpenEditorDialog}
                item={item}
                handleClose={this.handleDialogClose}
                handleDataEmployee={() => {
                  this.handleDataEmployee();
                }}
              />
            )}
            {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                title={t("confirm")}
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.confirmDelete}
                text={t("DeleteConfirm")}
                Yes={t("Yes")}
                No={t("No")}
              />
            )}
          </div>
          <MaterialTable
            title={t("Nhân viên")}
            columns={columns}
            data={dataEmployees}
            options={{
              selection: false,
              paging: true,
              actionsColumnIndex: -1,
              search: true,
              headerStyle: {
                backgroundColor: "#358600",
                color: "#fff",
              },
              padding: "dense",
              toolbar: true,
            }}
            localization={{
              body: {
                emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
              },
            }}
          />
        </Grid>
      </div>
    );
  }
}

export default Employee;
