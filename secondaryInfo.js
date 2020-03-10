import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function SecndaryInfo(props) {
  const useStyles = makeStyles({
    root: {
      minWidth: 200
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 2
    }
  });
  const classes = useStyles();
  console.log(props.details);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
          {props.details.map(function (items, index) {
            return Object.keys(items).map(key => (
               <Typography>
                <p key={key + index}>
                  {key}:{items[key]}
                </p>
              </Typography>
            ));
          })}
      </CardContent>
    </Card>
  );
}
