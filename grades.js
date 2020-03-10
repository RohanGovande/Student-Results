import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import * as PXBThemes from "@pxblue/themes/react";
require("typeface-open-sans");
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "@material-ui/core/Link";
import { data } from "./data";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const preventDefault = event => event.preventDefault();
const options = ["Delete"];

const ITEM_HEIGHT = 48;
const columns = [
  { id: "repository", label: "Repository", minWidth: 200 },
  { id: "npm", label: "NPM", minWidth: 200 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "issues", label: "Issues", minWidth: 120 }
];

export default function StickyHeadTable() {
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    container: {
      maxHeight: 440
    },
    cursor: {
      cursor: "pointer"
    },
    spacing: {
      float: "right",
      padding: 0
    },
    paper: {
      position: "absolute",
      width: 500,
      backgroundColor: "white",
      padding: 10,
      height: 500
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 400,
      width: "30%"
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    }
  }));

  const classes = useStyles();
  const theme = createMuiTheme(PXBThemes.blue);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(data);
  const [menuposition, setMenuposition] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(JSON.stringify(data[0]));
  const [openSnackBar, setSnackBar] = React.useState(false);
  const [inputvalue, setSearchValue] = React.useState("");
  const handleSearchChange = event => {
    let tempList = rows;
    if (event.target.value) {
      let newList = tempList.filter(item => {
        const lc = item.repository.name.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return lc.includes(filter);
      });
      setRows(newList);
    } else {
      setRows(data);
    }
    setSearchValue(event.target.value);
  };

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSnackBar(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function onAddItem() {
    if (value) {
      let templist = rows;
      templist.push(JSON.parse(value));
      setRows([...templist]);
      setOpen(false);
      setSnackBar(true);
    }
  }

  function onMenuClick(event, i) {
    setMenuposition(event.currentTarget);
    setActiveMenu(i);
  }
  function onMenuItemClick(option, i) {
    if (option === "Delete") {
      let templist = rows;
      templist.splice(i, 1);
      setRows(templist);
    }
    onMenuClose();
  }
  function onMenuClose() {
    setMenuposition(null);
    setActiveMenu(null);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AppBar position="fixed">
                                  
            <Toolbar>
                             
              <Typography ariant="h6">Grades                 </Typography>
                          {" "}
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Student Name.."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearchChange}
                  value={inputvalue}
                />
              </div>
            </Toolbar>
            <Paper paragraph>
              <TableContainer className={classes.container}>
                {data.map((obj) => {
                  <ExpansionPanel key={obj}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                        control={<SearchIcon />}
                        label="I acknowledge that I should stop the click event propagation"
                      />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography color="textSecondary">
                        The click event of the nested action will propagate up
                        and expand the panel unless you explicitly stop it.
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>;
                })}
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <Menu
                id="long-menu"
                anchorEl={menuposition}
                open={Boolean(menuposition)}
                onClose={onMenuClose.bind(this)}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    onClick={() => onMenuItemClick(option, activeMenu)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Paper>
          </AppBar>
        </main>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <AppBar position="static">
                           
              <Toolbar data-cy="pxb-toolbar">
                 
                <Typography style={{ flex: 1 }} variant="h6" color="inherit">
                    Add Resource               
                </Typography>
              </Toolbar>
                          
            </AppBar>
            <DialogContent>
              <DialogContentText>
                Just edit the below json for adding new resource .
              </DialogContentText>
              <TextareaAutosize
                style={{ height: 300, width: 450 }}
                rowsMax={8}
                placeholder="Maximum 8 rows"
                defaultValue={JSON.stringify(data[0])}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onAddItem} color="primary">
                Add
              </Button>
            </DialogActions>
          </div>
        </Modal>
        <Snackbar open={openSnackBar} autoHideDuration={3000}>
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </MuiThemeProvider>
    </div>
  );
}
