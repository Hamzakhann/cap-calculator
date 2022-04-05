import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./cap-calculator.module.scss";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import format from "format-number";
import NumberFormat from "react-number-format";

const CapCalculator = () => {
  let [propertyVal, setPropertyVal] = useState("");
  let [annualGrossIncome, setAnnualGrossIncome] = useState("");
  let [operatingExpenses, setOperatingExpenses] = useState("");
  let [vacancyRate, setVacancyRate] = useState("");
  let [annualNetIncome, setAnnualNetIncome] = useState("");
  let [capRate, setCapRate] = useState("");
  let [isOperatingError, setIsOperatingError] = useState(false);
  let [isVacancyError, setIsVacancyError] = useState(false);

  function numberFormatorFunc(val) {
    let numberformat = format();
    let formatedValue = numberformat(val, { noSeparator: false });
    return formatedValue;
  }

  function numberDeFormator(deVal) {
    let number = deVal;
    number = number.replace(/,/g, "");
    return number;
  }

  function numberFixedFunc(fixedVal) {
    let netIncomeFixed = Number(fixedVal).toFixed(2);
    return netIncomeFixed;
  }

  useEffect(() => {
    setIsOperatingError(false);
    setIsVacancyError(false);
    let netIncome =
      ((100 - operatingExpenses) / 100) *
      ((100 - vacancyRate) / 100) *
      parseInt(numberDeFormator(annualGrossIncome));
    let capRateTotal =
      (netIncome / parseInt(numberDeFormator(propertyVal))) * 100;
    if (operatingExpenses >= 100) {
      setIsOperatingError(true);
    } else if (vacancyRate >= 100) {
      setIsVacancyError(true);
    }
    setAnnualGrossIncome(annualGrossIncome ? annualGrossIncome : "");
    setPropertyVal(propertyVal ? propertyVal : "");
    setAnnualNetIncome(netIncome ? numberFixedFunc(netIncome) : "");
    setCapRate(capRateTotal ? numberFixedFunc(capRateTotal) : "0");
  }, [propertyVal, operatingExpenses, vacancyRate, annualGrossIncome]);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_cap_calculator_container}>
        <Grid container className={styles.row_class}>
          <Grid item xs={12} md={6}>
            <div className={styles.main_data_details}>
              <div className={styles.data_input_feild}>
                <Typography
                  varient="p"
                  component="p"
                  fontSize={{ lg: 25, md: 16, xs: 13 }}
                >
                  Property Value
                </Typography>
                <div>
                  <NumberFormat
                    value={propertyVal}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value, props) => (
                      <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "20ch" }}
                        value={value}
                        // id="outlined-basic"
                        label="Enter amount"
                        variant="outlined"
                        onChange={(e) => setPropertyVal(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">$</InputAdornment>
                          ),
                          className: "override"
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={styles.data_input_feild}>
                <Typography
                  varient="p"
                  component="p"
                  fontSize={{ lg: 25, md: 16, xs: 13 }}
                >
                  Annual Gross Income
                </Typography>
                <div>
                  <NumberFormat
                    value={annualGrossIncome}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value, props) => (
                      <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "20ch" }}
                        value={value}
                        onChange={(e) => setAnnualGrossIncome(e.target.value)}
                        // id="outlined-basic"
                        label="Enter amount"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">$</InputAdornment>
                          ),
                          className: "override"
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={styles.data_input_feild}>
                <div>
                  <Typography
                    varient="p"
                    component="p"
                    fontSize={{ lg: 25, md: 16, xs: 13 }}
                  >
                    Operating Expenses
                  </Typography>
                  {isOperatingError ? (
                    <Typography
                      varient="p"
                      component="p"
                      className={styles.errorMessage}
                      fontSize={{ lg: 10, md: 10, xs: 10 }}
                    >
                      Annual net income should be greater than 0. Cap rate
                      should be greater than 0.
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <TextField
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "20ch" }}
                    value={operatingExpenses}
                    onChange={(e) => setOperatingExpenses(e.target.value)}
                    // id="outlined-basic"
                    label="Percent"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      className: "override"
                    }}
                  />
                </div>
              </div>
              <div className={styles.data_input_feild}>
                <div>
                  <Typography
                    varient="p"
                    component="p"
                    fontSize={{ lg: 25, md: 16, xs: 13 }}
                  >
                    Vacancy Rate
                  </Typography>
                  {isVacancyError ? (
                    <Typography
                      varient="p"
                      component="p"
                      className={styles.errorMessage}
                      fontSize={{ lg: 10, md: 10, xs: 13 }}
                    >
                      Annual net income should be greater than 0. Cap rate
                      should be greater than 0.
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <TextField
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "20ch" }}
                    value={vacancyRate}
                    onChange={(e) => setVacancyRate(e.target.value)}
                    // id="outlined-basic"
                    label="Percent"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      className: "override"
                    }}
                  />
                </div>
              </div>
              <div className={styles.data_input_feild}>
                <Typography
                  varient="p"
                  component="p"
                  fontSize={{ lg: 25, md: 16, xs: 13 }}
                >
                  Annual Net Income
                </Typography>
                <div>
                  <NumberFormat
                    value={annualNetIncome}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value, props) => (
                      <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "20ch" }}
                        value={value}
                        onChange={(e) => setAnnualNetIncome(e.target.value)}
                        // id="outlined-basic"
                        label="Annual net income"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">$</InputAdornment>
                          ),
                          className: "override"
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.data_result}>
              <div>
                <Typography varient="h3" component="h3">
                  {capRate}
                </Typography>
                <Typography varient="p" component="p">
                  %
                </Typography>
              </div>
              <div>
                <Typography varient="p" component="p">
                  Cap Rate
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <style jsx global>{`
          .MuiOutlinedInput-input {
            padding: 12.5px 14px;
          }
          .MuiInputLabel-root {
            font-size: 12px;
          }
          .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #000000 !important;
          }
          .MuiInputLabel-root.Mui-focused {
            color: #000000 !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CapCalculator;
