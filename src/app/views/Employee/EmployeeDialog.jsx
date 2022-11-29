import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import {
  getDistricts,
  getCommunes,
  getProvinces,
  UpdateEmployeesService,
  createNewUserService,
} from "./EmployeeService";
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

class EmployeeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDistricts: [],
      listCommunes: [],
      listProvinces: [],
      id: "",
      code: "",
      name: "",
      age: "",
      phone: "",
      email: "",
      province: "",
      district: "",
      commune: "",
    };
  }
  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value }
      //   , () => {
      //   console.log(this.state);
      // }
    );
  };

  // creactNewUser = async (data) => {
  //   let newUser = await createNewUserService(data);
  //   // console.log("aaaaaaasss", newUser);
  //   if (newUser.data.code === 200) {
  //     this.handleDataEmployee();
  //     this.handleDialogClose();
  //     toast.success(`Thêm ${newUser.data.message}`);
  //   } else {
  //     toast.error(newUser.data.message);
  //   }
  // };

  handleOnSubmitEmployee = async () => {
    let { code, name, age, phone, email, province, district, commune } =
      this.state;
    const data = { code, name, age, email, province, district, phone, commune };
    if (this.props.item.id) {
      let resdata = await UpdateEmployeesService(this.state);
      console.log(resdata);
      if (resdata.data.code === 200) {
        // console.log(resdata);
        this.props.handleDataEmployee();
        this.props.handleClose();
        toast.success(`Sửa ${resdata.data.message}`);
      } else {
        toast.error(resdata.data.message);
      }
    } else {
      createNewUserService(data).then((res) => {
        if (res.data.code === 200) {
          this.props.handleClose();
          this.props.handleDataEmployee();
          toast.success("Thêm thành công");
        }
      });
    }

    // console.log(">>>", this.state);
  };

  componentDidMount = () => {
    const { item } = this.props;
    // console.log(">ádasdasdasdasdasdasd>>", item);
    getDistricts().then((data) => {
      // console.log("ssssss", data);
      this.setState({ listDistricts: data });
    });

    getCommunes().then((data) => {
      // console.log("ssssss", data);
      this.setState({ listCommunes: data });
    });
    getProvinces().then((data) => {
      // console.log("ssssss", data);
      this.setState({ listProvinces: data });
    });
    this.setState({
      id: item.id,
      code: item.code,
      name: item.name,
      age: item.age,
      phone: item.phone,
      email: item.email,
      province: item.province,
      district: item.district,
      commune: item.commune,
    });
  };

  render() {
    let {
      id,
      code,
      name,
      age,
      phone,
      email,
      province,
      district,
      commune,
      listProvinces,
      listDistricts,
      listCommunes,
    } = this.state;
    // console.log(this.state.data);
    let { open, t, i18n, handleClose, item } = this.props;
    return (
      <Dialog open={open}>
        <DialogTitle>
          <span className="mb-20 styleColor">
            {item.id
              ? t("staff.updateStaff")
              : t("Add") + " " + t("user.title")}
          </span>
          <IconButton
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => handleClose()}
          >
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm
          ref="form"
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent dividers>
            <Grid className="mb-16" container spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.code")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="code"
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  variant="outlined"
                  size="small"
                  value={code}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.displayName")}
                    </span>
                  }
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  variant="outlined"
                  size="small"
                  value={name}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.age")}
                    </span>
                  }
                  type="number"
                  name="age"
                  onChange={this.handleChange}
                  validators={["required", "minNumber:0", "maxNumber:70"]}
                  errorMessages={[
                    t("general.required"),
                    t("general.error_age"),
                    t("general.error_age"),
                  ]}
                  variant="outlined"
                  size="small"
                  value={age}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span class="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.Email")}
                    </span>
                  }
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("general.required"),
                    t("general.error_email"),
                  ]}
                  variant="outlined"
                  size="small"
                  value={email}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.phoneNumber")}
                    </span>
                  }
                  type="number"
                  onChange={this.handleChange}
                  name="phone"
                  validators={[
                    "required",
                    "matchRegexp:(^[0-9]{10})$",
                    // "matchRegexp:(84|0[3|5|7|8|9])+([0-9]{8})\b",
                  ]}
                  errorMessages={[
                    t("general.required"),
                    t("general.error_phone"),
                    // t("general.error_phone_hero"),
                  ]}
                  variant="outlined"
                  size="small"
                  value={phone}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel>
                    {<span className="font">{t("staff.city")}</span>}
                  </InputLabel>
                  <Select
                    name="province"
                    value={province}
                    onChange={this.handleChange}
                  >
                    {listProvinces.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel>
                    {<span className="font">{t("staff.district")}</span>}
                  </InputLabel>
                  <Select
                    name="district"
                    value={district}
                    onChange={this.handleChange}
                  >
                    {listDistricts.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel>
                    {<span className="font">{t("staff.commune")}</span>}
                  </InputLabel>
                  <Select
                    name="commune"
                    value={commune}
                    onChange={this.handleChange}
                  >
                    {listCommunes.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClose()}
            >
              {t("general.cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                this.handleOnSubmitEmployee();
              }}
            >
              {item.id ? t("general.update") : t("Add")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default EmployeeDialog;
