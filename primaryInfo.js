import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';

export default function PrimaryInfo(props) {
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
  const {grade,studentName,className,teacherName}=props.details;
  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Student Name :{studentName}
          </Typography>
          <Typography className={classes.pos}>
            Grade :{grade}
          </Typography>
          <Typography className={classes.pos}>
            ClassName :{className}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
