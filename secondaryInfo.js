import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

export default function SecndaryInfo(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 200,
      marginLeft: "20px",
      transition: "0.3s",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    title: {},
    pos: {
      marginBottom: 2
    }
  }));
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="Secondary Info"> </CardHeader>
      <Divider />
      <CardContent>
        {props.details.map(function(items, index) {
          return Object.keys(items).map(key => (
            <Typography gutterBottom>
              <span key={key + index}>
                {key}:{items[key]}
              </span>
            </Typography>
          ));
        })}
      </CardContent>
    </Card>
  );
}
