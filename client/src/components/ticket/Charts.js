import React from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { chartData } from "../../utils/functions/chartData";

const Charts = ({ tickets, departments }) => {
  const { data1, data2, options, progress } = chartData(tickets, departments);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
      {!Boolean(progress) &&<Grid item style={{ width: "100%", marginTop: "10px" }}>
              <Typography
                align="center"
                variant="h6"
              >{`NO DATA TO DISPLAY`}</Typography>
            </Grid> }
        {Boolean(progress) && (
          <>
            <Grid item style={{ width: "100%", marginTop: "10px" }}>
              <Typography
                align="center"
                variant="h6"
              >{`Completed Tickets ::::: ${progress}%`}</Typography>
            </Grid>

            <Grid item style={{ width: "80%" }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={progress}
                style={{ height: "2vh" }}
              />
            </Grid>

            <Grid item style={{ width: "100%" }}>
              <Typography
                align="center"
                variant="h6"
              >{`Data on Pending Tickets`}</Typography>
            </Grid>

            <Grid item style={{ width: "90%", marginBottom: "10px" }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6} style={{ width: "100%" }}>
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data1}
                    options={options}
                  />
                </Grid>
                <Grid item xs={6} style={{ width: "100%" }}>
                  <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={data2}
                    options={{
                      title: "Tickets By Department",
                      backgroundColor: "#ad9d9d",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  tickets: state.tickets,
  departments: state.departments,
});

export default connect(mapStateToProps)(Charts);
