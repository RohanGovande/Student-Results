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
  const metaData = props.details.metaData;
  console.log(metaData);
  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {metaData.map(obj => {
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
            {obj}
            </Typography>;
          })}
        </CardContent>
      </Card>
    </div>
  );
}
